const express = require('express')
const router = express.Router()
const resumeService = require('./resume.service')

const getAll = (req, res, next) => {
  let userId = req.body.userId
  resumeService
    .getAll({ userId })
    .then((resumes) => res.json(resumes))
    .catch((err) => next(err))
}

const getById = (req, res, next) => {
  let id = req.params.id
  resumeService
    .getById(id)
    .then((resume) => (resume ? res.json(resume) : res.sendStatus(404)))
    .catch((err) => next(err))
}

const create = (req, res, next) => {
  const resumeParam = req.body
  resumeService
    .create(resumeParam)
    .then((resume) => res.json(resume))
    .catch((err) => next(err))
}

const update = (req, res, next) => {
  const id = req.params.id
  const resumeParam = req.body
  console.log(req.body)
  resumeService
    .update(id, resumeParam)
    .then((resume) => (resume ? res.json(resume) : res.sendStatus(404)))
    .catch((err) => next(err))
}

const _delete = (req, res, next) => {
  resumeService
    .delete(req.params.id)
    .then((resume) => (resume ? res.json(resume) : res.sendStatus(404)))
    .catch((err) => next(err))
}

// routes
router.post('/', getAll)
router.get('/:id', getById)
router.post('/add', create)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router
