module.exports = app => {
  const users = require("../controllers/user.controller.js");

  //create new user
  app.post("/users", users.create);

  //retrieve user by email
  app.get("/users/:email", users.findOne);

  //retrieve user by id
  app.get("/users/id/:userId", users.findOne2);

  //retrieve friends
  app.get("/users/friends/:userId", users.findByUser);
};
