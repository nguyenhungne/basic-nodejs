const url = require('url')
const UserController = require('./UserController')
const TaskController = require('./TaskController')
const ProjectController = require('./ProjectController')
const ProjectUsersController = require('./projectUsersController')  

function handleNotFound(req, res) {
    const parsedUrl = url.parse(req.url, true)
    res.statusCode = 404
    res.end(`Route ${parsedUrl.pathname} not found.`)
}

function pingWithAuth(req, res) {
    res.end('Success')
}

module.exports = {
    handleNotFound,
    pingWithAuth,
    UserController,
    TaskController,
    ProjectController,
    ProjectUsersController
}