import { render, screen } from "@testing-library/react";
import TaskList from "../components/TaskList";
import { describe, test, expect } from "vitest";


const tasks = [
    { id: 1, title: "Task 1", category: "Work", priority: "low" as const, isCompleted: true },
    { id: 2, title: "Task 2", category: "Work", priority: "medium" as const, isCompleted: false },
    { id: 3, title: "Task 3", category: "Work", priority: "high" as const, isCompleted: false },
  ];
  

const renderList = (filter: "all" | "completed" | "incomplete") => {
  return render(
    <TaskList
      tasks={tasks}
      filter={filter}
      onDelete={() => {}}
      onToggle={() => {}}
      onEdit={() => {}}
      onTogglePin={() => {}}
    />
  );
};

describe("TaskList filtering", () => {
  test("shows all tasks when filter is 'all'", () => {
    renderList("all");

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  test("shows only completed tasks when filter is 'completed'", () => {
    renderList("completed");

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
  });

  test("shows only incomplete tasks when filter is 'incomplete'", () => {
    renderList("incomplete");

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });
});
