const mongoose = require('mongoose');

const projectUserSchema = new mongoose.Schema({
  projectId: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const ProjectUserModel = mongoose.model('ProjectUser', projectUserSchema);

module.exports = ProjectUserModel;