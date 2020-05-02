const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: String
})

const Task = mongoose.model('Task', taskSchema, 'tasks') //третий параметр имя коллекции, а первый название модели

module.exports = Task