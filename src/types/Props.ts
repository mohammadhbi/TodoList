import { Task } from "./Task";

export interface TaskItemProps {
  title: string;
  isCompleted?: boolean;
  category: string;
  priority: Task["priority"];
  onToggle?: () => void;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
  pinned?:boolean;
  onTogglePin?:()=> void;
  dragListeners?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface AddTaskFormProps {
  onAdd: (title: string, category: string, priority: Task["priority"]) => void;
}

export interface TaskListProps {
    tasks: Task[];
    filter?: "all" | "completed" | "incomplete"; 
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newTitle: string) => void;
    onTogglePin: (id: number) => void;
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