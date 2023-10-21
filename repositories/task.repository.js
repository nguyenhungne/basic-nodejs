const Repository = require('./base.repository')
const { taskModel } = require('../models')

const taskRepository = new Repository('tasks', taskModel)

module.exports = taskRepository