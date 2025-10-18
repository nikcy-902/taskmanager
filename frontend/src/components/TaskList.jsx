import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onEdit }){
  if (!tasks.length) return <div className="empty">No tasks yet — create your first one.</div>
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}
