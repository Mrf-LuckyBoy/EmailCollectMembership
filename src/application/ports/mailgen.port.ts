import type { Resident } from '../../domain/resident.dto.js';

export interface MailgenPort {
  generateChangeEmail(data: Resident): {
    sendTo: string;
    text: string;
    html: string;
  };
}
