﻿import {describe, expect, it, vi} from "vitest";
import HomePage from '../+page.svelte';
import {render, screen, within} from "@testing-library/svelte";
import {userEvent} from "@testing-library/user-event";
import {dndSRDStore} from "$lib/stores/dnd5eStore";
import type {DnDClass} from "$lib/DnDClassSchema";
import {
  createDndClass,
  createSavingThrowProficiencies,
  createSkillProficiencyChoices
} from "$lib/stores/dnd5eStore/__tests__/testDataUtil";
import type {DnDSkillName} from "$lib/srdData/skills";
import {selectBackground, selectClass, selectClassSkill, selectSpecies} from "../../__tests__/utils";

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

    expect(subject.getByRole('textbox', {name: 'BACKGROUND'})).toHaveValue('Soldier');
  });

  it('should show skill proficiencies after background is selected', async () => {
    setupCharacterClassWithSkills(["Sleight of Hand"]);

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();

    expect(screen.queryByLabelText(/Class Skills/)).not.toBeInTheDocument();
    expect(subject.queryByText(/Background Skills:/)).not.toBeInTheDocument();
    await selectClass(user, 'TestClass2Name');
    expect(screen.queryByLabelText(/Class Skills/)).not.toBeInTheDocument();
    expect(subject.queryByText(/Background Skills:/)).not.toBeInTheDocument();

    await selectBackground(user, 'Acolyte'); // skills: Insight, Religion

    expect(screen.getByLabelText('Choose 2 TestClass2Name Class Skills:')).toBeInTheDocument();
    expect(subject.getByText('Selected Skills: Insight, Religion')).toBeInTheDocument();
    expect(subject.getByText('Acolyte Background Skills:')).toBeInTheDocument();

    const backgroundSkill1Button = subject.getByRole('button', {name: 'Insight'});
    expect(backgroundSkill1Button).toBeInTheDocument();
    expect(backgroundSkill1Button).toBeDisabled();
    const backgroundSkill2Button = subject.getByRole('button', {name: 'Religion'});
    expect(backgroundSkill2Button).toBeInTheDocument();
    expect(backgroundSkill2Button).toBeDisabled();

    await selectClassSkill(user, 'TestClass2Name', 'Sleight of Hand');

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

    const classSkillButtonGroup = within(screen.getByLabelText('Choose 2 TestClass2Name Class Skills:'));
    expect(classSkillButtonGroup.getByRole('button', {name: 'Intimidation'})).toBeDisabled();

    await user.click(classSkillButtonGroup.getByRole('button', {name: 'Intimidation'}));

    expect(subject.getByText('Selected Skills: Athletics, Intimidation')).toBeInTheDocument();
  });

  it('should reset selected class skills when class changes', async () => {
    setupCharacterClasses([
      createDndClass({
        name: 'TestClass1',
        index: 'testClass1index',
        skill_proficiency_choices: createSkillProficiencyChoices("Sleight of Hand", "Nature"),
      }),
      createDndClass({
        name: 'TestClass2',
        index: 'testClass2index',
        skill_proficiency_choices: createSkillProficiencyChoices("Nature", "Acrobatics"),
      })
    ]);

    const user = userEvent.setup();
    render(HomePage);

    await dndSRDStore.fetchClasses();

    await selectClass(user, 'TestClass1');
    await selectBackground(user, 'Acolyte');
    expect(screen.getByText('Selected Skills: Insight, Religion')).toBeInTheDocument();

    await selectClassSkill(user, 'TestClass1', 'Sleight of Hand');
    await selectClassSkill(user, 'TestClass1', 'Nature');
    expect(screen.getByText('Selected Skills: Insight, Religion, Sleight of Hand, Nature')).toBeInTheDocument();

    await selectClass(user, 'TestClass2');
    expect(screen.getByText('Selected Skills: Insight, Religion')).toBeInTheDocument();
  });

  it('should show species options', async () => {
    setupCharacterClasses([
      createDndClass({
        name: 'TestClass1',
        index: 'testClass1index',
        skill_proficiency_choices: createSkillProficiencyChoices(),
      })
    ]);

    const user = userEvent.setup();
    render(HomePage);

    await dndSRDStore.fetchClasses();

    expect(screen.getByRole('textbox', {name: 'SPECIES'})).toHaveValue('');
    expect(screen.queryByText('Select a species')).not.toBeInTheDocument();

    await selectClass(user, 'TestClass1');

    const speciesSelect = screen.getByRole('combobox', {name: 'Select a species'});
    expect(speciesSelect).toBeInTheDocument();
    const defaultOption = within(speciesSelect).getByRole('option', {selected: true});
    expect(defaultOption.textContent).toEqual("Select a species...");

    await selectSpecies(user, 'Dwarf');
    expect(screen.getByRole('textbox', {name: 'SPECIES'})).toHaveValue('Dwarf');

    await selectSpecies(user, 'Elf');
    expect(screen.getByRole('textbox', {name: 'SPECIES'})).toHaveValue('Elf');

    await selectSpecies(user, 'Halfling');
    expect(screen.getByRole('textbox', {name: 'SPECIES'})).toHaveValue('Halfling');

    await selectSpecies(user, 'Human');
    expect(screen.getByRole('textbox', {name: 'SPECIES'})).toHaveValue('Human');
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

    expect(subject.getByRole('textbox', {name: 'CLASS'})).toHaveValue('TestClass2Name');
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
