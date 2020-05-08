const express = require('express')
const controller = require('../controllers/tasks')
const passport = require('passport')

const router = express.Router()

// router
//   .route('/') // этот путь добавляется к тому что в use
//   .get(passport.authenticate('jwt', { session: false }), controller.getAllTasks)
//   .post(passport.authenticate('jwt', { session: false }), controller.addTask)

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAllTasks)
router.post('/', passport.authenticate('jwt', { session: false }), controller.addTask)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteTask)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.updateTask)

module.exports = router