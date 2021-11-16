import nodemailer from "nodemailer";
import { __prod__ } from "../constants";

export const sendEmail = async (to: string, subject: string, text: string) => {
  __prod__
    ? await prodMail(to, subject, text)
    : await devMail(to, subject, text);
};

const devMail = async (to: string, subject: string, text: string) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "nssx4x5w5vxgfil7@ethereal.email", // generated ethereal user
      pass: "2s52jcaexmyJbqp7C5", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: text, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

const prodMail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "viatchat@gmail.com",
    to: to,
    subject: subject,
    html: text,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error("error sending email:", err);
    } else {
      console.log("Email sent");
    }
  });
};
