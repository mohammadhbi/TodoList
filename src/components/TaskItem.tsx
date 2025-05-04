import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trash2, Pencil, Pin } from "lucide-react";
import { TaskItemProps } from "../types/Props";

export default function TaskItem({
  title,
  category,
  priority,
  isCompleted = false,
  onToggle,
  onDelete,
  onTogglePin,
  pinned = false,
  onEdit,
  dragListeners,
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex items-center mb-3 justify-between p-4 rounded-2xl shadow-md border-l-4 transition-all duration-300 group
    ${
      isCompleted
        ? "bg-green-100 border-green-400"
        : "bg-white hover:bg-gradient-to-r hover:from-emerald-50 hover:to-white border-emerald-400"
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
            className={`block text-base font-medium transition-colors duration-200 ${
              isCompleted
                ? "line-through text-green-700"
                : "text-gray-800 group-hover:text-emerald-700"
            }`}
          >
            {title}
          </span>
          <div className="flex gap-2 mt-1">
            <span className="badge bg-emerald-100 text-emerald-700 text-xs border-none">
              {category}
            </span>
            <span
              className={`badge text-xs text-white border-none ${getPriorityColor(
                priority
              )}`}
            >
              {priority}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2 items-center ml-3">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="btn btn-sm btn-success text-white shadow-md"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-outline hover:border-emerald-500 hover:text-emerald-600"
            title="Edit task"
          >
            <Pencil size={16} />
          </button>
        )}

        <button
          onClick={onToggle}
          className="btn btn-sm btn-circle hover:bg-emerald-500 hover:border-emerald-500 hover:text-white border-gray-300"
        >
          <CheckCircle size={16} />
        </button>

        <button
          onClick={onDelete}
          className="btn btn-sm btn-circle hover:bg-red-500 hover:border-red-500 hover:text-white border-gray-300"
        >
          <Trash2 size={16} />
        </button>

        <button
          onClick={onTogglePin}
          className={`btn btn-sm btn-circle ${
            pinned
              ? "bg-yellow-300 border-yellow-400 text-yellow-900"
              : "hover:border-yellow-400 hover:text-yellow-500"
          }`}
          title={pinned ? "Unpin" : "Pin task"}
        >
          <Pin size={16} fill={pinned ? "currentColor" : "none"} />
        </button>

        <button
          {...dragListeners}
          className="cursor-grab text-gray-400 hover:text-gray-600"
          title="Drag"
        >
          ⠿
        </button>
      </div>
    </motion.div>
  );
}
