const express = require('express')
const jwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())

// use JWT auth to secure the api
app.use(jwt())

// global error handler
app.use(errorHandler)

// start server
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port)
})

app.use('/resumes', require('./resumes/resumes.controller'))
app.use('/users', require('./users/users.controller'))
