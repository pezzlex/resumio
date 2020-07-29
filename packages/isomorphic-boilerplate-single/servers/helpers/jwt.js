const expressJwt = require('express-jwt')
const config = require('../config')
const userService = require('../users/user.service')

module.exports = jwt

function jwt() {
  const secret = config.secret
  return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/users/login',
      '/users/register',
      '/users/reset-password/:id',
      new RegExp('^/users/reset-password/.*'),
      '/users/get-temp-link',
    ],
  })
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub)

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true)
  }

  done()
}
