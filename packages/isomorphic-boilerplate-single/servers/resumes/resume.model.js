const mongoose = require('mongoose')
const { Schema } = mongoose

const resumeSchema = new Schema({
  fileName: { type: String, required: true },
  contact: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    links: [String],
    _id: false,
  },
  education: {
    headerName: { type: String, default: 'Education' },
    content: [
      {
        collegeName: String,
        gpa: Number,
        degree: String,
        startDate: Date,
        endDate: Date,
        summary: String,
        _id: false,
      },
    ],
  },
  workExperience: {
    headerName: { type: String, default: 'Work Experience' },
    content: [
      {
        jobTitle: String,
        companyName: String,
        city: String,
        startDate: Date,
        endDate: Date,
        summary: String,
        description: [String],
        _id: false,
      },
    ],
  },
  projects: {
    headerName: { type: String, default: 'Projects' },
    content: [
      {
        title: String,
        link: String,
        startDate: Date,
        endDate: Date,
        summary: String,
        description: [String],
        _id: false,
      },
    ],
  },
  skills: {
    headerName: { type: String, default: 'Skills' },
    content: [
      {
        subHeader: { type: String, required: true },
        details: { type: String, required: true },
        _id: false,
      },
    ],
  },
  template: { type: String, default: 'BASIC_TEMPLATE', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', immutable: true },
  createdAt: { type: Date, default: Date.now, immutable: true, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
})

module.exports = mongoose.model('Resume', resumeSchema)