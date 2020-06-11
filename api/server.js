const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
var cors = require("cors");

const app = express();

const options = {
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem")
};

// parse requests of content-type: application/json
app.use(bodyParser.json());

app.use(cors());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Log Log server" });
});

//add route files
require("./app/routes/user.routes.js")(app);
require("./app/routes/test.routes.js")(app);
require("./app/routes/log.routes.js")(app);
require("./app/routes/friend.routes.js")(app);

//set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

// https
//   .createServer(options, function(req, res) {
//     res.writeHead(200);
//     res.end("Hello World");
//   })
//   .listen(3000);
