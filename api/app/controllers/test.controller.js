const Tests = require("../models/test.model.js");

//retrieve all tests from test table
exports.findAll = (req, res) => {
  Tests.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured"
      });
    else res.send(data);
  });
};
