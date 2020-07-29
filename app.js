const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require("./config/database");

const app = express();

// Cookie Parser
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(flash());

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

// ************ REGISTER ROUTES HERE ********** //
app.get("/", (req, res) => {
  res.send("Welcome to Express!");
});
// ************ END ROUTE REGISTRATION ********** //

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log("Connection to database failed =>", err));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next();
});

module.exports = app;