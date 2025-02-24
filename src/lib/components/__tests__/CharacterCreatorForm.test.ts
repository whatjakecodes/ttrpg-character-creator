import {expect, test} from "vitest";
import {render, screen, within} from "@testing-library/svelte";
import CharacterCreatorForm from "$lib/components/CharacterCreatorForm.svelte";
import type {CharacterCreatorFormProps} from "$lib/components/types";
import {createDndClass} from "$lib/stores/dnd5eStore/__tests__/testDataUtil";
import {DnDSelection} from "$lib";

function NO_OP() {
}

test('shows class list', () => {
  const props: CharacterCreatorFormProps = {
    selection: new DnDSelection("test-character-name"),
    onCharacterNameChange: NO_OP,
    classes: [
      createDndClass({name: 'testClass1', index: 'testClass1index'}),
      createDndClass({name: 'testClass2', index: 'testClass2index'})
    ],
    onSpeciesChange: NO_OP,
    onCharacterClassChange: NO_OP,
    onBackgroundChange: NO_OP,
    onClassSkillsChange: NO_OP,
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