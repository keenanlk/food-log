const Friend = require("../models/friend.model.js");

//create a friend request
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "COntent cannot be empty"
    });
  }

  //create request
  const friend = new Friend({
    id: req.body.id,
    userId: req.body.userId,
    friendId: req.body.friendId,
    status: req.body.status
  });

  //save request to db
  Friend.create(friend, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while creating the request."
      });
    else res.send(data);
  });
};

//get friend requests
exports.findByUser = (req, res) => {
  Friend.getByUser(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found request with userId ${rq.params.userId}`
        });
      } else {
        res.status(500).send({
          message: "error retrieving"
        });
      }
    } else res.send(data);
  });
};

//update request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty"
    });
  }
  Friend.updateById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "error updating friend request"
        });
      } else {
        res.status(500).send({
          message: "Error updating friend request"
        });
      }
    } else res.send(data);
  });
};
