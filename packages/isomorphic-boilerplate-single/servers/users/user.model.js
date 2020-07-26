const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['User', 'Admin'],
    default: 'User',
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: {
    type: Date,
    default: Date.now,
    immutable: true,
    required: true,
  },
})

userSchema.set('toJSON', {
  // virtuals: true,
  // versionKey: false,
  transform: (doc, ret) => {
    // delete ret._id
    delete ret.hash
  },
})

module.exports = mongoose.model('User', userSchema)
