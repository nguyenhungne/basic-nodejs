const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project: {
    type: String,
    required: true,
    unique: true,
  },
  done: {
    type: Boolean,
    required: false,
  },
});

const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;