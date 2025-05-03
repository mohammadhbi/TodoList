import { Task } from "./Task";

export interface TaskItemProps {
  title: string;
  isCompleted?: boolean;
  category: string;
  priority: Task["priority"];
  onToggle?: () => void;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
}

export interface AddTaskFormProps {
  onAdd: (title: string, category: string, priority: Task["priority"]) => void;
}

export interface TaskListProps {
    tasks: Task[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newTitle: string) => void;
  }
 export interface TaskStatsProps {
    total: number;
    completed: number;
    remaining : number;
}
export interface TaskBackupControlsProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  }