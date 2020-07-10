const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
})

User.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id
    delete ret.hash
  },
})

module.exports = { User: mongoose.model('User', User), userSchema: User }
