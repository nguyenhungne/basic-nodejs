const ProjectUserController = require("../controllers/projectUsersController");
const middlewares = require("../middlewares");
const url = require('url');


class projectUserRouter {
    constructor() {
      this.routes = [
        { path: '/projectUsers/:id', method: 'GET', handler: this.getProjectUser },
        { path: '/projectUsers/:id', method: 'DELETE', handler: this.deleteProjectUser },
        { path: '/projectUsers/:id', method: 'PATCH', handler: this.updateProjectUser },
        { path: '/projectUsers', method: 'GET', handler: this.getProjectUsers },
        { path: '/projectUsers', method: 'POST', handler: this.createProjectUser },
      ];
      this.projectUserController = new ProjectUserController();
    }
  
    async getProjectUsers(req, res) {
      const projectUsers = await this.projectUserController.getProjectUsers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(projectUsers));
    }
  
    async getProjectUser(req, res) {
      try {
        const id = req.url.split("/")[2];
        const projectUser = await this.projectUserController.getProjectUser(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(projectUser));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async deleteProjectUser(req, res) {
      try {
        const id = req.url.split("/")[2];
        const message = await this.projectUserController.deleteProjectUser(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message }));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async updateProjectUser(req, res) {
      try {
        const id = req.url.split("/")[2];
        const newProjectUser = await middlewares.getReqData(req);
        const updateProjectUser = await this.projectUserController.updateProjectUser(id, newProjectUser);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updateProjectUser));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async createProjectUser(req, res) {
      const projectUserData = await middlewares.getReqData(req);
      const projectUser = await this.projectUserController.createProjectUser(JSON.parse(projectUserData));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(projectUser));
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
        (r) => r.path === '/projectUsers/:id' && r.method === req.method
      );

      if (route) {
        route.handler.call(this, req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
      }
    }


  }

  module.exports = projectUserRouter;