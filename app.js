const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const { connect } = require('./routes/tasks');
require('dotenv').config();

// require('./db/connect');
const port = 5000;

// Middleware
app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use(express.static('public'));

// Routes
// app.get('/hello', (req, res) => {
//     res.send('Task Manager App')
// })

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) { console.log(error) }
}
start();