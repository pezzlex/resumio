const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Resume = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  createdDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Resume', Resume)
