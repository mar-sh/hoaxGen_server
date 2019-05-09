const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.ADMIN_EMAIL,
  to: "",
  subject: "Welcome",
  html: "Enjoy producing some hoaxes",
};

module.exports = {
  transporter,
  mailOptions,
};
