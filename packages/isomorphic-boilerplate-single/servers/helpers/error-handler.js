const errorHandler = (err, req, res, next) => {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ data: null, error: true, message: err })
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res
      .status(400)
      .json({ data: null, error: true, message: err.message })
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res
      .status(401)
      .json({ data: null, error: true, message: 'Invalid Token' })
  }

  // default to 500 server error
  return res.status(500).json({ data: null, error: true, message: err.message })
}
module.exports = errorHandler
