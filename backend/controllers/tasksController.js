const Task = require('../models/taskModel')

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find()
  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: tasks,
  })
}

exports.addTask = async (req, res) => {
  try {
    await Task.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        task: req.body
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    })
  }
}