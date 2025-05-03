import TaskItem from "./TaskItem";
import { Task } from "../types/Task";
interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

// A component that renders the list of tasks
export default function TaskList({ tasks ,onToggle,onDelete,onEdit}: TaskListProps) {
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
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
            onEdit={(newTitle) => onEdit(task.id, newTitle)}
          />
        ))}
      </ul>
    </div>
  );
}
