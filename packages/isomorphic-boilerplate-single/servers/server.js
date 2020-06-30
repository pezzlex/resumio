const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const resumeRoutes = express.Router()
const { username, password, dbName, cluster } = require("./config")
const PORT = 4000
const Resume = require("./resume.model")

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const connection = mongoose.connection

connection.once("open", function () {
  console.log("MongoDB database connection established successfully")
})

resumeRoutes.route("/").get(function (req, res) {
  Resume.find(function (err, resumes) {
    if (err) {
      console.log(err)
    } else {
      res.json(resumes)
    }
  })
})

resumeRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id
  Resume.findById(id, function (err, resume) {
    res.json(resume)
  })
})

resumeRoutes.route("/add").post(function (req, res) {
  console.log("heree")
  let resume = new Resume(req.body)
  resume
    .save()
    .then((resume) => {
      res.status(200).json({ resume: "resume added successfully" })
    })
    .catch((err) => {
      res.status(400).send("adding new resume failed")
    })
})

resumeRoutes.route("/update/:id").post(function (req, res) {
  Resume.findById(req.params.id, function (err, resume) {
    if (!resume) {
      res.status(404).send("data is not found")
    } else {
      resume.first_name = req.body.first_name
      resume.last_name = req.body.last_name
      resume.email = req.body.email
      resume.phone = req.body.phone

      resume
        .save()
        .then((resume) => {
          res.json("Resume updated")
        })
        .catch((err) => {
          res.status(400).send("Update not possible")
        })
    }
  })
})

resumeRoutes.route("/delete/:id").get(function (req, res) {
  Resume.findByIdAndDelete(req.params.id, function (err, resume) {
    if (!resume) res.status(404).send("data is not found")
    else res.json("Resume deleted")
  })
})

app.use("/resumes", resumeRoutes)

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT)
})
