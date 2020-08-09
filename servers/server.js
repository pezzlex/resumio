const express = require('express')
const jwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4000
const path = require('path')

app.use(express.static(path.join(__dirname, './build')))

app.use(cors())
app.use(bodyParser.json())

// use JWT auth to secure the api
app.use(jwt())

// global error handler
app.use(errorHandler)

app.use('/resumes', require('./resumes/resumes.controller'))
app.use('/users', require('./users/users.controller'))

// start server
const port = process.env.PORT || PORT
app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist', 'index.html'), (err) => {
      if (err) {
        res.status(500).json({ data: null, error: true, message: err.message })
      }
    })
  })
}
