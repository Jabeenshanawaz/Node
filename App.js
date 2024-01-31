import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', deadline: '' });

  const fetchTasks = async () => {
    const username = 'user123'; // Replace with actual user authentication
    const response = await axios.get(`${API_BASE_URL}/tasks`, { headers: { username } });
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    const username = 'user123'; // Replace with actual user authentication
    await axios.post(`${API_BASE_URL}/tasks`, { ...newTask, username });
    fetchTasks();
    setNewTask({ title: '', deadline: '' });
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Notes App</h1>
      <div>
        <h2>Create New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Deadline"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - Deadline: {task.deadline}{' '}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;






