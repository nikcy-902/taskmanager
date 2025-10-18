# Task Manager — Frontend

This is a Vite + React frontend for the Task Manager backend. It provides a clean UI to create, edit, complete and delete tasks.

Local dev
- Dev server: http://localhost:3000 (configured in `vite.config.js`)
- Expects backend API at: http://localhost:4000/api by default

Quick start

```powershell
cd frontend
npm install
npm run dev
```

Build for production

```powershell
npm run build
npm run preview
```

Configuration
- API base URL is set in `src/lib/api.js`. Change it if your backend runs on another host/port.

Notes
- This project uses Vite 7 and React 18. If you update major dependencies, test the dev server and build.
- The frontend ships with a small CSS theme (no Tailwind). Feel free to customize `src/styles.css`.

Security
- For local development the project uses a local JSON file backend. Don't expose this backend to production without replacing it with a proper database and auth.

Troubleshooting
- If you see npm audit warnings, run `npm audit` to inspect, and `npm audit fix` to apply safe updates. Use `--force` only when you can test breaking changes.

Enjoy! Create tasks from the left column and view/edit them from the list.
