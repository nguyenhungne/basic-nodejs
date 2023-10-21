const { createUser, findUsers, updateUser, deleteUser, verifyUser } = require("./helper")

class UserController {
  // getting all users
  async getUsers() {
    return findUsers();
  }


  // getting a single user
  async getUser(userBody) {
    return verifyUser(userBody);
  }

  // creating a User
  async createUser(user) {
    return createUser(user);
  }

  // updating a user
  async updateUser(id, newUser) {
    return updateUser(id, newUser);
  }

  // deleting a user
  async deleteUser(id) {
    return deleteUser(id)
  }
}
module.exports = UserController;
