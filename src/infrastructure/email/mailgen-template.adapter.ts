import Mailgen from 'mailgen';
import type { MailgenPort } from '../../application/ports/mailgen.port.js';
import type { Resident } from '../../domain/resident.dto.js';
import { ProjectConfig } from '../../pkg/config/config.js';

export class MailgenTemplateAdapter implements MailgenPort {
  private mailgen: Mailgen;

  constructor() {
    this.mailgen = new Mailgen({
      theme: 'cerberus',
      product: {
        name: 'Family Plan',
        link: 'https://github.com/Mrf-LuckyBoy/EmailCollectMembership#',
      },
    });
  }

  generateChangeEmail(data: Resident): { sendTo: string; text: string; html: string } {
    const email = {
      body: {
        name: data.residentFullName,
        intro: `${data.residentName} ได้เวลาจ่ายเงินครอบครัวแล้ววว`,
        action: {
          instructions: 'จ่ายเงินได้ที่ QR นี้ได้เลย',
          button: {
            color: '#22BC66',
            text: 'กดเพื่อดู QR',
            link: ProjectConfig.ImgLink,
          },
        },
        outro:
          'ถ้าโอนแล้วส่งสลิปใน line ด้วยนะเดี๋ยวถ้ายังไม่ได้ส่งเดี๋ยวเมล์มันจะเข้าวันที่ 6 อีกทีนึง',
      },
    };

    return {
      sendTo: data.residentMail,
      text: this.mailgen.generatePlaintext(email),
      html: this.mailgen.generate(email),
    };
  }
}
