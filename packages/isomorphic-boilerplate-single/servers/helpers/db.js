const mongoose = require('mongoose')
const { username, password, cluster, dbName } = require('../config')

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
)

mongoose.Promise = global.Promise
