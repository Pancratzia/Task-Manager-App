// list.test.jsx
import { describe, it, afterEach, expect } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Asegúrate de importar MemoryRouter

import List from "../components/List";

describe("List component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render", () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );
  });

  it("should render title correctly", () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    screen.getByText("Task List");
  });

  it('should navigate to the create task page when "Create Task" button is clicked', async () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Create Task"));

    const checkUrlChange = () => {
      if (window.location.pathname === "/create") {
        done();
      } else {
        setTimeout(checkUrlChange, 100);
      }
    };

    checkUrlChange();
  });

  it("should show no tasks message when there are no tasks", () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    screen.getByText("No tasks available");
  });

  it("should render a task correctly", () => {
    const tasks = [
      { id: 1, status: 0, priority: "high", name: "Task 1" },
      { id: 2, status: 1, priority: "low", name: "Task 2" },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    screen.getByText("Task 1");
  });

  it("should navigate to the edit task page when the name of each task is clicked", async () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Task 1"));

    const checkUrlChange = () => {
      if (window.location.pathname === "/edit/1") {
        done();
      } else {
        setTimeout(checkUrlChange, 100);
      }
    };

    checkUrlChange();
  });

  it("should filter tasks by status", () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Pending"));

    screen.getByText("Task 1");
  });

  it("should redirect to the edit task page when the name of each task is clicked", async () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Task 1"));

    const checkUrlChange = () => {
        if (window.location.pathname === "/edit/1") {
          done();
        } else {
          setTimeout(checkUrlChange, 100);
        }
      };
  
      checkUrlChange();
  });
});
