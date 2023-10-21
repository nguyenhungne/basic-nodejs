const Repository = require('./base.repository')
const { userModel } = require('../models')

const userRepository = new Repository('users', userModel)

module.exports = userRepository