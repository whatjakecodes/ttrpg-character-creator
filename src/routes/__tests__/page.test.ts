import {describe, expect, it} from "vitest";
import HomePage from '../+page.svelte';
import {render} from "@testing-library/svelte";

describe("main page", () => {
  it('should render', () => {
    const subject = render(HomePage);

    expect(subject.getByText("Create a D&D Character")).toBeInTheDocument();
  });
});