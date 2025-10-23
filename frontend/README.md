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

The project configuration is handled by the file /src/lib/api.js in which the base URL of the API is set. This value is adjustable when using a host or port that is different than that of the backend. Vite 7 and React 18 are used in the building of the project, and, therefore, in case of any significant changes in major dependencies, it is recommended to test the development server and production build to confirm stability. Its frontend contains a minimal custom CSS theme in the file: src/styles.css, that is free to be customized to required design preferences.

The project shall be purely local in order to enhance security. It uses a local JSON file as the storage storage behind it which should not be exposed to a production environment unless it is first substituted with a proper database and authentication system.

When things are wrong or there are warnings during installation, e.g. in the case of an npm audit, you can also check it with npm audit and make safe updates with npm audit fix. The use of the -force flag is only recommended in cases where you can test and ensure that the breaking changes will not impact on functionality.

As soon as installed, you can easily add new tasks (using the left column) and see or update them (using the task list) which makes it an easy but powerful failsafe tool in task management on the local level.
