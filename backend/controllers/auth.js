const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

require('dotenv').config()


exports.login = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      //генерируем токен если пароли совпадают
      // 1 параметр объект, который мы шифруем, 2 секретный ключ для генерации токена, 3 время жизни
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, process.env.JWT, { expiresIn: 3600 })

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Неверный пароль'
      })
    }
  } else {
    res.status(404).json({
      message: 'Пользователь с таким email не найден'
    })
  }
}

exports.register = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    res.status(409).json({
      message: 'Пользователь с таким email уже существует'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      //сохраняем в базу
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}

exports.logout = (req, res) => {
  //исправить
  // res.status(200).json({ token: null })
  const token = jwt.sign({}, process.env.JWT, { expiresIn: 0 })

  res.status(200).json({
    token: `Bearer ${token}`
  })
}