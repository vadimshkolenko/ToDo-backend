const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const tasksRoutes = require('./routes/tasks')
const authRoutes = require('./routes/auth')

const app = express()

app.use(passport.initialize()) 
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('cors')())
 

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/tasks', tasksRoutes)

module.exports = app