import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskListProps } from "../types/Props";
import TaskItem from "./TaskItem";
import { Task } from "../types/Task";
interface SortableTaskItemProps {
  id: number;
  title: string;
  category: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
  pinned?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
  onTogglePin?: () => void;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onTogglePin,
  onReorder,
}: TaskListProps & { onReorder?: (updatedTasks: Task[]) => void }) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      if (onReorder) onReorder(newTasks);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul>
          {tasks.map((task) => (
            <SortableTaskItem
              key={task.id}
              id={task.id}
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
      </SortableContext>
    </DndContext>
  );
}

function SortableTaskItem(props: SortableTaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
  <TaskItem {...props} dragListeners={listeners} />
</li>
  );
}
