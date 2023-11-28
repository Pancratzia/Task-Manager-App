import { describe, it, afterEach, expect } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Filters from "../components/Filters";

describe("Filters component", () => {
  afterEach(() => {
    cleanup();
  });

  const mockFilters = {
    statusFilters: {
      completed: true,
      pending: false,
    },
    priorityFilters: {
      high: true,
      medium: false,
      low: true,
    },
    handleStatusFilterChange: () => {},
    handlePriorityFilterChange: () => {},
  };

  it("should handle status filter change", () => {
    let changedStatusFilter = null;
    render(
      <MemoryRouter>
        <Filters
          {...mockFilters}
          handleStatusFilterChange={(filter) => {
            changedStatusFilter = filter;
          }}
        />
      </MemoryRouter>
    );

    const pendingCheckbox = screen.getByLabelText("Pending");
    fireEvent.click(pendingCheckbox);

    expect(changedStatusFilter).toBe("pending");
  });

  it("should handle priority filter change", () => {
    let changedPriorityFilter = null;
    render(
      <MemoryRouter>
        <Filters
          {...mockFilters}
          handlePriorityFilterChange={(filter) => {
            changedPriorityFilter = filter;
          }}
        />
      </MemoryRouter>
    );

    const mediumCheckbox = screen.getByLabelText("Medium");
    fireEvent.click(mediumCheckbox);

    expect(changedPriorityFilter).toBe("medium");
  });
});
