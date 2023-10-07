const http = require("http");
const TaskController = require("./controllers/TaskController");
const ProjectController = require("./controllers/ProjectController");
const UserController = require("./controllers/UserController");
const { getReqData } = require("./util");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {


    // TASKS----------------------------------------------------------------

// [GET] /tasks 
if (req.url === "/tasks" && req.method === "GET") {
    // get the tasks.
    const tasks = await new TaskController().getTasks();
    // set the status code, and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(tasks));
}
    //[GET] /tasks/:id
else if (req.url.match(/\/tasks\/([0-9]+)/) && req.method === "GET") {
    try {
        // get id from url
        const id = req.url.split("/")[2];
        // get task
        const task = await new TaskController().getTask(id);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(task));
    } catch (error) {
        // set the status code and content-type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

    //[DELETE] /tasks/:id

else if (req.url.match(/\/tasks\/([0-9]+)/) && req.method === "DELETE") {
    try {
        // get the id from url
        const id = req.url.split("/")[2];
        // delete task
        let message = await new TaskController().deleteTask(id);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the message
        res.end(JSON.stringify({ message }));
    } catch (error) {
        // set the status code and content-type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

// /tasks/:id : UPDATE
else if (req.url.match(/\/tasks\/([0-9]+)/) && req.method === "PATCH") {
    try {
        // get the id from the url
        const id = req.url.split("/")[2];
        //get new task
        let new_task = await getReqData(req);
        // update task
        let updated_task = await new TaskController().updateTask(id,new_task);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the message
        res.end(JSON.stringify(updated_task));
    } catch (error) {
        // set the status code and content type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

// /tasks/ : POST
else if (req.url === "/tasks" && req.method === "POST") {
    // get the data sent along
    let task_data = await getReqData(req);
    // create the task
    let task = await new TaskController().createTask(JSON.parse(task_data));
    // set the status code and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    //send the task
    res.end(JSON.stringify(task));
}

//----------------------------------------------------------------

// Projects routes

else if (req.url === "/projects" && req.method === "GET") {
    // get the projects.
    const projects = await new ProjectController().getProjects();
    // set the status code, and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(projects));
}
    //[GET] /projects/:id
else if (req.url.match(/\/projects\/([0-9]+)/) && req.method === "GET") {
    try {
        // get id from url
        const id = req.url.split("/")[2];
        // get projects
        const project = await new ProjectController().getProject(id);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(project));
    } catch (error) {
        // set the status code and content-type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

    //[DELETE] /projects/:id

else if (req.url.match(/\/projects\/([0-9]+)/) && req.method === "DELETE") {
    try {
        // get the id from url
        const id = req.url.split("/")[2];
        // delete project
        let message = await new ProjectController().deleteProject(id);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the message
        res.end(JSON.stringify({ message }));
    } catch (error) {
        // set the status code and content-type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

// /projects/:id : UPDATE
else if (req.url.match(/\/projects\/([0-9]+)/) && req.method === "PATCH") {
    try {
        // get the id from the url
        const id = req.url.split("/")[2];
        // get new project
        let new_project = await getReqData(req);
        // update project
        let updated_project = await new ProjectController().updateProject(id,new_project);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the message
        res.end(JSON.stringify(updated_project));
    } catch (error) {
        // set the status code and content type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

// /api/projects/ : POST
else if (req.url === "/projects" && req.method === "POST") {
    // get the data sent along
    let project_data = await getReqData(req);
    // create the project
    let project = await new ProjectController().createProject(JSON.parse(project_data));
    // set the status code and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    //send the project
    res.end(JSON.stringify(project));
}

//----------------------------------------------------------------

// users routes

else if (req.url === "/users" && req.method === "GET") {
    // get the users.
    const users = await new UserController().getUsers();
    // set the status code, and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(users));
}
    //[GET] /users/:id
else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "GET") {
    try {
        // get id from url
        const id = req.url.split("/")[2];
        // get users
        const user = await new UserController().getUser(id);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(user));
    } catch (error) {
        // set the status code and content-type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

    //[DELETE] /users/:id

else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "DELETE") {
    try {
        // get the id from url
        const id = req.url.split("/")[2];
        // delete user
        let message = await new UserController().deleteUser(id);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the message
        res.end(JSON.stringify({ message }));
    } catch (error) {
        // set the status code and content-type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

// /users/:id : UPDATE
else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "PATCH") {
    try {
        // get the id from the url
        const id = req.url.split("/")[2];
        // get new user
        let new_user = await getReqData(req);
        // update project
        let updated_user = await new UserController().updateUser(id,new_user);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the message
        res.end(JSON.stringify(updated_user));
    } catch (error) {
        // set the status code and content type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
    }
}

// /api/users/ : POST
else if (req.url === "/users" && req.method === "POST") {
    // get the data sent along
    let user_data = await getReqData(req);
    // create the user
    let user = await new UserController().createUser(JSON.parse(user_data));
    // set the status code and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    //send the project
    res.end(JSON.stringify(user));
}

// No route present
else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
}

});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});