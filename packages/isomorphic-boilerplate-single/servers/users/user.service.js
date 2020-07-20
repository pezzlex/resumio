const config = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../helpers/db')

const authenticate = async ({ username, password }) => {
  const user = await User.findOne({ username })
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: '7d',
    })
    return {
      ...user.toJSON(),
      token,
    }
  }
}

const getAll = async () => {
  return await User.find()
}

const getById = async (id) => {
  return await User.findById(id)
}

const create = async (userParam) => {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken'
  }
  const user = new User(userParam)
  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10)
  }
  // save user
  return await user.save()
}

const update = async (id, userParam) => {
  const user = await User.findById(id)
  // validate
  if (!user) throw 'User not found'
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken'
  }
  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10)
  }
  // copy userParam properties to user
  // Object.assign(user, userParam)
  user = { ...user, userParam }
  return await user.save()
}

const _delete = async (id) => {
  return await User.findByIdAndRemove(id)
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
