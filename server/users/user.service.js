const jwt = require('jsonwebtoken')
const jwtSimple = require('jwt-simple')
const bcrypt = require('bcryptjs')
const { User } = require('../helpers/db')
const nodemailer = require('nodemailer')

const Joi = require('joi')

const schema = Joi.object()
  .keys({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().min(6),
  })
  .unknown(true)

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.secret,
      {
        expiresIn: '7d',
      }
    )
    return {
      ...user.toJSON(),
      token,
    }
  }
}

const getAll = async ({ limit, skip, q }) => {
  const perPage = limit ? parseInt(limit) : 10
  const page = skip ? parseInt(skip) : 0
  const qRegex = new RegExp(q)
  return await User.find()
    .or([{ firstName: qRegex }, { lastName: qRegex }, { email: qRegex }])
    .limit(perPage)
    .skip(perPage * page)
}

const getById = async (id) => {
  return await User.findById(id)
}

const create = async (userParam) => {
  const { value, error } = schema.validate(userParam)
  console.log(value)
  // validate fields
  if (error) {
    throw error
  }
  Object.assign(userParam, value)
  // unique email
  if (await User.findOne({ email: userParam.email })) {
    throw new Error(`Email "${userParam.email}" is already registered`)
  }
  const user = new User(userParam)
  const hash = bcrypt.hashSync(userParam.password, 10)
  // copy userParam properties to user
  Object.assign(user, { ...userParam, hash })
  return await user.save()
}

const updateById = async (id, userParam) => {
  const user = await User.findById(id)
  // validate
  const { value, error } = schema.validate(userParam)
  if (error) {
    throw error
  }
  Object.assign(userParam, value)
  if (!user) throw new Error('User not found')
  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw new Error(`Email "${userParam.email}" is already taken`)
  }
  if (userParam.password) {
    const hash = bcrypt.hashSync(userParam.password, 10)
    // copy userParam properties to user
    Object.assign(user, { ...userParam, hash })
  }
  return await user.save()
}

const deleteById = async (id) => {
  return await User.findByIdAndRemove(id)
}

const getTempLink = async (email) => {
  console.log('email', email)
  const emailSchema = Joi.string().trim().email()
  const { value, error } = emailSchema.validate(email)
  console.log('value', value)
  if (error) throw error
  const user = await User.findOne({ email: value })
  if (!user) {
    throw new Error('Email not registered')
  }
  const tempSecret = `${user.hash}-${new Date(user.createdAt)}`
  const token = jwtSimple.encode({ sub: user._id }, tempSecret)
  // API link: /users/reset-password/${user._id}/${token}
  return `${process.env.REACT_APP_baseUrl}/users/reset-password/${user._id}/${token}`
}

const sendResetEmail = async (link, email) => {
  console.log(process.env.environment)
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.emailUsername,
      pass: process.env.emailPassword,
    },
  })
  const message = {
    from: 'Resumio Support', // Sender address
    to: email, // List of recipients
    subject: `${
      process.env.environment !== 'production' ? '[TESTING] ' : ''
    }Resumio password reset link`, // Subject line
    html: `<p>${
      process.env.environment !== 'production' ? '[TESTING] ' : ''
    }Click on this <a href="${link}">link</a> to securely reset your password.</p>`,
  }

  transport.sendMail(message, (err, info) => {
    if (err) {
      throw new Error(err)
    } else {
      console.log(info)
    }
  })
}

const resetPassword = async ({ userId, password, token }) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  const tempSecret = `${user.hash}-${new Date(user.createdAt)}`
  const { sub } = jwtSimple.decode(token, tempSecret)
  if (sub === userId) {
    const passwordSchema = Joi.string().min(6)
    const { error } = passwordSchema.validate(password)
    if (error) {
      throw error
    }
    if (bcrypt.compareSync(password, user.hash)) {
      throw new Error(
        'You must choose a different password from your last one.'
      )
    }
    const newHash = bcrypt.hashSync(password, 10)
    Object.assign(user, { hash: newHash })
    return await user.save()
  }
  // Technically unreachable
  throw new Error('Unexpected error')
}

module.exports = {
  login,
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getTempLink,
  sendResetEmail,
  resetPassword,
}
