const express = require('express')
const router = express.Router()
const { Resume } = require('../helpers/db')

router.route('/').post(function (req, res) {
  Resume.find(
    {
      createdBy: req.body.id,
    },
    function (err, resumes) {
      if (err) {
        console.log(err)
      } else {
        res.json(resumes)
      }
    }
  )
})

router.route('/:id').get(function (req, res) {
  let id = req.params.id
  Resume.findById(id, function (err, resume) {
    res.json(resume)
  })
})

router.route('/add').post(function (req, res) {
  console.log(req.body)
  let resume = new Resume(req.body)
  resume
    .save()
    .then((resume) => {
      res.status(200).json({ resume: 'resume added successfully' })
    })
    .catch((err) => {
      res.status(400).send(err, 'adding new resume failed')
    })
})

router.route('/update/:id').post(function (req, res) {
  Resume.findByIdAndUpdate(req.params.id, req.body, function (err, resume) {
    if (!resume) {
      res.status(404).send('data is not found')
    } else {
      res.json('Resume updated')
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
