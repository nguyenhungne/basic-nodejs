const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {
  UserModel,
  TaskModel,
  ProjectUserModel,
  ProjectModel,
} = require("../models");

// const {
//   userRepository,
//   taskRepository,
//   projectRepository,
//   projectUserRepository,
// } = require("../repositories");

// tasks
function findTasks() {
  return TaskModel.find({});
}

async function createTask(task) {
  const newTask = new TaskModel({
    ...task,
    done: false,
  });
  try {
    const savedTask = await newTask.save();
    console.log("Task saved:", savedTask);
    return savedTask;
  } catch (err) {
    err.code === 11000
      ? console.error("Error saving task: Duplicate task field")
      : console.error("Error saving task:", err);
  }
}

function findTask(id) {
  return TaskModel.findById(id);
}

async function updateTask(id, task) {
  task = JSON.parse(task);
  try {
    await TaskModel.updateOne({ _id: id }, { ...task });
    return TaskModel.findById(id);
  } catch (error) {
    console.error(error);
  }
}

async function deleteTask(id) {
  try {
    await TaskModel.deleteOne({ _id: id });
    return "Task deleted";
  } catch (error) {
    console.error("Error deleting task:");
    return "Task not found";
  }
}

//project
function findProjects() {
  return ProjectModel.find({});
}

function findProject(id) {
  return ProjectModel.findById(id);
}

async function createProject(project) {
  const newProject = new ProjectModel({
    ...project,
    done: false,
  });
  try {
    const savedProject = await newProject.save();
    console.log("project saved:", savedProject);
    return savedProject;
  } catch (err) {
    console.error("Error saving project:", err);
  }
}

async function updateProject(id, newProject) {
  newProject = JSON.parse(newProject);
  try {
    await ProjectModel.updateOne({ _id: id }, { ...newProject });
    return ProjectModel.findById(id);
  } catch (error) {
    console.log("Error updating project:");
    return "project not found";
  }
}

function deleteProject(id) {
  try {
    ProjectModel.deleteOne({ _id: id });
    return "Project deleted";
  } catch (error) {
    console.error("Error deleting project:");
    return "project not found";
  }
}

// // users
async function createUser(user) {
  const hashPassword = bcrypt.hashSync(
    JSON.stringify(user.password),
    saltRounds
  );
  // create a user, with random id, hash password and data sent
  let newUser = new UserModel({
    ...user,
    password: hashPassword,
  });

  try {
    const savedUser = await newUser.save();
    console.log("Task saved:", savedUser);
    return "User saved";
  } catch (err) {
    console.error(err);
    return "Error saving user";
  }
}

function findUsers() {
  return UserModel.find({});
}

async function updateUser(id, newUser) {
  newUser = JSON.parse(newUser);
  try {
    await UserModel.updateOne({ _id: id }, { ...newUser });
    return UserModel.findById(id);
  } catch (error) {
    console.log("Error updating user:");
    return "User not found";
  }
}

async function deleteUser(id) {
  try {
    await UserModel.deleteOne({ _id: id });
    return "User deleted";
  } catch (error) {
    console.error("Error deleting User:");
    return "User not found";
  }
}

function verifyUser(userBody) {
  return UserModel.find({})
    .then((users) => {
      const user = (users || []).find(
        (user) =>
          user.username === userBody.username &&
          bcrypt.compareSync(JSON.stringify(userBody.password), user.password)
       )
       return user
    }
    
  )
  .then((user) => {
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return { user, token, refreshToken };
    } else {
      return "Username or password is incorrect."
    }
  }
  )
  .catch((err) => {
        console.log(err);
        handleError(err, "controllers/helpers.js", "verifyUser");
        return null;
      });
}

//projectUsers
function findProjectUsers() {
  return ProjectModel.find({});
}

async function createProjectUser(projectUser) {
  const newProjectUser = new ProjectModel({
    ...projectUser,
  });
  try {
    const savedProjectUser = await newProjectUser.save();
    console.log("project user saved:", savedProjectUser);
    return savedProjectUser;
  } catch (err) {
    console.error("Error saving project user:", err);
  }
}

function findProjectUser(id) {
  return ProjectModel.findById(id);
}

async function updateProjectUser(id, newProjectUser) {
  newProjectUser = JSON.parse(newProjectUser);
  try {
    await ProjectUserModel.updateOne({ _id: id }, { ...newProjectUser });
    return ProjectUserModel.findById(id);
  } catch (error) {
    console.log("Error updating project user:");
    return "project user not found";
  }
}

async function deleteProjectUser(id) {
  try {
    await ProjectModel.deleteOne({ _id: id });
    return "Project user deleted";
  } catch (error) {
    console.error("Error deleting project user:");
    return "project user not found";
  }
}

module.exports = {
  findTasks,
  createTask,
  findTask,
  updateTask,
  deleteTask,
  findProjects,
  findProject,
  createProject,
  updateProject,
  deleteProject,
  createUser,
  findUsers,
  updateUser,
  deleteUser,
  verifyUser,
  findProjectUsers,
  createProjectUser,
  findProjectUser,
  updateProjectUser,
  deleteProjectUser,
};