const project = {
    id: {
      type: "number",
      required: true,
    },
    project: {
      type: "string",
      required: true,
      unique: true,
    },
    done: {
      type: "boolean",
      required: false,
    },
  };
  
  module.exports = project;
  