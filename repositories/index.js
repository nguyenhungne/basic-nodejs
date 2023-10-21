const userRepository = require('./user.repository')
const taskRepository = require('./task.repository')
const projectRepository = require('./project.repository')
const projectUserRepository = require('./projectUser.repository')

module.exports = {
    userRepository,
    taskRepository,
    projectRepository,
    projectUserRepository
}