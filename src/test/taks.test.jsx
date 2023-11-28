import { describe, it, afterEach, expect } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Task from "../components/Task";

describe("Task component", () => {
  afterEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  const mockTask = {
    id: 1,
    status: 0,
    priority: "high",
    name: "Task 1",
    dueDate: "2023-12-01",
  };

  it("should render a task", () => {
    render(
      <MemoryRouter>
        <Task
          task={mockTask}
          handleDeleteButtonClick={() => {}}
          handleCheckboxChange={() => {}}
        />
      </MemoryRouter>
    );
  });

  it("should handle checkbox change", () => {
    let isChecked = false;
    render(
      <MemoryRouter>
        <Task
          task={mockTask}
          handleDeleteButtonClick={() => {}}
          handleCheckboxChange={() => {
            isChecked = !isChecked;
          }}
        />
      </MemoryRouter>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(isChecked).toBe(true);
  });

  it("should handle delete button click", () => {
    let deletedTaskId = null;
    render(
      <MemoryRouter>
        <Task
          task={mockTask}
          handleDeleteButtonClick={(taskId) => {
            deletedTaskId = taskId;
          }}
          handleCheckboxChange={() => {}}
        />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText("✕");
    fireEvent.click(deleteButton);

    expect(deletedTaskId).toBe(1);
  });
  
});
