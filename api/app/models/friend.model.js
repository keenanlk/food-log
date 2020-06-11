const sql = require("./db.js");

const Friends = function(friends) {
  this.id = friends.id;
  this.userId = friends.userId;
  this.friendId = friends.friendId;
  this.status = friends.status;
};

//create friend request
Friends.create = (newRequest, result) => {
  sql.query("INSERT INTO Friends SET ?", newRequest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("create friend request: ", { id: res.insertId, ...newRequest });
    result(null, { id: res.insertId, ...newRequest });
  });
};

//get friend requests
Friends.getByUser = (userId, result) => {
  sql.query(
    `SELECT * FROM Friends WHERE friendId = ${userId} AND status = 0`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("requests: ", res);
      result(null, res);
    }
  );
};

//update by id
Friends.updateById = (id, result) => {
  sql.query(
    "UPDATE Friends SET status = ? WHERE id = ?",
    [1, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
      }
      console.log("updated friends: ", { id: id, ...id });
      result(null, { id: id, ...id });
    }
  );
};

module.exports = Friends;
