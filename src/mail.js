import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import listTemplate from './template.js';

dotenv.config();
export default async function sendMail() {
  const listPromise = [];
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.HOST_MAIL,
      pass: process.env.HOST_PASS,
    },
  });

  listTemplate.forEach(i => {
    const mailOptions = {
      from: process.env.HOST_MAIL,
      to: i.gestMail,
      subject: 'youtube premium',
      text: i.textMail,
      html: i.htmlMail,
    };
    listPromise.push(transporter.sendMail(mailOptions));
  });

  await Promise.all(listPromise);

  return listPromise;
}
