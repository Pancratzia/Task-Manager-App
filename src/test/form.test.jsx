import { describe, it, afterEach, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Form from "../components/Form";

describe("Form component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render create task form", () => {
    render(
      <MemoryRouter initialEntries={["/create"]}>
        <Form />
      </MemoryRouter>
    );

  });

  it("should render edit task form", () => {
    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Form />
      </MemoryRouter>
    );
  });
});
