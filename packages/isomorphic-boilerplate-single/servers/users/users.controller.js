const express = require('express')
const router = express.Router()
const userService = require('./user.service')
const authorize = require('../helpers/authorize')

const login = (req, res, next) => {
  userService
    .login(req.body)
    .then((user) =>
      user
        ? res.json({
            data: user,
            error: false,
            message: 'User found successfully',
          })
        : res.sendStatus(400).json({
            data: null,
            error: true,
            message: 'Username or password is incorrect',
          })
    )
    .catch((err) => {
      res.sendStatus(400).json({ data: null, error: true, message: err })

      next(err)
    })
}

const register = (req, res, next) => {
  userService
    .create(req.body)
    .then((user) =>
      res.json({ data: user, error: false, message: 'User added successfully' })
    )
    .catch((err) => {
      res.sendStatus(400).json({ data: null, error: true, message: err })

      next(err)
    })
}

const getAll = (req, res, next) => {
  userService
    .getAll(req.query)
    .then((users) =>
      res.json({ data: users, error: false, message: 'Users found' })
    )
    .catch((err) => {
      res.sendStatus(400).json({ data: null, error: true, message: err })

      next(err)
    })
}

const getCurrent = (req, res, next) => {
  userService
    .getById(req.user.sub)
    .then((user) =>
      user
        ? res.json({ data: user, error: false, message: 'User found' })
        : res
            .sendStatus(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.sendStatus(400).json({ data: null, error: true, message: err })

      next(err)
    })
}

const getById = (req, res, next) => {
  userService
    .getById(req.params.id)
    .then((user) =>
      user
        ? res.json({ data: user, error: false, message: 'User found' })
        : res
            .sendStatus(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.sendStatus(400).json({ data: null, error: true, message: err })

      next(err)
    })
}

const updateById = (req, res, next) => {
  userService
    .updateById(req.params.id, req.body)
    .then((user) =>
      user
        ? res.json({
            data: user,
            error: false,
            message: 'User updated successfully',
          })
        : res
            .sendStatus(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.sendStatus(400).json({ data: null, error: true, message: err })

      next(err)
    })
}

const deleteById = (req, res, next) => {
  userService
    .deleteById(req.params.id)
    .then((user) =>
      user
        ? res.json({
            data: user,
            error: false,
            message: 'User deleted successfully',
          })
        : res
            .sendStatus(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.sendStatus(400).json({ data: null, error: true, message: err })

      next(err)
    })
}

// routes
router.post('/login', login)
router.post('/register', register)
router.get('/me', getCurrent)
router.get('/:id', getById)
router.get('/', authorize(), getAll)
router.put('/:id', authorize(), updateById)
router.delete('/:id', authorize(), deleteById)

module.exports = router
