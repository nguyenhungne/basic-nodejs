const tasks = require("../data/tasks");

class TaskController {
    // getting all tasks
    async getTasks() {
        return new Promise((resolve, _) => resolve(tasks));
    }

    // getting a single task
    async getTask(id) {
        return new Promise((resolve, reject) => {
            let task = tasks.find((task) => task.id === parseInt(id));
            if (task) {
                // return the task
                resolve(task);
            } else {
                // return an error
                reject(`task with id ${id} not found `);
            }
        });
    }

    // creating a Task
    async createTask(task) {
        return new Promise((resolve, _) => {
            // create a task, with random id and data sent
            let newTask = {
                id: Math.floor(Date.now() + Math.random() * 10),
                ...task,
            };

            tasks.push(newTask);

            // return the new created task
            resolve(newTask);
        });
    }

    // updating a task
    async updateTask(id,newTask) {
        return new Promise((resolve, reject) => {
            newTask = JSON.parse(newTask);
            // get the task.
            let task = tasks.find((task) => task.id === parseInt(id));
            // if no task, return an error
            if (!task) {
                reject(`No task with id ${id} found`);
            }
            //else, update it by setting completed to true
            const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
            tasks.splice(taskIndex, 1,newTask);
            // return the updated task
            resolve(task);
        });
    }

    // deleting a task
    async deleteTask(id) {
        return new Promise((resolve, reject) => {
            // get the task
            let task = tasks.find((task) => task.id === parseInt(id));
            // if no task, return an error
            if (!task) { 
                reject(`No task with id ${id} found`);
            }
            // else, update data and return a success message
            const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
            tasks.splice(taskIndex, 1);
            resolve(`task deleted successfully`);
        });
    }
}
module.exports = TaskController;