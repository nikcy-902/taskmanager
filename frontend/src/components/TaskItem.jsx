import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TaskItem({ task, onToggle, onDelete, onEdit }){
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [expanded, setExpanded] = useState(false)

  const toggle = async () => {
    await onToggle(task.id, { completed: !task.completed })
  }

  const saveEdit = async () => {
    await onEdit(task.id, { title: title.trim(), description: description.trim() })
    setEditing(false)
  }

  return (
    <div className={`task ${task.completed ? 'done' : ''} ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="left">
        <input type="checkbox" checked={task.completed} onChange={toggle} />
      </div>
      <div className="mid">
        {editing ? (
          <>
            <input className="input small" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="textarea small" value={description} onChange={e=>setDescription(e.target.value)} />
            <div className="row">
              <button className="btn" onClick={saveEdit}>Save</button>
              <button className="btn ghost" onClick={()=>setEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="title-wrapper">
              <Link className="title" to={`/tasks/${task.id}`}>{task.title}</Link>
            </div>
            {task.description && <div className="desc">{task.description}</div>}
          </>
        )}
      </div>
      <div className="right">
        {!editing && <button className="btn ghost" onClick={()=>setEditing(true)}>Edit</button>}
        <button className="btn danger" onClick={()=>onDelete(task.id)}>Delete</button>
      </div>
    </div>
  )
}
