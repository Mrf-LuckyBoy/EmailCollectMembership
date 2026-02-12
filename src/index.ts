import cron from 'node-cron';
import { runChargeJob } from './jobs/charge.job.js';

cron.schedule('* * 3 * *', async () => {
  console.log('Running follow job...');
  await runChargeJob();
});
