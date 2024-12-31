import {describe, expect, it, vi} from "vitest";
import HomePage from '../+page.svelte';
import {render, screen} from "@testing-library/svelte";
import {type UserEvent, userEvent} from "@testing-library/user-event";
import {dndSRDStore} from "$lib/stores/dnd5eStore";
import type {DnDClass} from "$lib/DnDClassSchema";
import {
  createDndClass,
  createSavingThrowProficiencies,
  createSkillProficiencyChoices
} from "$lib/stores/dnd5eStore/__tests__/testDataUtil";

async function selectClass<T>(user: UserEvent, className: string) {
  const classSelect = screen.getByRole('combobox', {name: 'Pick a 5e Character Class'});
  await user.click(classSelect);
  await user.selectOptions(classSelect, className);
}

async function selectBackground(user: UserEvent, background: string) {
  const select = screen.getByRole('combobox', {name: 'Pick a 5e Background'});
  await user.click(select);
  await user.selectOptions(select, background);
}

describe("main page", () => {
  it('should render', () => {
    const subject = render(HomePage);

    expect(subject.getByText("Create a D&D Character")).toBeInTheDocument();
  });

  it('should show class options', () => {
    // acolyte, criminal, sage, soldier
  });

  it('should show background options after class is selected', async () => {
    setupCharacterClasses();

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
    setupCharacterClasses(); // todo: setup class to have Religion, but not Insight, as skill choices

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();

    expect(screen.queryByLabelText('Choose Skills:')).not.toBeInTheDocument();
    await selectClass(user, 'TestClass2Name');
    expect(screen.queryByLabelText('Choose Skills:')).not.toBeInTheDocument();
    await selectBackground(user, 'Acolyte'); // skills: Insight, Religion

    let skillButtonGroup = screen.getByLabelText('Choose Skills:');
    expect(skillButtonGroup).toBeInTheDocument();

    expect(subject.getByText('Selected Skills: Insight, Religion')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'TSkill1'}));
    
    expect(subject.getByText('Selected Skills: Insight, Religion, TSkill1')).toBeInTheDocument();
  });

  it('should show species options', () => {
    // dwarf, elf, halfling, human
  });

  it('should show selected class traits', async () => {
    // hit die, 
    // weapon proficiencies,
    // armor training, 
    // starting equipment choices
    setupCharacterClasses();

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();

    await selectClass(user, 'TestClass2Name');

    expect(subject.getByText('Selected Class: TestClass2Name')).toBeInTheDocument();
    expect(subject.getByText('Skill Choices: TSkill1, TSkill2')).toBeInTheDocument();
    expect(subject.getByText('Saving Throw Proficiencies: Wisdom, Charisma')).toBeInTheDocument();
  });
});

function setupCharacterClasses() {
  const testData: DnDClass[] = [
    createDndClass({
      name: 'TestClass2Name',
      index: 'testClass2index',
      skill_proficiency_choices: createSkillProficiencyChoices("TSkill1", "TSkill2"),
      saving_throws: createSavingThrowProficiencies("WIS", "CHA")
    })
  ];
  const mockFetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(testData)
  })
  vi.stubGlobal('fetch', mockFetch);
}
