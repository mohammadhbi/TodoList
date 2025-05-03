import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterControls from "./components/FilterControls";
import { motion } from "framer-motion";
import EmptyState from "./EmptyState";
import TaskStats from "./components/TaskStats";
import TaskBackupControls from "./components/TaskBackupControls";
interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  category: string;
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

  const handleAddTask = (title: string, category: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      category,
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
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const remainingTasks = totalTasks - completedTasks;

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.isCompleted));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-white px-4 py-6 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-8 max-w-2xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
          Manage Your Day Like a Pro
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl pb-8">
          A clean and minimal task manager to organize your life
        </p>

        <AddTaskForm onAdd={handleAddTask} />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
        <FilterControls value={filter} onChange={setFilter} />
        {filteredTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Tasks</h2>
              <TaskBackupControls tasks={tasks} setTasks={setTasks} />
            </div>

            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          </>
        )}

        <TaskStats
          total={totalTasks}
          completed={completedTasks}
          remaining={remainingTasks}
        />
        {completedTasks > 0 && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleClearCompleted}
              className="btn btn-sm btn-error btn-outline"
            >
              Clear Completed Tasks
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
