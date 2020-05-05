const express = require('express')
const bodyParser = require('body-parser')
const tasksRouter = require('./routes/tasksRoutes')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  )
  next()
})

app.use('/api/v1/tasks', tasksRouter)

module.exports = app