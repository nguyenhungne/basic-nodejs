const { findProjects, createProject, updateProject,findProject, deleteProject } = require("./helper")


class ProjectController {
    // getting all projects
    async getProjects() {
        return findProjects();
    }

    // getting a single project
    async getProject(id) {
        return findProject(id);
    }

    // creating a Project
    async createProject(project) {
        return createProject(project)
    }

    // updating a project
    async updateProject(id,newProject) {
        return updateProject(id,newProject)
    }

    // deleting a project
    async deleteProject(id) {
        return deleteProject(id)
    }
}
module.exports = ProjectController;