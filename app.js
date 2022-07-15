var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
const cors = require("cors");
var indexRouter = require("./routes/index");
const html = require("./config/html");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.get("/test2", (req, res) => {
  res.send(
    html({
      response: true,
      name: "amresh kumar",
      message: "this is a long message",
      email: "amreshkumar@gmail.com",
      phone: 9535188512,
      company: "Facebook",
    })
  );
});
app.get("/test1", (req, res) => {
  res.send(
    html({
      response: false,
      name: "data.neame",
      message:
        "this is a long message ththis is a long messagethis is a long messageis is a long message this is a long message this is a long message this is a long message",
      email: "amreshkumar@gmail.com",
      phone: 9535188512,
      company: "Facebook",
    })
  );
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
