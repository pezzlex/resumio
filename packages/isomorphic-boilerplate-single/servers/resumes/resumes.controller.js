const express = require('express')
const router = express.Router()
const { Resume } = require('../helpers/db')

router.route('/').get(function (req, res) {
  Resume.find(function (err, resumes) {
    if (err) {
      console.log(err)
    } else {
      res.json(resumes)
    }
  })
})

router.route('/:id').get(function (req, res) {
  let id = req.params.id
  Resume.findById(id, function (err, resume) {
    res.json(resume)
  })
})

router.route('/add').post(function (req, res) {
  console.log('heree')
  let resume = new Resume(req.body)
  resume
    .save()
    .then((resume) => {
      res.status(200).json({ resume: 'resume added successfully' })
    })
    .catch((err) => {
      res.status(400).send('adding new resume failed')
    })
})

router.route('/update/:id').post(function (req, res) {
  Resume.findById(req.params.id, function (err, resume) {
    if (!resume) {
      res.status(404).send('data is not found')
    } else {
      resume.first_name = req.body.first_name
      resume.last_name = req.body.last_name
      resume.email = req.body.email
      resume.phone = req.body.phone

      resume
        .save()
        .then((resume) => {
          res.json('Resume updated')
        })
        .catch((err) => {
          res.status(400).send('Update not possible')
        })
    }
  })
})

router.route('/delete/:id').get(function (req, res) {
  Resume.findByIdAndDelete(req.params.id, function (err, resume) {
    if (!resume) res.status(404).send('data is not found')
    else res.json('Resume deleted')
  })
})

module.exports = router
