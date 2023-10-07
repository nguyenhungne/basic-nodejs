const users = require("../data/users");

class UserController {
    // getting all users
    async getUsers() {
        return new Promise((resolve, _) => resolve(users));
    }

    // getting a single task
    async getUser(id) {
        return new Promise((resolve, reject) => {
            let user = users.find((user) => user.id === parseInt(id));
            if (user) {
                // return the user
                resolve(user);
            } else {
                // return an error
                reject(`user with id ${id} not found `);
            }
        });
    }

    // creating a User
    async createUser(user) {
        return new Promise((resolve, _) => {
            // create a user, with random id and data sent
            let newUser = {
                id: Math.floor(Date.now() + Math.random() * 10),
                ...user,
            };

            tasks.push(newUser);

            // return the new created user
            resolve(newUser);
        });
    }

    // updating a user
    async updateUser(id,new_user) {
        return new Promise((resolve, reject) => {
            // get the user.
            let user = users.find((user) => user.id === parseInt(id));
            // if no user, return an error
            if (!user) {
                reject(`No user with id ${id} found`);
            }
            //else, update it by setting completed to true
            users.replace(user, new_user );
            // return the updated user
            resolve(user);
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
            
            users = users.filter((user) => user.id != parseInt(id));

            resolve(`user deleted successfully`);
        });
    }
}
module.exports = UserController;