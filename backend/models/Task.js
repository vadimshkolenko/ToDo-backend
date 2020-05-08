const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  user: {
    ref: 'users',
    type: mongoose.Schema.Types.ObjectId
  }
})

const Task = mongoose.model('Task', taskSchema, 'tasks') //третий параметр имя коллекции, а первый название модели

module.exports = Task