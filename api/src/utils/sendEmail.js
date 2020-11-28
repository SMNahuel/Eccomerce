const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmail(email, html, subject, text) {
  return sgMail.send({
    from: 'wultur.company@gmail.com',
    to: email,
    subject: subject,
    text: text || subject,
    html: html
  })
  .then(r => (console.log('Email sent'), r))
}

function changePassword(email, data){
  const template = require('./templates/passwordChange.js')
  return sendEmail(email, template(data), 'Wultur Change Password')
}

function checkout(email, data){
  const template = require('./templates/checkout.js')
  return sendEmail(email, template(data), 'Wultur Checkout')
}

function confirmPay(email, data){
  const template = require('./templates/confirmPay.js')
  return sendEmail(email, template(data), 'Wultur Checkout')
}

module.exports = {
  changePassword,
  checkout,
  confirmPay
}