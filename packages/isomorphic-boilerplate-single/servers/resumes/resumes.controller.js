const express = require('express')
const router = express.Router()
const resumeService = require('./resume.service')

const getAll = (req, res, next) => {
  const userId = req.user.sub
  console.log(req.user.sub)
  resumeService
    .getAll({ ...req.query, userId })
    .then((resumes) => {
      res.json({ data: resumes, error: false, message: 'Resumes found' })
    })
    .catch((err) => {
      res.json({ data: null, error: true, message: err.message })
      next(err)
    })
}

const getById = (req, res, next) => {
  resumeService
    .getById(req.params.id)

    .then((resume) =>
      resume
        ? res.json({ data: resume, error: false, message: 'Resume found' })
        : res
            .status(404)
            .json({ data: null, error: true, message: 'Resume not found' })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
      next(err)
    })
}

const create = (req, res, next) => {
  resumeService
    .create({ ...req.body, createdBy: req.user.sub })
    .then((resume) =>
      res.json({
        data: resume,
        error: false,
        message: 'Resume created successfully',
      })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })

      next(err)
    })
}

const update = (req, res, next) => {
  console.log(req.body)
  resumeService
    .update(req.params.id, req.user.sub, req.body)
    .then((resume) =>
      resume
        ? res.json({
            data: resume,
            error: false,
            message: 'Resume updated successfully',
          })
        : res
            .status(404)
            .json({ data: null, error: false, message: 'Resume not found' })
    )
    .catch((err) => {
      res.json({ data: null, error: true, message: err.message })
      next(err)
    })
}

const _delete = (req, res, next) => {
  resumeService
    .delete(req.params.id, req.user.sub)
    .then((resume) =>
      resume
        ? res.json({
            data: resume,
            error: false,
            message: 'Resume deleted successfully',
          })
        : res
            .status(404)
            .json({ data: null, error: true, message: 'Resume not found' })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
      next(err)
    })
}

// routes
router.get('/', getAll)
router.get('/:id', getById)
router.post('/add', create)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router
