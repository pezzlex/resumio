const jwt = require('express-jwt')
const { secret } = require('../config')

function authenticate() {
  return [jwt({ secret, algorithms: ['HS256'] })]
}
module.exports = authenticate
