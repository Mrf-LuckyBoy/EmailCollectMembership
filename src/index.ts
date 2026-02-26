import cron from 'node-cron';
import { runChargeJob } from './jobs/charge.job.js';

cron.schedule('* * 3 * *', async () => {
  console.info('Running follow job...');
  await runChargeJob();
});
