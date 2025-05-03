import TaskItem from "./TaskItem";
import { TaskListProps } from "../types/Props";

// A component that renders the list of tasks
export default function TaskList({ tasks ,onToggle,onDelete,onEdit, onTogglePin}: TaskListProps) {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            category={task.category}
            priority={task.priority}
            isCompleted={task.isCompleted}
            pinned={task.pinned}
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
            onEdit={(newTitle) => onEdit(task.id, newTitle)}
            onTogglePin={() => onTogglePin(task.id)} 
          />
        ))}
      </ul>
    </div>
  );
}
