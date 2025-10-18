import React, { useEffect, useState } from 'react'
import api from './lib/api'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskDetail from './components/TaskDetail'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    setLoading(true)
    try {
      const res = await api.get('/tasks')
      setTasks(res.data)
    } catch (err) {
      setError('Could not load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadTasks() }, [])

  const addTask = async (payload) => {
    const res = await api.post('/tasks', payload)
    setTasks(prev => [res.data, ...prev])
  }

  const updateTask = async (id, patch) => {
    const res = await api.put(`/tasks/${id}`, patch)
    setTasks(prev => prev.map(t => t.id === id ? res.data : t))
  }

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="app-root">
      <header className="topbar">
        <h1>Task Manager</h1>
        <p className="sub">Simple, elegant tasks with local JSON storage</p>
      </header>

      <main className="container">
        <section className="left">
          <TaskForm onCreate={addTask} />
        </section>

        <section className="right">
          {loading ? <div className="loading">Loading...</div>
            : error ? <div className="error">{error}</div>
            : (
              <Routes>
                <Route path="/" element={<TaskList tasks={tasks} onToggle={updateTask} onDelete={deleteTask} onEdit={updateTask} />} />
                <Route path="/tasks/:id" element={<TaskDetail />} />
              </Routes>
            )}
        </section>
      </main>

      <footer className="footer">Built with ❤️ • Backend: http://localhost:4000</footer>
    </div>
  )
}
