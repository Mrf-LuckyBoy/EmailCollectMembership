import type { FastifyInstance } from 'fastify';
import { AdminHandler } from '../handlers/admin.handler.js';
import { PaidRepository } from '../infrastructure/database/paid.repository.js';
import { prisma } from '../infrastructure/database/prisma.client.js';
import { AdminUsecase } from '../application/usecases/admin.usecase.js';
import { ResidentRepository } from '../infrastructure/database/resident.repository.js';
import { MailgenTemplateAdapter } from '../infrastructure/email/mailgen-template.adapter.js';
import { NodemailerAdapter } from '../infrastructure/email/nodemailer.adapter.js';

async function mainRoutes(app: FastifyInstance) {
  // usercase
  const adminUsecase = new AdminUsecase(
    new PaidRepository(prisma),
    new MailgenTemplateAdapter(),
    new NodemailerAdapter(),
    new ResidentRepository(prisma),
  );
  // handler
  const handler = new AdminHandler(adminUsecase);

  app.register(
    async function (admin) {
      admin.post('/', handler.createPaidLog.bind(handler));
      admin.post('/to-resident', handler.sendMailFromAdmin.bind(handler));
    },
    { prefix: '/admin' }
  );
}

export default mainRoutes;
