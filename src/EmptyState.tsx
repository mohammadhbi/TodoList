import { Inbox } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center text-gray-400 mt-8 flex flex-col items-center gap-2">
      <Inbox size={48} className="text-gray-300" />
      <p className="text-lg">No tasks found</p>
      <p className="text-sm">Try changing the filter or add a new task.</p>
    </div>
  );
}
