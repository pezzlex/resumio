const mongoose = require('mongoose')
const { Schema } = mongoose
const { userSchema } = require('../users/user.model')

const resumeSchema = new Schema({
  // fileName: String,
  // contact: {
  //   firstName: String,
  //   lastName: String,
  //   email: String,
  //   phone: String,
  //   links: [String],
  // },
  // education: {
  //   headerName: { type: String, default: 'Education' },
  //   content: [
  //     {
  //       collegeName: String,
  //       startDate: Date,
  //       endDate: Date,
  //       summary: String,
  //     },
  //   ],
  // },
  // workExperience: {
  //   headerName: { type: String, default: 'Work Experience' },
  //   content: [
  //     {
  //       companyName: String,
  //       startDate: Date,
  //       endDate: Date,
  //       summary: String,
  //       description: [String],
  //     },
  //   ],
  // },
  // projects: {
  //   headerName: { type: String, default: 'Projects' },
  //   content: [
  //     {
  //       title: String,
  //       link: String,
  //       startDate: Date,
  //       endDate: Date,
  //       summary: String,
  //       description: [String],
  //     },
  //   ],
  // },
  // skills: [
  //   {
  //     headerName: { type: String, default: 'Skills' },
  //     content: { heading: String, details: String },
  //   },
  // ],
  // createdBy: userSchema,
  createdDate: { type: Date, default: Date.now },
})

module.exports = {
  Resume: mongoose.model('Resume', resumeSchema),
  resumeSchema,
}
