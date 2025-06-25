import corn from 'node-cron';
import { errorMonitor } from 'node:events';
import sendMail from './mail.js';

corn.schedule('0 10 3 * *', async () => {
  try {
    const info = await sendMail();
    await Promise.all(
      info.map(async mailPromise => {
        const mailResult = await mailPromise;
        console.log('Mail sent:', mailResult.response);
      })
    );
  } catch (e) {
    console.error('Error sending mail:', errorMonitor.message);
  }
});

console.log('Cron job scheduled to run every min');
