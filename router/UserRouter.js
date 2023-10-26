const UserController = require("../controllers/UserController");
const middlewares = require("../middlewares");
const url = require('url');


class UserRouter {
    constructor() {
      this.routes = [
        { path: '/users/:id', method: 'GET', handler: this.getUser },
        { path: '/users/:id', method: 'DELETE', handler: this.deleteUser },
        { path: '/users/:id', method: 'PATCH', handler: this.updateUser },
        { path: '/users', method: 'GET', handler: this.getUsers },
        { path: '/users', method: 'POST', handler: this.createUser },
      ];
      this.UserController = new UserController();
    }
  
    async getUsers(req, res) {
      const users = await this.UserController.getUsers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    }
  
    async getUser(req, res) {
      try {
        const userBody = await middlewares.getReqData(req);
        const user = await this.UserController.getUser(JSON.parse(userBody));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async deleteUser(req, res) {
      try {
        const id = req.url.split("/")[2];
        const message = await this.UserController.deleteUser(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message }));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async updateUser(req, res) {
      try {
        const id = req.url.split("/")[2];
        const newUser = await middlewares.getReqData(req);
        const updatedUser = await this.UserController.updateUser(id, newUser);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async createUser(req, res) {
      const userData = await middlewares.getReqData(req);
      const user = await this.UserController.createUser(JSON.parse(userData));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
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
        (r) => r.path === '/users/:id' && r.method === req.method
      );

      if (route) {
        route.handler.call(this, req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
      }
    }


  }

  module.exports = UserRouter;