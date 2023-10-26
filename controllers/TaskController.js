const { findTasks, createTask, findTask, updateTask, deleteTask } = require("./helper")



class TaskController {

    // getting all tasks
    getTasks(req,res) {
        return findTasks(req,res);
    }

    // getting a single task
    async getTask(id) {
        return findTask(id);
    }

    // creating a Task
    async createTask(task) {
        return createTask(task);
    }

    // updating a task
    async updateTask(id,newTask) {
        return updateTask(id,newTask)
    }

    // deleting a task
    async deleteTask(id) {
        return deleteTask(id)
    }
}
module.exports = TaskController;