import { SendChargeEmail } from '../application/usecases/send-change.usecase.js';
import { ResidentRepository } from '../infrastructure/database/resident.repository.js';
import { MailgenTemplateAdapter } from '../infrastructure/email/mailgen-template.adapter.js';
import { NodemailerAdapter } from '../infrastructure/email/nodemailer.adapter.js';
import { prisma } from '../infrastructure/database/prisma.client.js';

export async function runChargeJob() {
  const usecase = new SendChargeEmail(
    new ResidentRepository(prisma),
    new MailgenTemplateAdapter(),
    new NodemailerAdapter()
  );

  await usecase.execute();
}
