const Repository = require('./base.repository')
const { projectModel } = require('../models')

const projectRepository = new Repository('projects', projectModel)

module.exports = projectRepository