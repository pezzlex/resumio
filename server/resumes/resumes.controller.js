const express = require('express')
const router = express.Router()
const resumeService = require('./resume.service')
const userService = require('../users/user.service')
const authenticate = require('../helpers/authenticate')
const texContent = require('../templates/basicTemplate')

const getAll = (req, res, next) => {
  console.log('req.query', req.query)
  const userId = req.user.sub
  console.log(req.user.sub)
  resumeService
    .getAll(req.query, userId)
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
        message: `Resume "${resume.fileName}" created successfully`,
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
            message: `Saved changes for "${req.body.fileName}"`,
          })
        : res
            .status(404)
            .json({ data: null, error: false, message: 'Resume not found' })
    )
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
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
            message: `Resume "${resume.fileName}" deleted successfully`,
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

const renderResume = (req, res, next) => {
  const { template, resumeDetails } = req.body
  const { id, userId } = req.params
  resumeService
    .renderResume(id, template, userId, resumeDetails)
    .then((resume) =>
      resume
        ? res.json({
            data: resume,
            error: false,
            message: `Resume "${resume.fileName}" rendered successfully`,
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

const getDisplayLink = (req, res, next) => {
  resumeService.getDisplayLink(req.params.id, req.user.sub).then((link) => {
    res.json({
      data: link,
      error: false,
      message: `Display link ${link} genenerated successfully`,
    })
  })
}

/*
 * Must be a GET request with no headers/ auth
 */
const displayLatexResume = (req, res, next) => {
  const { id, token } = req.params
  resumeService
    .getById(id)
    .then((resume) => {
      const user = userService.getById(resume.createdBy)
      const { hash, createdAt } = user
      console.log(createdAt.toISOString())
      const tempSecret = `${hash}-${new Date(createdAt).toTimeString()}`
      const { resumeId } = jwtSimple.decode(token, tempSecret)
      if (resumeId === id) {
        res.type('text/html')
        res.send(resume.texFileContent)
      } else {
        // Technically unreachable
        throw new Error('Unexpected error')
      }
    })
    .catch((err) => {
      res.status(400).json({ data: null, error: true, message: err.message })
      next(err)
    })
}

// routes
router.get('/', authenticate(), getAll)
router.get('/:id', authenticate(), getById)
router.post('/add', authenticate(), create)
router.put('/:id', authenticate(), update)
router.delete('/:id', authenticate(), _delete)
router.put('/render-resume/:id/:userId', authenticate(), renderResume)
router.get('/get-display-link/:id', authenticate(), getDisplayLink)
// No auth
router.get('/display-latex-resume/:id/:token', displayLatexResume)
module.exports = router
