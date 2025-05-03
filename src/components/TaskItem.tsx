import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trash2, Pencil } from "lucide-react";

interface TaskItemProps {
  title: string;
  isCompleted?: boolean;
  category: string;
  onToggle?: () => void;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
}

export default function TaskItem({
  title,
  category,
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

  const getCategoryBadgeStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "work":
        return "bg-blue-100 text-blue-800";
      case "personal":
        return "bg-green-100 text-green-800";
      case "shopping":
        return "bg-yellow-100 text-yellow-800";
      case "fitness":
        return "bg-red-100 text-red-800";
      case "study":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-200 text-gray-700";
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span
              className={`block text-sm sm:text-base transition-colors duration-200 ${
                isCompleted ? "line-through text-green-700" : "text-gray-800"
              }`}
            >
              {title}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded font-medium ${getCategoryBadgeStyle(category)}`}
            >
              {category}
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
