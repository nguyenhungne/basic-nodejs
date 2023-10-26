const ProjectController = require("../controllers/ProjectController");
const middlewares = require("../middlewares");
const url = require('url');


class ProjectRouter {
    constructor() {
      this.routes = [
        { path: '/projects/:id', method: 'GET', handler: this.getProject },
        { path: '/projects/:id', method: 'DELETE', handler: this.deleteProject },
        { path: '/projects/:id', method: 'PATCH', handler: this.updateProject },
        { path: '/projects', method: 'GET', handler: this.getProjects },
        { path: '/projects', method: 'POST', handler: this.createProject },
      ];
      this.ProjectController = new ProjectController();
    }
  
    async getProjects(req, res) {
      try {
        middlewares.authentication(req,res);
        const projects = await this.ProjectController.getProjects();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(projects));
      }
      catch (err) {
        res.statusCode = 401
        res.end("Authentication failed.")
      }
    }
  
    async getProject(req, res) {
      try {
        const id = req.url.split("/")[2];
        const project = await this.ProjectController.getProject(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(project));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async deleteProject(req, res) {
      try {
        const id = req.url.split("/")[2];
        const message = await this.ProjectController.deleteProject(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message }));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async updateProject(req, res) {
      try {
        const id = req.url.split("/")[2];
        const newProject = await middlewares.getReqData(req);
        const updatedProject = await this.ProjectController.updateProject(id, newProject);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedProject));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async createProject(req, res) {
      const projectData = await middlewares.getReqData(req);
      const project = await this.ProjectController.createProject(JSON.parse(projectData));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(project));
    }

    handleRequest(req, res) {
      const parsedUrl = url.parse(req.url, true);

      if (parsedUrl.pathname.split('/')[2] === undefined) {
        this.handleRequestWithoutId(req, res);
      } else {
        this.handleRequestWithId(req, res);
      }

    } 

    handleRequestWithoutId(req, res) {
      const route = this.routes.find(
        (r) => r.path === req.url && r.method === req.method
      );
      if (route) {
        route.handler.call(this, req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
      }
    }


    handleRequestWithId(req, res) {
      const route = this.routes.find(
        (r) => r.path === '/projects/:id' && r.method === req.method
      );

      if (route) {
        route.handler.call(this, req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
      }
    }


  }

  module.exports = ProjectRouter;