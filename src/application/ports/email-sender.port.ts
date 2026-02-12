export interface EmailSenderPort {
  send(to: string, subject: string, html: string, palintext: string): Promise<void>;
}
