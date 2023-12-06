import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks on component mount
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3001/getTasks');
        setTasks(response.data.tasks);
    };

    const addTask = async () => {
        await axios.post('http://localhost:3001/addTask', {task});
        fetchTasks(); // Refresh tasks after adding
        setTask(''); // Clear input
    };

    return (
        <div className='container'>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
           <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
