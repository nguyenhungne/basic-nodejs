const task = {
  id: {
    type: "number",
    required: true,
  },
  projectId: {
    type: "number",
    required: true,
    
  },
  task: {
    type: "string",
    required: true,
    unique: true,
  },
  done: {
    type: "boolean",
    required: false,
  },
  author: {
    type: "string",
    required: true,
  },
};

module.exports = task;
