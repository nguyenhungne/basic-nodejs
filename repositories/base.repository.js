const { DBCollections, fileSystemDataSource} = require("../dataSource");
const { validateEntityFields, validateEntityUniqueness } = require("./healper");
const mongoose = require('mongoose');

function Repository(name, schema) {
  this.schema = schema;

  this.findAll = function findAll() {
    return fileSystemDataSource
      .readData(DBCollections[name])
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };


  this.findById = function findById(id) {
    return fileSystemDataSource
      .readData(DBCollections[name])
      .then((data) => {
        let task = data.find((task) => task.id === parseInt(id));
        if (task) {
          // return the task
          return task;
        } else {
          // return an error
          throw new Error(`No id ${id} found`);
        }
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };

  this.createOne = function createOne(newItem) {
    return new Promise((resolve, reject) => {
      let validationError = validateEntityFields(this.schema, newItem);
      if (validationError) {
        reject(validationError);
      } else {
        resolve(
          this.findAll().then((existingItems) => {
            validationError = validateEntityUniqueness(
              this.schema,
              newItem,
              existingItems
            );
            console.log(validationError)

            if (validationError) {
              return reject(validationError);
            }

            existingItems.push({
              id: Math.floor(Date.now() * Math.random() * 10),
              ...newItem,
            });
            return fileSystemDataSource
              .saveData(existingItems, DBCollections[name])
          })
        );
      }
    });
  };

  this.updateOne = function updateOne(id, newItem) {
    return new Promise((resolve, reject) => {
        resolve(
          this.findAll().then((existingItems) => {
            validationError = "";
            if (validationError) {
              throw new Error(validationError);
            }
            let item = existingItems.find((item) => item.id === parseInt(id));
            if (!item) {
              reject(`No item with id ${id} found`);
            }
            let itemIndex = existingItems.findIndex(
              (item) => item.id === parseInt(id)
            );
            newItem = JSON.parse(newItem)
            existingItems.splice(itemIndex, 1, newItem);
            return fileSystemDataSource
              .saveData(existingItems, DBCollections[name])
          })
        );
    });
  };

  this.deleteOne = function deleteOne(id) {
    return new Promise((resolve, reject) => {
        resolve(
          this.findAll().then((existingItems) => {
            let item = existingItems.find((item) => item.id === parseInt(id));
            if (!item) {
              reject(`No item with id ${id} found`);
            }
            let itemIndex = existingItems.findIndex(
              (item) => item.id == parseInt(id)
            );
            existingItems.splice(itemIndex, 1);
            return fileSystemDataSource
              .saveData(existingItems, DBCollections[name])
          })
        );
    });
  };
  
}

module.exports = Repository;