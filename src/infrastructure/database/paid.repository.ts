import type { PaidRepositoryPort } from "../../application/ports/paid-repository.port.js";
import type { PaidPayload } from "../../domain/paid.dto.js";
import type { LogPaid } from "../../domain/paid.model.js";
import { PrismaClient } from "../../pkg/generated/client.js";

export class PaidRepository implements PaidRepositoryPort {
  constructor(private readonly prisma: PrismaClient) { }

  async createPaidLog(data: PaidPayload): Promise<LogPaid> {

    const paidDate = new Date(data.paid_at);

    if (isNaN(paidDate.getTime())) {
      throw new Error('Invalid paid_at date')
    }

    return await this.prisma.logPaid.create({
      data: {
        paid_at: new Date(data.paid_at),
        resident: {
          connect: {
            id: data.resident_id
          }
        }
      }
    })
  }
}

