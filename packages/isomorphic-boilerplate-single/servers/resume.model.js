const mongoose = require("mongoose")
const Schema = mongoose.Schema

let Resume = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
})

module.exports = mongoose.model("Resume", Resume)
