const expressJwt = require('express-jwt')
const userService = require('../users/user.service')

module.exports = jwt

function jwt() {
  return expressJwt({
    secret: process.env.secret,
    algorithms: ['HS256'],
    isRevoked,
  }).unless({
    path: [
      // public routes that don't require authentication
      // API routes
      '/users/login',
      '/users/register',
      '/users/reset-password',
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
