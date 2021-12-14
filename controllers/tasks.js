const Task = require('../models/task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(201).json({tasks});
    } catch (error) { res.status(500).json({msg: error}) }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) { res.status(500).json({msg: error}) }
}

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).exec();
        res.status(201).json({task});
    } catch (error) { res.status(500).json({msg: error}) }
}

const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const newTask = req.body;
        const tasks = await Task.findOneAndUpdate({_id: id}, newTask);
        res.status(201).json({tasks});
    } catch (error) { res.status(500).json({msg: error}) }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.id);
        res.status(201).json({task});
    } catch (error) { res.status(500).json({msg: error}) }
}

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };