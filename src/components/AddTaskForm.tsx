import { useState } from "react";

// Props type definition: receives a function to add a new task
interface AddTaskFormProps {
  onAdd: (title: string, category: string) => void;
}

const CATEGORIES =["personal", "Work", "shopping","Other"];

// A form component for adding new tasks
export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [category,SetCategory]=useState(CATEGORIES[0])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (cleanTitle === "") {
      return;
    }
    onAdd(cleanTitle,category[0]); // Pass the task title to the parent component
    setTitle("");
    SetCategory(CATEGORIES[0]);
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
        <select 
        value={category}
        onChange={(e)=>SetCategory(e.target.value)}
        className="select select-bordered w-full sm:w-auto">
{
  CATEGORIES.map((cat)=>(
    <option key={cat} value={cat}>
{cat}
    </option>
  ))
}
        </select>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}
