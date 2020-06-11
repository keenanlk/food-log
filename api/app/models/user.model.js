const sql = require("./db.js");

//constructor
const Users = function(users) {
  this.userId = users.userId;
  this.displayName = users.displayName;
  this.email = users.email;
};

//create user
Users.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

//get user
Users.findById = (userEmail, result) => {
  sql.query(
    "SELECT * FROM Users WHERE email = '" + userEmail + "'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Users.findById2 = (userId, result) => {
  sql.query(
    "SELECT * FROM Users WHERE userId = '" + userId + "'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

//get friends
Users.getByUser = (userId, result) => {
  sql.query(
    `select * from Users 
            INNER JOIN Friends
            on (Friends.userId = ${userId} OR Friends.friendId = ${userId})
            AND Friends.status = 1
            WHERE (Users.userId = Friends.friendId OR Users.userId = Friends.userId)
            AND Users.userId != ${userId}`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
        return;
      }
      console.log("friends: ", res);
      result(null, res);
    }
  );
};

module.exports = Users;
