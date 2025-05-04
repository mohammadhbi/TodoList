import { TaskBackupControlsProps } from "../types/Props";

export default function TaskBackupControls({
  tasks,
  setTasks,
}: TaskBackupControlsProps) {
  const handleExport = () => {
    const datastr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([datastr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedTasks)) {
          setTasks(importedTasks);
        } else {
          alert("Invalid file format");
        }
      } catch (error) {
        alert("Failed to import tasks");
        console.error(error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-end mb-6 items-center">
      <button
        onClick={handleExport}
        className="btn btn-sm bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50 transition shadow-sm"
      >
        Export
      </button>

      <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition">
        <span className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm">
          Import
        </span>
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}
