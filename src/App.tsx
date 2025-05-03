import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";

export default function App() {
 const [task,setTask]=useState<string[]>([]);
  return (
    <div>
<AddTaskForm/>    
    </div>
  )
}
