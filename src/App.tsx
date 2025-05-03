import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}
export default function App() {
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      isCompleted: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };
  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.isCompleted;
      if (filter === "incomplete") return !task.isCompleted;
      return true;
    })
    .filter((task) =>
      task.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
          Manage Your Day Like a Pro
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl pb-8">
          A clean and minimal task manager to organize your life
        </p>
        <AddTaskForm onAdd={handleAddTask} />
        <div className=" flex gap-2 justify-center mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`btn btn-sm ${
              filter === "all" ? "btn-primary" : "btn-outline"
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`btn btn-sm ${
              filter === "completed" ? "btn-primary" : "btn-outline"
            }`}
          >
            Complete
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className={`btn btn-sm ${
              filter === "incomplete" ? "btn-primary" : "btn-outline"
            }`}
          >
            Incomplete
          </button>
          <div className="relative max-w-md mx-auto mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pr-10"
            />

            <button
              onClick={() => setSearchQuery("")}
              disabled={!searchQuery}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition-opacity ${
                searchQuery
                  ? "text-gray-600 opacity-100"
                  : "opacity-30 cursor-default"
              }`}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </motion.div>
    </div>
  );
}
