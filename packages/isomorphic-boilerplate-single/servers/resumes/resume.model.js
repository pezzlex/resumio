const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

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
  createdBy: {
    type: ObjectId,
  },
  createdDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Resume', Resume)
