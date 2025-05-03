import { useState } from "react";

// Props type definition: receives a function to add a new task
interface AddTaskFormProps {
  onAdd: (title: string) => void;
}
// A form component for adding new tasks
export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (cleanTitle === "") {
      return;
    }
    onAdd(cleanTitle); // Pass the task title to the parent component
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-4">
        <input
          type="text"
          value={title}
          className="input input-bordered w-full"
          placeholder="Add new task"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}
