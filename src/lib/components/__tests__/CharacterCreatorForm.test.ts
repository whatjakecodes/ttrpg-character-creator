import {expect, it, test, vi} from "vitest";
import {render, screen, within} from "@testing-library/svelte";
import CharacterCreatorForm from "$lib/components/CharacterCreatorForm.svelte";
import type {CharacterCreatorFormProps} from "$lib/components/types";
import {createDndClass, createSkillProficiencyChoices} from "$lib/stores/dnd5eStore/__tests__/testDataUtil";
import {userEvent} from "@testing-library/user-event";
import {selectBackground, selectClass, selectClassSkill} from "../../../__tests__/utils";
import type {DnDBackground} from "$lib/srdData/backgrounds";

test('shows class list', () => {
  const props: CharacterCreatorFormProps = {
    classes: [
      createDndClass({name: 'testClass1', index: 'testClass1index'}),
      createDndClass({name: 'testClass2', index: 'testClass2index'})
    ],
    background: undefined,
    characterClass: undefined,
    selectedClassSkills: [],
    onCharacterClassChange: () => {
    },
    onBackgroundChange: newBackground => {
    },
    onClassSkillsChange: newSkills => {
    },
  };

  render(CharacterCreatorForm, props);

  expect(screen.queryByText("Create a D&D Character")).not.toBeInTheDocument();
  const classSelect = screen.getByRole('combobox');
  const {getAllByRole} = within(classSelect);
  const options = getAllByRole('option');
  expect(options).toHaveLength(3);
  expect(options[0]).toHaveValue('');
  expect(options[1]).toHaveValue('testClass1index');
  expect(options[1]).toHaveTextContent('testClass1');
  expect(options[2]).toHaveValue('testClass2index');
  expect(options[2]).toHaveTextContent('testClass2');
});