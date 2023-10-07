const projects = require("../data/projects");

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

            // return the new created project
            resolve(newProject);
        });
    }

    // updating a project
    async updateProject(id,new_project) {
        return new Promise((resolve, reject) => {
            // get the project.
            let project = projects.find((project) => project.id === parseInt(id));
            // if no project, return an error
            if (!project) {
                reject(`No project with id ${id} found`);
            }
            //else, update it by setting completed to true
            projects.replace(project, new_task );
            // return the updated project
            resolve(project);
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
        
            projects = projects.filter((task) => task.id != parseInt(id));

            resolve(`project deleted successfully`); 
        });
    }
}
module.exports = ProjectController;