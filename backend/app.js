const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());

// Parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Fallback: parse text/plain or missing content-type bodies and try to JSON.parse them.
// This helps when clients (e.g. Postman) send raw text without setting Content-Type: application/json
app.use(express.text({ type: ['text/*', '*/*'], limit: '100kb' }));

// Safety middleware: if body-parser produced a string (raw body), attempt to parse JSON.
app.use((req, res, next) => {
  // If body is a string, try to parse it as JSON.
  if (typeof req.body === 'string') {
    const trimmed = req.body.trim();
    if (trimmed === '') {
      req.body = {};
      return next();
    }
    try {
      req.body = JSON.parse(trimmed);
    } catch (err) {
      // Not valid JSON — keep body as empty object so handlers receive an object.
      req.body = {};
    }
  }

  if (req.body === undefined || req.body === null) req.body = {};
  next();
});

const dbPath = path.join(__dirname, "db.json");

// Path to JSON file
const DATA_FILE = "./db.json";

// Read JSON file
function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ tasks: [] }, null, 2));
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

// Write to JSON file
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ✅ Get all tasks
app.get("/api/tasks", (req, res) => {
  const data = readData();
  res.json(data.tasks);
});

// ✅ Get a single task
app.get("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const task = data.tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// ✅ Create a new task
app.post("/api/tasks", (req, res) => {
  // guard in case body parsing didn't run or client sent no body
  const { title, description } = req.body || {};

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const data = readData();
  const newTask = {
    id: uuidv4(),
    title,
    description: description || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  data.tasks.push(newTask);
  writeData(data);
  res.status(201).json(newTask);
});

// ✅ Update a task
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body || {};

  const data = readData();
  const taskIndex = data.tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  data.tasks[taskIndex] = {
    ...data.tasks[taskIndex],
    title: title ?? data.tasks[taskIndex].title,
    description: description ?? data.tasks[taskIndex].description,
    completed: completed ?? data.tasks[taskIndex].completed,
  };

  writeData(data);
  res.json(data.tasks[taskIndex]);
});

// ✅ Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const updatedTasks = data.tasks.filter((task) => task.id !== id);

  if (updatedTasks.length === data.tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  data.tasks = updatedTasks;
  writeData(data);
  res.json({ message: "Task deleted successfully" });
});

// Health check
app.get("/", (req, res) => {
  res.send("✅ Task Manager API is running...");
});

// Server start
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});