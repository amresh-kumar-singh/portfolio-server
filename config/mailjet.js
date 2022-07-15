const html = require("./html");

require("dotenv").config();
const mailjet = require("node-mailjet").apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);
const sendEmail = (data, res) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "amresh@akmr.me",
          Name: data.response ? "Amresh Kumar" : data.name,
        },
        To: [
          {
            Email: data.response ? data.email : "amresh@akmr.me",
            Name: data.response ? data.name : "Amresh Kumar",
          },
        ],
        Subject: data.response
          ? "Amresh Kumar JavaScript Developer"
          : `Email from ${data.name} of ${
              data.company || "Company Not Mentioned"
            }`,
        TextPart: data.response
          ? `Hey, ${data.name}, I have received your Email`
          : `Message: ${data.message}`,
        HTMLPart: html(data),
      },
    ],
  });

  request
    .then((result) => {
      const status = result.body.Messages[0].Status;
      if (status === "success" && !data.response) {
        sendEmail({ ...data, response: true }, null);
        res.sendStatus(204);
      }
      // console.log("resutl", result.body);
    })
    .catch((err) => {
      console.log("error", err);
    });
};
module.exports = sendEmail;
