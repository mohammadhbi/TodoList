import { motion } from "framer-motion";
import { CheckCircle, Trash2 } from "lucide-react";
interface TaskItemProps {
  title: string;
  isCompleted?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
}
export default function TaskItem({
  title,
  isCompleted = false,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50, scale: 0.9, backgroundColor: "#fecaca" }} // bg-red-200
      transition={{ duration: 0.25 }}
      className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-all duration-300 ${
        isCompleted
          ? "bg-green-100 border border-green-300"
          : "bg-base-200 border border-base-300 hover:bg-base-300"
      }`}
    >
      <span
        className={`flex-1 text-sm sm:text-base transition-colors duration-200 ${
          isCompleted ? "line-through text-green-700" : "text-gray-800"
        }`}
      >
        {title}
      </span>

      <div className="flex gap-2 items-center">
        <button
          onClick={onToggle}
          className="btn btn-sm btn-circle btn-outline hover:bg-green-500 hover:border-green-500 hover:text-white transition-all duration-200"
          title="Mark as complete"
        >
          <CheckCircle size={18} />
        </button>
        <button
          onClick={onDelete}
          className="btn btn-sm btn-circle btn-outline hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.li>
  );
}
