const jwt = require('express-jwt')
const { secret } = require('../config')

function authorize() {
  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret, algorithms: ['HS256'] }),
    // authorize based on user role
    (req, res, next) => {
      console.log('req.user', req.user)
      if (req.user.role !== 'Admin') {
        // user's role is not authorized
        return res.status(401).json({
          data: null,
          error: true,
          message: 'Unauthorized. Only for Admins.',
        })
      }
      // authentication and authorization successful
      next()
    },
  ]
}
module.exports = authorize
