const express = require('express')
const router = express.Router()
const userService = require('./user.service')
const authorize = require('../helpers/authorize')
const authenticate = require('../helpers/authenticate')
const jwtSimple = require('jwt-simple')

const login = (req, res, next) => {
  userService
    .login(req.body)
    .then((user) =>
      user
        ? res.json({
            data: user,
            error: false,
            message: `Welcome to Resumio, ${user.firstName}`,
          })
        : res.status(400).json({
            data: null,
            error: true,
            message: 'Email or password is incorrect',
          })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
      next(err)
    })
}

const register = (req, res, next) => {
  userService
    .create(req.body)
    .then((user) =>
      res.json({
        data: user,
        error: false,
        message: 'Registration to Resumio successful',
      })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
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
      res.status(400).json({ data: null, error: true, message: err.message })

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
            .status(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })

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
            .status(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })

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
            .status(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })

      next(err)
    })
}

const updateCurrent = (req, res, next) => {
  userService
    .updateById(req.user.sub, req.body)
    .then((user) =>
      user
        ? res.json({
            data: user,
            error: false,
            message: 'User updated successfully',
          })
        : res
            .status(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })

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
            .status(404)
            .json({ data: null, error: true, message: 'User not found' })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
      next(err)
    })
}

const getTempLink = (req, res, next) => {
  userService
    .getTempLink(req.body.email)
    .then((link) => {
      console.log('Emailing link ' + link)
      // Send via email
      userService
        .sendResetEmail(link, req.body.email)
        .then(() => {
          res.json({
            data: null,
            error: false,
            message: `Reset password link has been sent. Please check ${req.body.email} to find the link.`,
          })
        })
        .catch((err) => {
          res
            .status(400)
            .json({ data: null, error: true, message: err.message })
          next(err)
        })
    })
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
      next(err)
    })
}

const resetPasswordGet = (req, res, next) => {
  const { id, token } = req.params
  userService
    .getById(id)
    .then((user) => {
      console.log(user)
      const { hash, createdAt } = user
      console.log(createdAt.toISOString())
      const tempSecret = `${hash}-${new Date(createdAt).toTimeString()}`
      const { sub } = jwtSimple.decode(token, tempSecret)
      if (sub === id) {
        res.json({
          data: null,
          error: false,
          message: 'Reset password token verified',
        })
      } else {
        // Technically unreachable
        throw new Error('Unexpected error')
      }
    })
    .catch((err) => {
      res.status(400).json({
        data: null,
        error: true,
        message: err.message,
      })
      next(err)
    })
}

const resetPasswordPost = (req, res, next) => {
  console.log(req.body)
  userService
    .resetPassword(req.body)
    .then((user) => {
      user
        ? res.json({
            data: null,
            error: false,
            message: 'Password reset successfully',
          })
        : res
            .status(404)
            .json({ data: null, error: true, message: 'User not found' })
    })
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
      next(err)
    })
}

// No auth required
router.post('/login', login)
router.post('/register', register)
router.post('/reset-password', resetPasswordPost)
router.get('/reset-password/:id/:token', resetPasswordGet)
router.post('/get-temp-link', getTempLink)
// Login required
router.get('/me', authenticate(), getCurrent)
router.put('/me', authenticate(), updateCurrent)
router.get('/:id', authenticate(), getById)
// Admin routes
router.get('/', authorize(), getAll)
router.put('/:id', authorize(), updateById)
router.delete('/:id', authorize(), deleteById)

module.exports = router
