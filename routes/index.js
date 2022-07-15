var express = require("express");
const sendEmail = require("../config/mailjet");
var router = express.Router();
var debug = require("debug")("amresh-kumar-server:server");
const { limiterDownload, limiterMessage } = require("../config/rateLimiter");

router.post("/message", limiterMessage, function (req, res, next) {
  if (!req.body.data)
    return res.status(400).send("Cant't leave these fields empty");
  sendEmail(req.body.data, res);
  // return res.sendStatus(204);
});

router.get("/resume", limiterDownload, function (req, res, next) {
  debug(req.body);
  return res.download(__dirname + "/../public/AmreshResume.pdf");
});

module.exports = router;
