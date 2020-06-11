const sql = require("./db.js");

//constructor
const Logs = function(logs) {
  this.logId = logs.logId;
  this.userId = logs.userId;
  this.date = logs.date;
  this.location = logs.location;
  this.rating = logs.rating;
  this.lat = logs.lat;
  this.lng = logs.lng;
  this.imageURL = logs.imageURL;
  this.comments = logs.comments;
};

//create log
Logs.create = (newLog, result) => {
  sql.query("INSERT INTO Logs SET ?", newLog, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created log: ", { id: res.insertId, ...newLog });
    result(null, { id: res.insertId, ...newLog });
  });
};

//get log by logId
Logs.findById = (logId, result) => {
  sql.query(`SELECT * FROM Logs WHERE logId = ${logId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found log: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

//get logs by userId
Logs.getByUser = (userId, result) => {
  sql.query(
    `SELECT * FROM Logs WHERE userId = ${userId} ORDER BY date DESC`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("logs: ", res);
      result(null, res);
    }
  );
};

module.exports = Logs;
