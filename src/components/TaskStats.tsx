interface TaskStatsProps {
    total: number;
    completed: number;
    remaining : number;
}
export default function TaskStats({total, completed,remaining}:TaskStatsProps) {
  return (
    <div className="flex justify-center gap-4 text-sm text-gray-600 mb-4">
      <span>Total: <strong>{total}</strong></span>
      <span>Completed: <strong>{completed}</strong></span>
      <span>Remaining<strong>{remaining}</strong></span>
    </div>
  )
}
