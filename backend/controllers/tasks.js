const Task = require('../models/Task')
const errorHandler = require('../utils/errorHandler')

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: tasks,
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

exports.addTask = async (req, res) => {
  try {
    await Task.create({
      title: req.body.title,
      user: req.user.id
    })
    res.status(201).json({
      status: 'success',
      data: {
        task: req.body
      }
    })
  } catch (e) {
    res.status(400).json({
      status: 'error',
      message: e
    })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    await Task.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Задача была удалена'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true } 
    )
    res.status(200).json(task)
  } catch (e) {
    errorHandler(res, e)
  }
}