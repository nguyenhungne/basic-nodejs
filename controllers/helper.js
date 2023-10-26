const bcrypt = require("bcrypt");
require('dotenv').config();
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authentication");
const {
  userRepository,
  taskRepository,
  projectRepository,
  projectUserRepository,
} = require("../repositories");

// tasks

function findTasks() {
  return taskRepository.findAll();
}

function createTask(task) {
  const newTask = {
    id: Math.floor(Date.now() + Math.random() * 10),
    ...task,
    done: false,
  };

  return taskRepository.createOne(newTask);
}

function findTask(id) {
  return taskRepository.findById(id);
}

function updateTask(id,task) {
  return taskRepository.updateOne(id,task);
}

function deleteTask(id) {
  return taskRepository.deleteOne(id);
}

//project
function findProjects() {
  return projectRepository.findAll();
}

function findProject(id) {
  return projectRepository.findById(id);
}

function createProject(project) {
  const newProject = {
    ...project,
    done: false,
  };
  return projectRepository.createOne(newProject);
}

function updateProject(id,newProject) {
  return projectRepository.updateOne(id,newProject);
}

function deleteProject(id) {
    return projectRepository.deleteOne(id);
}


// users
function createUser(user) {
  const hashPassword = bcrypt.hashSync(
    JSON.stringify(user.password),
    saltRounds
  );
  // create a user, with random id, hash password and data sent
  let newUser = {
    id: Math.floor(Date.now() + Math.random() * 10),
    ...user,
    password: hashPassword,
  };

  return userRepository.createOne(newUser);
}


function findUsers() {
  return userRepository.findAll();
}

function updateUser(id,newUser) {
  return userRepository.updateOne(id,newUser);
}

function deleteUser(id) {
  return userRepository.deleteOne(id);
}

function verifyUser(userBody) {
    return userRepository.findAll()
        .then(users => (users || []).find(user =>
            user.username === userBody.username &&
            bcrypt.compareSync(JSON.stringify(userBody.password), user.password)
        ))
        .then(user => {
            if (user) {

              const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
              const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

              

              return { user, token, refreshToken };
            } else {
                throw new Error('Username or password is incorrect.')
            }
        })
        .catch(err => {
          console.log(err)
            handleError(err, 'controllers/helpers.js', 'verifyUser')
            return null
        })


}

//projectUsers
function findProjectUsers() {
  return projectUserRepository.findAll();
}

function createProjectUser(projectUser) {
  const newProjectUser = {
    id: Math.floor(Date.now() + Math.random() * 10),
    ...projectUser,
  };

  return projectUserRepository.createOne(newProjectUser);
}

function findProjectUser(id) {
  return projectUserRepository.findById(id);
}

function updateProjectUser(id,projectUser) {
  return projectUserRepository.updateOne(id,projectUser);
}

function deleteProjectUser(id) {
  return projectUserRepository.deleteOne(id);
}


module.exports = { findTasks, createTask, findTask, updateTask, deleteTask, findProjects, findProject, createProject, updateProject, deleteProject, createUser,  findUsers, updateUser, deleteUser, verifyUser, findProjectUsers, createProjectUser, findProjectUser, updateProjectUser, deleteProjectUser }