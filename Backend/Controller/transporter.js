const { OTP_KEY, GMAIL } = require("../server.js")
const { otp } = require("../Helper/helperfunctions.js")
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL,
    pass: OTP_KEY,
  },
});
console.log("now going to verify")
transporter.verify((err, success) => {
  if (err) {
    console.error(' Connection failed:', err.message);
  } else {
    console.log(' Server is ready to send emails');
  }
});
// const sendOtpEmail = async (email, otp) => {
//   await transporter.sendMail({
//     from: GMAIL,
//     to: email,
//     subject: "Your Verification Code",
//     text: `Your OTP is ${otp}. It expires in 5 minutes.`
//   });
// };

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${GMAIL}>`, // sender address
      to, // list of receivers
      subject: "Your Verification Code ",
      text: `Your OTP is ${otp}`,
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
module.exports = {
  transporter,
  sendEmail,
}
