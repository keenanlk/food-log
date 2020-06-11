const sql = require("./db.js");

//constructor
const Tests = function(tests) {
  this.id = tests.id;
  this.name = tests.name;
};

Tests.getAll = result => {
  sql.query("SELECT * FROM test", (err, res) => {
    if (err) {
      console.log("error: ".err);
      result(null, err);
      return;
    }
    console.log("customers: ", res);
    result(null, res);
  });
};

module.exports = Tests;
