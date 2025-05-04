import { TaskStatsProps } from "../types/Props";

export default function TaskStats({total, completed,remaining}:TaskStatsProps) {
  return (
    <div className="flex justify-center gap-6 text-sm text-gray-700 mb-6 bg-white p-3 rounded-xl shadow-sm border-l-4 border-emerald-400 w-fit mx-auto">
  <span>
    Total:{" "}
    <strong className="text-gray-900 font-semibold">{total}</strong>
  </span>
  <span>
    Completed:{" "}
    <strong className="text-emerald-600 font-semibold">{completed}</strong>
  </span>
  <span>
    Remaining:{" "}
    <strong className="text-orange-500 font-semibold">{remaining}</strong>
  </span>
</div>

  )
}
