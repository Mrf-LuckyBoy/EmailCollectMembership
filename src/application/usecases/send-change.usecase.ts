import type { EmailSenderPort } from '../ports/email-sender.port.js';
import type { MailgenPort } from '../ports/mailgen.port.js';
import type { ResidentRepositoryPort } from '../ports/resident-repository.port.js';
import { TelegramAPI } from '../../infrastructure/thirdparty/telegram.client.js';

export class SendChargeEmail {
  constructor(
    private readonly ResidentRepo: ResidentRepositoryPort,
    private readonly emailTemplate: MailgenPort,
    private readonly emailSender: EmailSenderPort
  ) {}

  async execute(): Promise<void> {
    const users = await this.ResidentRepo.getAllResident();

    for (const user of users) {
      const { sendTo, text, html } = this.emailTemplate.generateChangeEmail(user);
      await this.emailSender.send(sendTo, 'youtube premium', html, text);
      await TelegramAPI.sendMessage(`Send Charge mail to ${user.residentFullName}`);
    }
  }
}
