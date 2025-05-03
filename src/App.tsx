// import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";

export default function App() {
  const handleAddTask = (title: string) => {
    console.log("New task:", title);
  };
//  const [task,setTask]=useState<string[]>([]);
  return (
    <div>
<AddTaskForm onAdd={handleAddTask}/>    
    </div>
  )
}
