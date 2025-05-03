interface TaskItemProps {
  title: string;
  isCompleted?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
}
export default function TaskItem({
  title,
  isCompleted = false,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <div>
      <li className="flex items-center justify-between p-2 rounded border bg-base-100 shadow-sm">
        <span
          className={`flex-1 ${
            isCompleted ? "line-through text-gray-400" : ""
          }`}
        >
          {title}
        </span>
        <button onClick={onToggle}>✅</button>
        <button onClick={onDelete}>🗑</button>
      </li>
    </div>
  );
}
