const http = require('http');
const TaskRouter = require('./router/TaskRouter');
const ProjectRouter = require('./router/ProjectRouter');
const UserRouter = require('./router/UserRouter');
const ProjectUserRouter = require('./router/projectUserRouter')
const url = require('url');

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");

    const taskRouter = new TaskRouter;
    const projectRouter = new ProjectRouter;
    const userRouter = new UserRouter;
    const projectUserRouter = new ProjectUserRouter

    if (req.url.split("/")[1] === "tasks") {
        taskRouter.handleRequest(req, res);
     }

     else if (req.url.split("/")[1] === "projects") {
        projectRouter.handleRequest(req, res);
     }

     else if (req.url.split("/")[1] === "users") {
        userRouter.handleRequest(req, res);
     }

     else if (req.url.split("/")[1] === "projectUsers") {
        projectUserRouter.handleRequest(req, res);
     }

});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});