import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../components/TaskItem";
import { describe, test, expect, vi } from "vitest";

describe("TaskItem", () => {
  const baseProps = {
    title: "Test Task",
    category: "Work",
    priority: "high" as const,
    isCompleted: false,
    pinned: false,
    onDelete: vi.fn(),
    onToggle: vi.fn(),
    onEdit: vi.fn(),
    onTogglePin: vi.fn(),
    dragListeners: {},
  };

  test("calls onDelete when delete button is clicked", () => {
    render(<TaskItem {...baseProps} />);

    const allButtons = screen.getAllByRole("button");
    fireEvent.click(allButtons[2]); 

    expect(baseProps.onDelete).toHaveBeenCalled();
  });

  test("calls onToggle when check button is clicked", () => {
    render(<TaskItem {...baseProps} />);

    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(baseProps.onToggle).toHaveBeenCalled();
  });

  test("enters edit mode and saves edited title", () => {
    render(<TaskItem {...baseProps} />);

    fireEvent.click(screen.getAllByRole("button")[0]); 

    const input = screen.getByDisplayValue("Test Task");
    fireEvent.change(input, { target: { value: "Updated Task" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(baseProps.onEdit).toHaveBeenCalledWith("Updated Task");
  });

  test("calls onTogglePin when pin button is clicked", () => {
    render(<TaskItem {...baseProps} />);

    fireEvent.click(screen.getAllByRole("button")[3]); 

    expect(baseProps.onTogglePin).toHaveBeenCalled();
  });
});