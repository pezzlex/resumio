const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb+srv://${process.env.username}:${process.env.password}@${process.env.cluster}.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
)

mongoose.Promise = global.Promise

module.exports = {
  User: require('../users/user.model'),
  Resume: require('../resumes/resume.model'),
}
