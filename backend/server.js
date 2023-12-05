const express = require('express');
const app = express();
const port = 3001;

const storage = require('node-persist');
storage.init();

app.use(express.json());

app.post('/addTask', async (req, res) => {
    try {
        const task = req.body.task;
        const tasks = await storage.getItem('tasks') || [];
        tasks.push(task);
        await storage.setItem('tasks', tasks);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: '500, Server Error' });
    }
});

app.get('/getTasks', async (req, res) => {
    try {
        const tasks = await storage.getItem('tasks') || [];
        res.json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '500, Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

