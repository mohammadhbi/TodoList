import { render, screen, fireEvent } from "@testing-library/react";
import AddTaskForm from "../components/AddTaskForm"; 
import { describe, test, expect, vi } from "vitest"; 

describe("AddTaskForm", () => {
  test("calls onAdd with correct values and resets input", () => {
    const mockAdd = vi.fn();

    render(<AddTaskForm onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText(/add new task/i);
    const button = screen.getByRole("button", { name: /add/i });

   
    fireEvent.change(input, { target: { value: "Buy milk" } });

   
    fireEvent.click(button);

   
    expect(mockAdd).toHaveBeenCalledWith("Buy milk", "p", "low");

    
    expect(input).toHaveValue("");
  });
});
