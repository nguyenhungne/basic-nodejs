const usersPath = require("../data/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const fs = require("fs");

let rawUsers = fs.readFileSync(usersPath);
let users = JSON.parse(rawUsers);

function saveData(data, path) {
  data = JSON.stringify(data);
  fs.writeFile(path, data, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
}

class UserController {
  // getting all users
  async getUsers() {
    return new Promise((resolve, _) => resolve(users));
  }

  // getting a single user
  async getUser(userBody) {
    return new Promise((resolve, reject) => {
      const password = userBody.password;
      const currentUser = users.find((user) => user.username == userBody.username);
      if (currentUser) {
        const isPasswordValid = bcrypt.compareSync(JSON.stringify(password), currentUser.password);
        if (!isPasswordValid) {
            reject(`Invalid password`) 
        }
        else {
            resolve(currentUser)
        }
      } else {
        // return an error
        reject(`${userBody.username} not found `);
      }

    });
  }

  // creating a User
  async createUser(user) {
    return new Promise((resolve, reject) => {
      const username = user.username;
      const email = user.email;
      let currentUser = users.find((user) => user.username === username);
      if (!currentUser || !email) {
        const hashPassword = bcrypt.hashSync(
          JSON.stringify(user.password),
          saltRounds
        );
        // create a user, with random id, hash password and data sent
        let newUser = {
          id: Math.floor(Date.now() + Math.random() * 10),
          ...user,
          username: username,
          password: hashPassword,
        };

        users.push(newUser);
        //save data to database
        saveData(users, usersPath);
        // return the new created user
        resolve(newUser);
      } else {
        reject(`${user.username} or ${user.email} is already exists`);
      }
    });
  }

  // updating a user
  async updateUser(id, newUser) {
    return new Promise((resolve, reject) => {
      newUser = JSON.parse(newUser);
      // get the user.
      let user = users.find((user) => user.id === parseInt(id));
      // if no user, return an error
      if (!user) {
        reject(`No user with id ${id} found`);
      }
      //else, update it by setting completed to true
      const userIndex = users.findIndex((user) => user.id == parseInt(id));
      users.splice(userIndex, 1, newUser);
      //save data to database
      saveData(users, usersPath);
      // return the updated user
      resolve(newUser);
    });
  }

  // deleting a user
  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      // get the user
      let user = users.find((user) => user.id === parseInt(id));
      // if no user, return an error
      if (!user) {
        reject(`No user with id ${id} found`);
      }
      // else, return a success message

      const userIndex = users.findIndex((user) => user.id === parseInt(id));
      users.splice(userIndex, 1);
      //save data to database
      saveData(users, usersPath);
      resolve(`user deleted successfully`);
    });
  }
}
module.exports = UserController;
