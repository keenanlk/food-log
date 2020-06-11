const Log = require("../models/log.model.js");

//create and save a log
exports.create = (req, res) => {
  //validate
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty"
    });
  }

  //create a log
  const log = new Log({
    logId: req.body.logId,
    userId: req.body.userId,
    date: req.body.date,
    location: req.body.location,
    rating: req.body.rating,
    lat: req.body.lat,
    lng: req.body.lng,
    imageURL: req.body.imageURL,
    comments: req.body.comments
  });

  //save log to db
  Log.create(log, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the log."
      });
    else res.send(data);
  });
};

//retrieve log by id
exports.findOne = (req, res) => {
  Log.findById(req.params.logId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found log with id ${req.params.logId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving log with id " + req.params.logId
        });
      }
    } else res.send(data);
  });
};

//retrieve logs by userId
exports.findByUser = (req, res) => {
  Log.getByUser(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found log with userId ${req.params.userId}`
        });
      } else {
        res.status(500).send({
          message: "Error retreieving logs with userId: " + req.params.userId
        });
      }
    } else res.send(data);
  });
};
