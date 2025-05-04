import { useState } from "react";
import { AddTaskFormProps } from "../types/Props";
// Props type definition: receives a function to add a new task

const CATEGORIES = ["personal", "Work", "shopping", "Other"];

// A form component for adding new tasks
export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [category, SetCategory] = useState(CATEGORIES[0]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (cleanTitle === "") {
      return;
    }
    onAdd(cleanTitle, category[0], priority); // Pass the task title to the parent component
    setTitle("");
    SetCategory(CATEGORIES[0]);
  };
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 border-l-4 border-emerald-400">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 sm:items-center"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task"
          className="input input-bordered w-full focus:border-emerald-500 focus:ring-emerald-400 transition"
        />

        <select
          value={category}
          onChange={(e) => SetCategory(e.target.value)}
          className="select select-bordered w-full sm:w-auto focus:border-emerald-500 focus:ring-emerald-400 transition"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          className="select select-bordered w-full sm:w-auto focus:border-emerald-500 focus:ring-emerald-400 transition"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="btn bg-emerald-500 text-white hover:bg-emerald-600 transition px-6 shadow-md"
        >
          Add
        </button>
      </form>
    </div>
  );
}
