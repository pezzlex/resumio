const jwt = require('express-jwt')

function authenticate() {
  return [jwt({ secret: process.env.secret, algorithms: ['HS256'] })]
}
module.exports = authenticate
