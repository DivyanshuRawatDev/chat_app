const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_GMAIL,
    pass: process.env.MY_GMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Divyanshu Rawat" <${process.env.MY_GMAIL}>`,
      to: to,
      subject: subject,
      html: html,
    });
    return true;
  } catch (error) {
    console.error("Error while sending email:", error);
    return false;
  }
};

module.exports = { sendEmail };
