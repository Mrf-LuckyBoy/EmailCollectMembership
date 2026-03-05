import Fastify from 'fastify';
import mainRoute from './plugins/routes.plugin.js';
export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(
    async api => {
      api.register(
        async function (v1) {
          v1.get('/health', async () => ({ status: 'ok' }));
          v1.register(mainRoute);
        },
        { prefix: '/v1' }
      );
    },
    { prefix: '/api' }
  );

  return app;
}
