interface TaskListProps{
    tasks: string[];
}

// A component that renders the list of tasks
export default function TaskList({tasks}:TaskListProps) {
  return (
    <div>
      <ul>
        {tasks.map((task,index)=>(
            <li key={index}>
                {task}
            </li>
        ))}
      </ul>
    </div>
  )
}
