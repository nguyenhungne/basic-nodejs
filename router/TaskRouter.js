const TaskController = require("../controllers/TaskController");
const middlewares = require("../middlewares");
const url = require('url');


class TaskRouter {
    constructor() {
      this.routes = [
        { path: '/tasks/:id', method: 'GET', handler: this.getTask },
        { path: '/tasks/:id', method: 'DELETE', handler: this.deleteTask },
        { path: '/tasks/:id', method: 'PATCH', handler: this.updateTask },
        { path: '/tasks', method: 'GET', handler: this.getTasks },
        { path: '/tasks', method: 'POST', handler: this.createTask },
      ];
      this.taskController = new TaskController();
    }
  
    async getTasks(req, res) {
      
      const tasks = await this.taskController.getTasks(req,res);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tasks));
    }
  
    async getTask(req, res) {
      try {
        const id = req.url.split("/")[2];
        const task = await this.taskController.getTask(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async deleteTask(req, res) {
      try {
        const id = req.url.split("/")[2];
        const message = await this.taskController.deleteTask(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message }));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async updateTask(req, res) {
      try {
        const id = req.url.split("/")[2];
        const new_task = await middlewares.getReqData(req);
        const updated_task = await this.taskController.updateTask(id, new_task);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updated_task));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    }
  
    async createTask(req, res) {
      const task_data = await middlewares.getReqData(req);
      const task = await this.taskController.createTask(JSON.parse(task_data));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(task));
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
        (r) => r.path === '/tasks/:id' && r.method === req.method
      );

      if (route) {
        route.handler.call(this, req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
      }
    }


  }

  module.exports = TaskRouter;