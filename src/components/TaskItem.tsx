import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trash2, Pencil } from "lucide-react";

interface TaskItemProps {
  title: string;
  isCompleted?: boolean;
  category: string;
  priority: "low" | "medium" | "high";
  onToggle?: () => void;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
}

export default function TaskItem({
  title,
  category,
  priority,
  isCompleted = false,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSave = () => {
    if (onEdit && editedTitle.trim()) {
      onEdit(editedTitle.trim());
      setIsEditing(false);
    }
  };

  const getPriorityColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "high":
        return "badge-error";
      case "medium":
        return "badge-warning";
      case "low":
      default:
        return "badge-success";
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-all duration-300 ${
        isCompleted
          ? "bg-green-100 border border-green-300"
          : "bg-base-200 border border-base-300 hover:bg-base-300"
      }`}
    >
      {isEditing ? (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="flex-1 input input-sm input-bordered mr-2"
          autoFocus
        />
      ) : (
        <div className="flex-1">
          <span
            className={`block text-sm sm:text-base transition-colors duration-200 ${
              isCompleted ? "line-through text-green-700" : "text-gray-800"
            }`}
          >
            {title}
          </span>
          <div className="flex gap-2 mt-1">
            <span className="badge badge-outline text-xs">{category}</span>
            <span className={`badge text-xs ${getPriorityColor(priority)}`}>
              {priority}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2 items-center ml-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="btn btn-sm btn-outline btn-success"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-outline"
            title="Edit task"
          >
            <Pencil size={16} />
          </button>
        )}

        <button
          onClick={onToggle}
          className="btn btn-sm btn-circle btn-outline hover:bg-green-500 hover:border-green-500 hover:text-white"
        >
          <CheckCircle size={16} />
        </button>

        <button
          onClick={onDelete}
          className="btn btn-sm btn-circle btn-outline hover:bg-red-500 hover:border-red-500 hover:text-white"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.li>
  );
}
