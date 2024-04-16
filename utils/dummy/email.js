const { text } = require("body-parser");
const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  // create trnsporter
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log("transport:", transport);

  const emailOptions = {
    from: "Cineflix support<support@cineflix.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  console.log("emailoptions:", emailOptions);
  await transport.sendMail(emailOptions);
};

module.exports = sendEmail;
