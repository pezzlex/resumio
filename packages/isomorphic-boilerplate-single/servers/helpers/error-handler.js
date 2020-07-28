const errorHandler = (err, req, res, next) => {
  if (typeof err === 'string') {
    // custom application error
    return res.sendStatus(400).json({ data: null, error: true, message: err })
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res
      .sendStatus(400)
      .json({ data: null, error: true, message: err.message })
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res
      .sendStatus(401)
      .json({ data: null, error: true, message: 'Invalid Token' })
  }

  // default to 500 server error
  return res
    .sendStatus(500)
    .json({ data: null, error: true, message: err.message })
}
module.exports = errorHandler
