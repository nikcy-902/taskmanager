# Task Manager — Backend

This is a minimal Express backend for the Task Manager app.

Features
- CRUD API for tasks stored in `db.json` (local JSON file)
- Endpoints:
  - GET /api/tasks — list tasks
  - GET /api/tasks/:id — get single task
  - POST /api/tasks — create task (JSON body: { title, description })
  - PUT /api/tasks/:id — update task
  - DELETE /api/tasks/:id — delete task

Requirements
- Node.js 18+ recommended

Install & run
```powershell
cd backend
npm install
node app.js
```

Notes
- The server listens on port 4000 by default. If you need a different port, set the PORT environment variable or edit `app.js`.
- This backend stores data in `db.json` in the backend folder. It's intended for local development and demo use only.
