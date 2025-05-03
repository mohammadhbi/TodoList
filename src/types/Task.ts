export interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
    category: string;
    priority: "low" | "medium" | "high";
    pinned?: boolean;
  }
  