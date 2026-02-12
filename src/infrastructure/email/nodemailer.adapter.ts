import nodemailer from 'nodemailer';
import type { EmailSenderPort } from '../../application/ports/email-sender.port.js';
import { ProjectConfig } from '../../pkg/config/config.js';

export class NodemailerAdapter implements EmailSenderPort {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ProjectConfig.HostMail,
        pass: ProjectConfig.HostPass,
      },
    });
  }

  async send(to: string, subject: string, html: string, palintext: string): Promise<void> {
    await this.transporter.sendMail({
      from: ProjectConfig.HostMail,
      to: to,
      subject: subject,
      text: palintext,
      html: html,
    });
  }
}
