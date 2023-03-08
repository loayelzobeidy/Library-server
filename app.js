const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./src/routes/book.routes')(app);
require('./src/routes/shelf.routes')(app);
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);


const db = require("./src/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the university library application" });
});

module.exports = app;
