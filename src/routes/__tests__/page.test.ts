import {describe, expect, it, vi} from "vitest";
import HomePage from '../+page.svelte';
import {render, screen, within} from "@testing-library/svelte";
import {type UserEvent, userEvent} from "@testing-library/user-event";
import {dndSRDStore} from "$lib/stores/dnd5eStore";
import type {DnDClass} from "$lib/DnDClassSchema";
import {
  createDndClass,
  createSavingThrowProficiencies,
  createSkillProficiencyChoices
} from "$lib/stores/dnd5eStore/__tests__/testDataUtil";
import type {DnDSkillName} from "$lib/srdData/skills";

async function selectClass(user: UserEvent, className: string) {
  const classSelect = screen.getByRole('combobox', {name: 'Pick a 5e Character Class'});
  await user.click(classSelect);
  await user.selectOptions(classSelect, className);
}

async function selectBackground(user: UserEvent, background: string) {
  const select = screen.getByRole('combobox', {name: 'Pick a 5e Background'});
  await user.click(select);
  await user.selectOptions(select, background);
}

async function selectClassSkill(user: UserEvent, skillName: DnDSkillName) {
  const classSkills = within(screen.getByLabelText('Choose Class Skills:'));
  await user.click(classSkills.getByRole('button', {name: skillName}));
}

describe("main page", () => {
  it('should render', () => {
    const subject = render(HomePage);

    expect(subject.getByText("Create a D&D Character")).toBeInTheDocument();
  });

  it('should show class options', () => {
  });

  it('should show background options after class is selected', async () => {
    setupCharacterClasses([
      createDndClass({
        name: 'TestClass2Name',
        index: 'testClass2index',
        skill_proficiency_choices: createSkillProficiencyChoices("TSkill1", "TSkill2"),
        saving_throws: createSavingThrowProficiencies("WIS", "CHA")
      })
    ]);

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();

    let backgroundSelect = subject.queryByRole('combobox', {name: 'Pick a 5e Background'});
    expect(backgroundSelect).not.toBeInTheDocument();

    await selectClass(user, 'TestClass2Name');

    expect(subject.getByRole('combobox', {name: 'Pick a 5e Background'})).toBeInTheDocument();

    await selectBackground(user, 'Acolyte');
    await selectBackground(user, 'Criminal');
    await selectBackground(user, 'Sage');
    await selectBackground(user, 'Soldier');

    expect(subject.getByText('Selected Background: Soldier')).toBeInTheDocument();
  });

  it('should show skill proficiencies after background is selected', async () => {
    setupCharacterClassWithSkills(["Sleight of Hand"]);

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();

    expect(screen.queryByLabelText('Choose Class Skills:')).not.toBeInTheDocument();
    expect(subject.queryByText('Background Skills:')).not.toBeInTheDocument();
    await selectClass(user, 'TestClass2Name');
    expect(screen.queryByLabelText('Choose Class Skills:')).not.toBeInTheDocument();
    expect(subject.queryByText('Background Skills:')).not.toBeInTheDocument();

    await selectBackground(user, 'Acolyte'); // skills: Insight, Religion

    expect(screen.getByLabelText('Choose Class Skills:')).toBeInTheDocument();
    expect(subject.getByText('Selected Skills: Insight, Religion')).toBeInTheDocument();
    expect(subject.getByText('Background Skills:')).toBeInTheDocument();

    const backgroundSkill1Button = subject.getByRole('button', {name: 'Insight'});
    expect(backgroundSkill1Button).toBeInTheDocument();
    expect(backgroundSkill1Button).toBeDisabled();
    const backgroundSkill2Button = subject.getByRole('button', {name: 'Religion'});
    expect(backgroundSkill2Button).toBeInTheDocument();
    expect(backgroundSkill2Button).toBeDisabled();

    await selectClassSkill(user, 'Sleight of Hand');

    expect(subject.getByText('Selected Skills: Insight, Religion, Sleight of Hand')).toBeInTheDocument();
  });

  it('should not select class skills if background includes it', async () => {
    setupCharacterClassWithSkills(["Intimidation"]);

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();

    await selectClass(user, 'TestClass2Name');
    await selectBackground(user, 'Soldier'); // skills: Athletics, Intimidation

    expect(subject.getByText('Selected Skills: Athletics, Intimidation')).toBeInTheDocument();

    const classSkillButtonGroup = within(screen.getByLabelText('Choose Class Skills:'));
    expect(classSkillButtonGroup.getByRole('button', {name: 'Intimidation'})).toBeDisabled();

    await user.click(classSkillButtonGroup.getByRole('button', {name: 'Intimidation'}));

    expect(subject.getByText('Selected Skills: Athletics, Intimidation')).toBeInTheDocument();
  });

  it('should reset selected class skills when class changes', async () => {
    setupCharacterClasses([
      createDndClass({
        name: 'TestClass1',
        index: 'testClass1index',
        skill_proficiency_choices: createSkillProficiencyChoices("Sleight of Hand"),
      }),
      createDndClass({
        name: 'TestClass2',
        index: 'testClass2index',
        skill_proficiency_choices: createSkillProficiencyChoices("Nature"),
      })
    ]);

    const user = userEvent.setup();
    render(HomePage);

    await dndSRDStore.fetchClasses();

    await selectClass(user, 'TestClass1');
    await selectBackground(user, 'Acolyte');
    await selectClassSkill(user, 'Sleight of Hand');
    expect(screen.getByText('Selected Skills: Insight, Religion, Sleight of Hand')).toBeInTheDocument();

    await selectClass(user, 'TestClass2');
    expect(screen.queryByText('Selected Skills: Insight, Religion, Sleight of Hand')).not.toBeInTheDocument();
    expect(screen.getByText('Selected Skills: Insight, Religion')).toBeInTheDocument();
  });

  it('should show species options', () => {
    // dwarf, elf, halfling, human
  });

  it('should show selected class traits', async () => {
    // hit die, 
    // weapon proficiencies,
    // armor training, 
    // starting equipment choices
    setupCharacterClasses([
      createDndClass({
        name: 'TestClass2Name',
        index: 'testClass2index',
        skill_proficiency_choices: createSkillProficiencyChoices("TSkill1", "TSkill2"),
        saving_throws: createSavingThrowProficiencies("WIS", "CHA")
      })
    ]);

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();

    await selectClass(user, 'TestClass2Name');

    expect(subject.getByText('Selected Class: TestClass2Name')).toBeInTheDocument();
    expect(subject.getByText('Saving Throw Proficiencies: Wisdom, Charisma')).toBeInTheDocument();
  });
});

function setupCharacterClassWithSkills(skills: DnDSkillName[]) {
  const testData: DnDClass[] = [
    createDndClass({
      name: 'TestClass2Name',
      index: 'testClass2index',
      skill_proficiency_choices: createSkillProficiencyChoices(...skills),
      saving_throws: createSavingThrowProficiencies("WIS", "CHA")
    })
  ];

  setupCharacterClasses(testData);
}

function setupCharacterClasses(dndClasses: DnDClass[]) {
  const testData: DnDClass[] = dndClasses;
  const mockFetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(testData)
  })
  vi.stubGlobal('fetch', mockFetch);
}
