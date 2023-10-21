const projectUser = {
    accountId: {
      type: "number",
      required: true,
      unique: true
    },
    projectId: {
      type: "number",
    },
    role: {
        type : "string",
        required: true
    }
  };
  
  module.exports = projectUser;
  