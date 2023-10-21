const fs = require("fs");
const fsPromises = require("fs").promises;

function FileSystemDataSource(dataPath = "") {
  this.dataPath = dataPath;


  // save data
  this.saveData = function saveData(data, fileName) {
    const path = `${this.dataPath}\\${fileName}.json`;

    data = JSON.stringify(data);
    fs.writeFile(path, data, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
  };

//read data
  this.readData = function (fileName) {
    const path = `${this.dataPath}\\${fileName}.json`;

    return fsPromises
      .readFile(path)
      .then(function (result) {
        let rawProject = result;
        let projects = JSON.parse(rawProject);

        return projects;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

module.exports = FileSystemDataSource