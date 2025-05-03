import { Task } from "../types/Task";
  
  interface TaskBackupControlsProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  }
  
  export default function TaskBackupControls({ tasks, setTasks }: TaskBackupControlsProps) {
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
      <div className="flex flex-wrap gap-2 justify-end mb-4">
        <button onClick={handleExport} className="btn btn-outline btn-sm">
          Export
        </button>
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="file-input file-input-sm"
        />
      </div>
    );
  }
  