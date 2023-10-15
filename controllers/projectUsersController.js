const projectUsersPath = require("../data//projectUsers");

const fs = require('fs');

let rawProjectUsers = fs.readFileSync(projectUsersPath);
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

class projectUsersController {
    // getting all projectUSers
    async getProjectUsers() {
        return new Promise((resolve, _) => resolve(projectUsers));
    }

    // getting a single task
    async getProjectUser(id) {
        return new Promise((resolve, reject) => {
            let projectUser = projectUsers.find((projectUser) => projectUser.id === parseInt(id));
            if (projectUser) {
                // return the projectUser
                resolve(projectUser);
            } else {
                // return an error
                reject(`projectUser with id ${id} not found `);
            }
        });
    }

    // creating a projectUser
    async createProjectUser(projectUser) {
        return new Promise((resolve, _) => {
            // create a projectUser, with random id and data sent
            let newProjectUser = {
                ...projectUser,
            };

            projectUsers.push(newProjectUser);
            //save data to database
            saveData(projectUsers,projectUsersPath);

            // return the new created projectUser
            resolve(newProjectUser);
        });
    }

    // updating a projectUser
    async updateProjectUser(id,newProjectUser) {
        return new Promise((resolve, reject) => {
            newProjectUser = JSON.parse(newProjectUser);
            // get the projectUser.
            let projectUser = projectUsers.find((projectUser) => projectUser.id === parseInt(id));
            // if no projectUser, return an error
            if (!projectUser) {
                reject(`No user with id ${id} found`);
            }
            //else, update it by setting completed to true
            const projectUserIndex = projectUsers.findIndex(projectUser => projectUser.id == parseInt(id) )
            projectUsers.splice(projectUserIndex,1,newProjectUser)
            //save data to database
            saveData(projectUsers,projectUsersPath);
            // return the updated projectUser
            resolve(newProjectUser);
        });
    }

    // deleting a projectUser
    async deleteProjectUser(id) {
        return new Promise((resolve, reject) => {
            // get the projectUser
            let projectUser = projectUsers.find((projectUser) => projectUser.id === parseInt(id));
            // if no projectUser, return an error
            if (!projectUser) { 
                reject(`No user with id ${id} found`);
            }
            // else, return a success message
            
            const projectUserIndex = projectUsers.findIndex(projectUser=> projectUser.id === parseInt(id));
            users.splice(projectUserIndex, 1);
            //save data to database
            saveData(projectUserIndex,projectUsersPath);
            resolve(`user deleted successfully`);
        });
    }
}
module.exports = projectUsersController;