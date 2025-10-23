# Task Manager — Backend

This is minimal Express backend for  Task Manager app.

Features
- CRUD API  tasks stored in `db.json` (local JSON file)
 Endpoints:
  GET /api/tasks — list tasks
   GET /api/tasks/:id — get single task
   POST /api/tasks — create task (JSON body: { title, description })
   PUT /api/tasks/:id — update task
   DELETE /api/tasks/:id — delete task

Install & run
```powershell
cd backend
npm install
node app.js
```

