module.exports = app => {
  const logs = require("../controllers/log.controller.js");

  //create new log
  app.post("/logs", logs.create);

  //retrieve log by id
  app.get("/logs/:logId", logs.findOne);

  //retrieve logs by userId
  app.get("/logs/users/:userId", logs.findByUser);
};
