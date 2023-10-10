const projectsPath = require("../data/projects");
const fs = require('fs');

let rawProject = fs.readFileSync(projectsPath);
let projects = JSON.parse(rawProject);

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

class ProjectController {
    // getting all projects
    async getProjects() {
        return new Promise((resolve, _) => resolve(projects));
    }

    // getting a single project
    async getProject(id) {
        return new Promise((resolve, reject) => {
            let project = projects.find((project) => project.id === parseInt(id));
            if (project) {
                // return the project
                resolve(project);
            } else {
                // return an error
                reject(`project with id ${id} not found `);
            }
        });
    }

    // creating a Project
    async createProject(project) {
        return new Promise((resolve, _) => {
            // create a project, with random id and data sent
            let newProject = {
                id: Math.floor(Date.now() + Math.random() * 10),
                ...project,
            };

            projects.push(newProject);
            //save data to database
            saveData(projects,projectsPath);
            // return the new created project
            resolve(newProject);
        });
    }

    // updating a project
    async updateProject(id,newProject) {
        return new Promise((resolve, reject) => {
            newProject = JSON.parse(newProject);
            // get the project.
            let project = projects.find((project) => project.id === parseInt(id));
            // if no project, return an error
            if (!project) {
                reject(`No project with id ${id} found`);
            }
            //else, update it by setting completed to true
            const projectIndex = projects.findIndex(project => project.id === parseInt(id));
            projects.splice(projectIndex,1,newProject)
            //save data to database
            saveData(projects,projectsPath);
            // return the updated project
            resolve(newProject);
        });
    }

    // deleting a project
    async deleteProject(id) {
        return new Promise((resolve, reject) => {
            // get the project
            let project = projects.find((project) => project.id === parseInt(id));
            // if no project, return an error
            if (!project) { 
                reject(`No project with id ${id} found`);
            }
            // else, return a success message
        
            const projectIndex = projects.findIndex((project) => project.id === parseInt(id));
            projects.splice(projectIndex, 1);
            //save data to database
            saveData(projects,projectsPath);
            resolve(`project deleted successfully`); 
        });
    }
}
module.exports = ProjectController;