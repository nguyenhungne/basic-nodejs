const FileSystemDataSource = require("./fileSystem.dataSource");
const database = require("../database").pathDataBase;

const DBCollections = {
  projects: "projects",
  tasks: "tasks",
  users: "users",
  projectUsers: "projectUsers",
};

const fileSystemDataSource = new FileSystemDataSource(database);

module.exports = { DBCollections, fileSystemDataSource };
