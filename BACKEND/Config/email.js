const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  auth: {
    user: "crowdtix@zohomail.in",
    pass: "BHUVANASABARI",
  },
});

module.exports = {
    transporter
}