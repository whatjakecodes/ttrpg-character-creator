﻿import {describe, expect, it, vi} from "vitest";
import HomePage from '../+page.svelte';
import {render, fireEvent} from "@testing-library/svelte";
import {userEvent} from "@testing-library/user-event";
import {dndSRDStore} from "$lib/stores/dnd5eStore";

describe("main page", () => {
  it('should render', () => {
    const subject = render(HomePage);

    expect(subject.getByText("Create a D&D Character")).toBeInTheDocument();
  });


  it('should show core class traits', async () => {
    const testData = [{
      name: 'rogue',
    }, {
      name: 'warlock',
    }];
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(testData)
    })
    vi.stubGlobal('fetch', mockFetch);

    const user = userEvent.setup();
    const subject = render(HomePage);

    await dndSRDStore.fetchClasses();
    
    const classSelect = subject.getByRole('combobox', { name: 'Pick a 5e Character Class' });
    await user.click(classSelect);
    await user.selectOptions(classSelect, 'warlock');
    expect(subject.getByText('Selected Class: warlock')).toBeInTheDocument();
  });
});