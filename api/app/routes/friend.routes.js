module.exports = app => {
  const friends = require("../controllers/friend.controller.js");

  //create a new request
  app.post("/friends", friends.create);

  //get freidn requests
  app.get("/friends/:userId", friends.findByUser);

  //update request
  app.put("/friends/:id", friends.update);
};
