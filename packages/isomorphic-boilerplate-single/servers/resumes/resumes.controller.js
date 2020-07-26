const express = require('express')
const router = express.Router()
const resumeService = require('./resume.service')

const getAll = (req, res, next) => {
  const userId = req.user.sub
  console.log(req.user.sub)
  resumeService
    .getAll({ ...req.query, userId })
    .then((resumes) =>
      res.json({ data: resumes, error: false, message: 'Resumes found' })
    )
    .catch((err) => next(err))
}

const getById = (req, res, next) => {
  resumeService
    .getById(req.params.id)
    .then((resume) =>
      res.json({
        data: resume,
        error: false,
        message: 'Resume created successfully',
      })
    )
    .catch((err) => next(err))
}

const create = (req, res, next) => {
  resumeService
    .create({ ...req.body, createdBy: req.user.sub })
    .then((resume) => res.json(resume))
    .catch((err) => next(err))
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
            .sendStatus(404)
            .json({ data: null, error: false, message: 'Resume not found' })
    )
    .catch((err) => next(err))
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
            .sendStatus(404)
            .json({ data: null, error: true, message: 'Resume not found' })
    )
    .catch((err) => next(err))
}

// routes
router.get('/', getAll)
router.get('/:id', getById)
router.post('/add', create)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router
