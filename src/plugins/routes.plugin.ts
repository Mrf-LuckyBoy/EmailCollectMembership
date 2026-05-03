import type { FastifyInstance } from 'fastify';
import { AdminHandler } from '../handlers/admin.handler.js';
import { PaidRepository } from '../infrastructure/database/paid.repository.js';
import { prisma } from '../infrastructure/database/prisma.client.js';
import { AdminUsecase } from '../application/usecases/admin.usecase.js';
import { SendEmail } from '../application/usecases/send-mail.usecase.js';
import { ResidentRepository } from '../infrastructure/database/resident.repository.js';
import { MailgenTemplateAdapter } from '../infrastructure/email/mailgen-template.adapter.js';
import { NodemailerAdapter } from '../infrastructure/email/nodemailer.adapter.js';
import { ManaulHandler } from '../handlers/mail.handler.js';

async function mainRoutes(app: FastifyInstance) {
  // usercase
  const adminUsecase = new AdminUsecase(
    new PaidRepository(prisma),
    new MailgenTemplateAdapter(),
    new NodemailerAdapter(),
    new ResidentRepository(prisma),
  );
  const sendMailUsecase = new SendEmail(
    new ResidentRepository(prisma),
    new MailgenTemplateAdapter(),
    new NodemailerAdapter()
  );

  // handler
  const handler = new AdminHandler(adminUsecase);
  const manaul_handler = new ManaulHandler(sendMailUsecase)

  app.register(
    async function (admin) {
      admin.post('/', handler.createPaidLog.bind(handler));
      admin.post('/to-resident', handler.sendMailFromAdmin.bind(handler));
      admin.post('/charge-resident', manaul_handler.manaulChargeMail.bind(manaul_handler));
    },
    { prefix: '/admin' }
  );
}

export default mainRoutes;
