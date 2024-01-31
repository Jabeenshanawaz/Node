const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

const tasks = [];

app.use(bodyParser.json());

// Middleware for basic user authentication
app.use((req, res, next) => {
  const username = req.headers['username']; // You may use a proper authentication method
  req.user = username;
  next();
});

// Get tasks for a specific user
app.get('/tasks', (req, res) => {
  const userTasks = tasks.filter(task => task.user === req.user);
  res.json(userTasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, deadline } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    deadline,
    user: req.user,
    completed: false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Edit a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId && task.user === req.user);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.title = req.body.title || task.title;
  task.deadline = req.body.deadline || task.deadline;

  res.json(task);
});

// Mark a task as complete
app.put('/tasks/:id/complete', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId && task.user === req.user);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.completed = true;
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId && task.user === req.user);
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

// Set up a reminder
app.post('/tasks/:id/remind', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId && task.user === req.user);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  // Implement nodemailer to send reminders here

  res.json({ message: 'Reminder sent successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
