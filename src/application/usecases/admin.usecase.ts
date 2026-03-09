import type { PaidRepositoryPort } from '../ports/paid-repository.port.js';
import type { PaidPayload } from '../../domain/paid.dto.js';
import type { LogPaid } from '../../domain/paid.model.js';
import type { Resident } from '../../domain/resident.dto.js';
import type { EmailSenderPort } from '../ports/email-sender.port.js';
import type { MailgenPort } from '../ports/mailgen.port.js';
import type { ResidentRepositoryPort } from '../ports/resident-repository.port.js';

export class AdminUsecase {
  constructor(
    private PaidRepo: PaidRepositoryPort,
    private readonly emailTemplate: MailgenPort,
    private readonly emailSender: EmailSenderPort,
    private readonly ResidentRepo: ResidentRepositoryPort
  ) {}

  async createLogPaid(input: PaidPayload): Promise<LogPaid> {
    const result = await this.PaidRepo.createPaidLog(input);
    return result;
  }
  async createSendMailByResidentID(user_id: string): Promise<Resident> {
    const result = await this.ResidentRepo.getResidentByid(user_id);
    const { sendTo, text, html } = this.emailTemplate.generateChangeEmail(result);
    await this.emailSender.send(sendTo, 'send mail from admin', html, text);

    return result;
  }
}
