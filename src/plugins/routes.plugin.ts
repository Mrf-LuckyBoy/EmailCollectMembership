import type { FastifyInstance } from 'fastify';
import { AdminHandler } from '../handlers/admin.handler.js';
import { PaidRepository } from '../infrastructure/database/paid.repository.js';
import { prisma } from '../infrastructure/database/prisma.client.js';
import { AdminUsecase } from '../application/usecases/admin.usecase.js';

async function mainRoutes(app: FastifyInstance) {
  const adminUsecase = new AdminUsecase(
    new PaidRepository(prisma)
  )
  const handler = new AdminHandler(adminUsecase);

  app.register(async function (admin) {
    admin.post('/', handler.createPaidLog.bind(handler));
  },
    { prefix: '/admin' })
}

export default mainRoutes;
