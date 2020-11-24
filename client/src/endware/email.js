"use strict";
const nodemailer = require("nodemailer");

async function main() {

  let transporter = nodemailer.createTransport({
    host: "https://ecommerce-ft06-g08.herokuapp.com",
    port: 587,
    secure: false,
    auth: {
      user: 'wultur.company@gmail.com', 
      pass: 'contrasena1234567',
    },
    tls:{
      rejectUnauthorized: false
    }
  });
  
  let info = await transporter.sendMail({
    from: '"Wultur Company" <wultur.company@gmail.com>', 
    to: 'email', 
    subject: "Hello ✔",
    text: "Hello world?", 
    html: "<b>Hello world?</b>", 
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
