const express = require('express')
const jwt = require('./server/helpers/jwt')
const errorHandler = require('./server/helpers/error-handler')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4000
const path = require('path')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

// global error handler
app.use(errorHandler)

app.use('/resumes', require('./server/resumes/resumes.controller'))
app.use('/users', require('./server/users/users.controller'))

// start server
const port = process.env.PORT || PORT
app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

if (
  process.env.environment === 'production' ||
  process.env.environment === 'testing' ||
  true
) {
  app.use(express.static(path.join(__dirname, './build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'), (err) => {
      if (err) {
        res.status(500).json({ data: null, error: true, message: err.message })
      }
    })
  })
}
