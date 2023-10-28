const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectId: {
    type: Number,
    required: true,
  },
  task: {
    type: String,
    required: true,
    unique: true,
  },
  done: {
    type: Boolean,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;