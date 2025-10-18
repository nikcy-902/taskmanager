import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../lib/api'

export default function TaskDetail(){
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true)
      try{
        const res = await api.get(`/tasks/${id}`)
        setTask(res.data)
      }catch(err){
        setError('Unable to load task')
      }finally{ setLoading(false) }
    }
    load()
  },[id])

  if(loading) return <div className="loading">Loading task...</div>
  if(error) return <div className="error">{error}</div>
  if(!task) return <div className="empty">Task not found</div>

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>{task.title}</h2>
      {task.description && <p style={{color:'var(--muted)'}}>{task.description}</p>}
      <div style={{marginTop:12}}>
        <Link to="/" className="btn ghost">Back</Link>
      </div>
    </div>
  )
}
