import type { PaidRepositoryPort } from '../ports/paid-repository.port.js';
import type { PaidPayload } from '../../domain/paid.dto.js';
import type { LogPaid } from '../../domain/paid.model.js';

export class AdminUsecase {
  constructor(private PaidRepo: PaidRepositoryPort) {}

  async createLogPaid(input: PaidPayload): Promise<LogPaid> {
    const result = await this.PaidRepo.createPaidLog(input);
    return result;
  }
}
