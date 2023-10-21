const Repository = require('./base.repository')
const { projectUserModel } = require('../models')

const projectUserRepository = new Repository('projectUsers', projectUserModel)

module.exports = projectUserRepository