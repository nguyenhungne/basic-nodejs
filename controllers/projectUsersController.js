const database = require("../database");

const fs = require('fs');

let rawProjectUsers = fs.readFileSync(database.projectUsersPath);
let projectUsers = JSON.parse(rawProjectUsers);

function saveData(data,path) {
    data = JSON.stringify(data);
    fs.writeFile(path, data, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });
}

const { findProjectUsers, createProjectUser, findProjectUser, updateProjectUser, deleteProjectUser  } = require("./helper")

class projectUsersController {
    // getting all projectUSers
    async getProjectUsers() {
        return findProjectUsers();
    }

    // getting a single task
    async getProjectUser(id) {
        return findProjectUser(id);
    }

    // creating a projectUser
    async createProjectUser(projectUser) {
        return createProjectUser(projectUser);
    }

    // updating a projectUser
    async updateProjectUser(id,newProjectUser) {
        return updateProjectUser(id,newProjectUser)
    }

    // deleting a projectUser
    async deleteProjectUser(id) {
        return deleteProjectUser(id)
    }
}
module.exports = projectUsersController;