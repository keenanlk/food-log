module.exports = app => {
  const test = require("../controllers/test.controller.js");

  //retrieve all from test table
  app.get("/test", test.findAll);
};
