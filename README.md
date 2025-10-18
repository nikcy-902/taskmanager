# Task Manager (Full Stack)

A small full-stack task manager demo app.

Structure
- backend/ — Express API storing tasks in a local `db.json` file
- frontend/ — Vite + React frontend (UI) consuming the backend API

Quick start (local development)
1. Start the backend:
```powershell
cd backend
npm install
node app.js
# or: npm start if you have a start script
```

2. Start the frontend (new terminal):
```powershell
cd frontend
npm install
npm run dev
```

Open the frontend at http://localhost:3000. The frontend will talk to the backend at http://localhost:4000/api by default.

Notes
- This project is for demo/local development only. The backend uses a JSON file for persistence and has no authentication.
- To change ports edit `backend/app.js` (PORT) and `frontend/src/lib/api.js` (base URL).

Security & audits
- I upgraded dev tooling to Vite 7 and related plugins to clear reported vulnerabilities. Run `npm audit` in both `frontend` and `backend` if you want a local report.

Contributing
- Feel free to open issues or PRs with improvements (tests, docker, CI, authentication, DB backend).

Contact
- N/A — local project
