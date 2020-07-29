const config = require('../config')
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
    username: Joi.string().trim().min(5),
    email: Joi.string().trim().email(),
    password: Joi.string().min(6),
  })
  .unknown(true)

const login = async ({ username, password }) => {
  const user = await User.findOne({ username })
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user._id, role: user.role }, config.secret, {
      expiresIn: '7d',
    })
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
    .or([
      { firstName: qRegex },
      { lastName: qRegex },
      { email: qRegex },
      { username: qRegex },
    ])
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
  // unique username
  if (await User.findOne({ username: userParam.username })) {
    throw new Error(`Username "${userParam.username}" is already taken`)
  }
  const user = new User(userParam)
  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10)
  }
  // save user
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
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw new Error(`Username "${userParam.username}" is already taken`)
  }
  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10)
  }
  // copy userParam properties to user
  Object.assign(user, userParam)
  return await user.save()
}

const deleteById = async (id) => {
  return await User.findByIdAndRemove(id)
}

const getTempLink = async ({ email }) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Email not registered')
  const tempSecret = `${user.hash}-${new Date(user.createdAt).toTimeString()}`
  const token = jwtSimple.encode({ sub: user._id }, tempSecret)
  // API link: /users/reset-password/${user._id}/${token}
  return `/reset-password/${user._id}/${token}`
}

const sendResetEmail = async (link, emailId) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '52a69a277a4b8d',
      pass: '56c905fd822cde',
    },
  })
  const message = {
    from: 'resumio@email.com', // Sender address
    to: emailId, // List of recipients
    subject: 'Resumio password reset link', // Subject line
    html: `<p>Click on this <a href="${link}">link</a> to securely reset your password.</p>`,
  }
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
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
}
