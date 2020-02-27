const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const config = require("./config/pruduction");

const app = express();

const startExpressApp = () => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
    next();
  });

  routes(app);

  startServer();
};

const startServer = () => {
  const server = http.createServer(app);
  server.listen(process.env.PORT || config.port, function() {
    console.log(
      `==== Server started on port ${process.env.PORT || config.port} =====`
    );
  });
};

mongoose
  .connect(config.mongoUri, config.options)
  .then(() => {
    console.log("Database successfully connected");
    startExpressApp();
  })
  .catch(err => console.log(err));
