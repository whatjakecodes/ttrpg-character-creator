﻿import {describe, expect, it, vi} from "vitest";
import HomePage from '../+page.svelte';
import {render} from "@testing-library/svelte";
import {userEvent} from "@testing-library/user-event";
import {dndSRDStore} from "$lib/stores/dnd5eStore";
import type {DnDClass} from "$lib/DnDClassSchema";
import {
  createDndClass,
  createSavingThrowProficiencies,
  createSkillProficiencyChoices
} from "$lib/stores/dnd5eStore/__tests__/testDataUtil";

describe("main page", () => {
  it('should render', () => {
    const subject = render(HomePage);

    expect(subject.getByText("Create a D&D Character")).toBeInTheDocument();
  });

  it('should show class options', () => {
    // acolyte, criminal, sage, soldier
  });

  it('should show background options', () => {
    // acolyte, criminal, sage, soldier
  });

  it('should show species options', () => {
    // dwarf, elf, halfling, human
  });

  it('should show selected class traits', async () => {
    // hit die, 
    // weapon proficiencies,
    // armor training, 
    // starting equipment choices

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

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();

    const classSelect = subject.getByRole('combobox', {name: 'Pick a 5e Character Class'});
    await user.click(classSelect);
    await user.selectOptions(classSelect, 'TestClass2Name');

    expect(subject.getByText('Selected Class: TestClass2Name')).toBeInTheDocument();
    expect(subject.getByText('Skill Choices: TSkill1, TSkill2')).toBeInTheDocument();
    expect(subject.getByText('Saving Throw Proficiencies: Wisdom, Charisma')).toBeInTheDocument();
  });
});