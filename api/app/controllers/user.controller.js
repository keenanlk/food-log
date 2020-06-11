const User = require("../models/user.model.js");

//create and save an user
exports.create = (req, res) => {
  //validate
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty"
    });
  }

  //create an user
  const user = new User({
    userId: req.body.userId,
    displayName: req.body.displayName,
    email: req.body.email
  });

  //save user in database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

//retrieve an user by email
exports.findOne = (req, res) => {
  User.findById(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.email
        });
      }
    } else res.send(data);
  });
};

exports.findOne2 = (req, res) => {
  User.findById2(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.findByUser = (req, res) => {
  User.getByUser(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found friends with userId ${req.params.userId}`
        });
      } else {
        res.status(500).send({
          message: "Error retreieving friends with userId: " + req.params.userId
        });
      }
    } else res.send(data);
  });
};
