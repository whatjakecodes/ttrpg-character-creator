import type {UserEvent} from "@testing-library/user-event";
import {screen, within} from "@testing-library/svelte";
import type {DnDSkillName} from "$lib/srdData/skills";

export async function selectClass(user: UserEvent, className: string) {
  const classSelect = screen.getByRole('combobox', {name: 'Pick a 5e Character Class'});
  await user.click(classSelect);
  await user.selectOptions(classSelect, className);
}

export async function selectBackground(user: UserEvent, background: string) {
  const select = screen.getByRole('combobox', {name: 'Pick a 5e Background'});
  await user.click(select);
  await user.selectOptions(select, background);
}

export async function selectClassSkill(user: UserEvent, className: string, skillName: DnDSkillName) {
  const classSkills = within(screen.getByLabelText(`Choose 2 ${className} Class Skills:`));
  await user.click(classSkills.getByRole('button', {name: skillName}));
}