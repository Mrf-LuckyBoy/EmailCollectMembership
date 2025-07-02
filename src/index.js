import corn from 'node-cron';
import { errorMonitor } from 'node:events';
import axios from 'axios';
import dotenv from 'dotenv';
import sendMail from './mail.js';

dotenv.config();
corn.schedule('0 10 3 * *', async () => {
  try {
    const info = await sendMail();
    await Promise.all(
      info.map(async mailPromise => {
        const mailResult = await mailPromise;
        console.log('Mail sent:', mailResult.response);
      })
    );
    await axios.post(`${process.env.domain_tele}/bot${process.env.chat_bot_tele}/sendMessage`, {
      chat_id: process.env.chat_id_tele,
      text: 'Send email successfuly',
    });
  } catch (e) {
    console.error('Error sending mail:', errorMonitor.message);
    await axios.post(`${process.env.domain_tele}/bot${process.env.chat_bot_tele}/sendMessage`, {
      chat_id: process.env.chat_id_tele,
      text: 'Send email Unsuccessfuly',
    });
  }
});

console.log('Cron job scheduled to run every min');
