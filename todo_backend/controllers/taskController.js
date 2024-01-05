const Task = require('../models/taskModel');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.username });
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({
      userId: req.user.username,
      // userId: req.body.username,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};


const updateTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
