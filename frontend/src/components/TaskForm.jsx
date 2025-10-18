import React, { useState } from 'react'

export default function TaskForm({ onCreate }){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setBusy(true)
    try{
      await onCreate({ title: title.trim(), description: description.trim() })
      setTitle('')
      setDescription('')
    }catch(err){
      // noop
    }finally{ setBusy(false) }
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <label className="label">Create Task</label>
      <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="textarea" placeholder="Description (optional)" value={description} onChange={e=>setDescription(e.target.value)} />
      <div className="form-row">
        <button className="btn primary" type="submit" disabled={busy}>{busy ? 'Saving...' : 'Add Task'}</button>
      </div>
    </form>
  )
}
