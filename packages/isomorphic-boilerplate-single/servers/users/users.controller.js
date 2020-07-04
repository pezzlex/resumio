const express = require('express')
const router = express.Router()
const userService = require('./user.service')

const authenticate = (req, res, next) => {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch((err) => next(err))
}

const register = (req, res, next) => {
  userService
    .create(req.body)
    .then(() => res.json({ user: 'user added successfully' }))
    .catch((err) => next(err))
}

const getAll = (req, res, next) => {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err))
}

const getCurrent = (req, res, next) => {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err))
}

const getById = (req, res, next) => {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err))
}

const update = (req, res, next) => {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

const _delete = (req, res, next) => {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

// routes
router.post('/authenticate', authenticate)
router.post('/register', register)
router.get('/', getAll)
router.get('/current', getCurrent)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router
