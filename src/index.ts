import cron from 'node-cron';
import { runChargeJob } from './jobs/charge.job.js';
import { buildApp } from './app.js';
cron.schedule('* * 3 * *', async () => {
  console.info('Running follow job...');
  await runChargeJob();
});

const start = async () => {
  const app = buildApp();

  await app.listen({ port: 3000 });
  console.log('Server running on port 3000');

  return app;
};

// Start server and handle startup errors
start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
