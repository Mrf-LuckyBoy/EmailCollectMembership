import cron from 'node-cron';
import { runChargeJob } from './jobs/charge.job.js';
import { buildApp } from './app.js';
cron.schedule('* * 3 * *', async () => {
  console.info('Running follow job...');
  await runChargeJob();
});

const app = buildApp();
app.listen({ port: 3000 });
