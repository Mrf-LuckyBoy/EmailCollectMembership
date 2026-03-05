import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaidRepository } from '../paid.repository.js';
import type { PrismaClient } from '../../../pkg/generated/client.js';
import type { PaidPayload } from '../../../domain/paid.dto.js';

describe('PaidRepository', () => {
  let prismaMock: Partial<PrismaClient>;
  let repository: PaidRepository;

  beforeEach(() => {
    prismaMock = {
      logPaid: {
        create: vi.fn().mockResolvedValue(undefined),
      },
    } as any;

    repository = new PaidRepository(prismaMock as PrismaClient);
  });

  it('should call prisma.logPaid.create with correct data', async () => {
    const payload: PaidPayload = {
      resident_id: 'thisismockresidentid',
      paid_at: '2026-03-01',
    };

    await repository.createPaidLog(payload);

    expect(prismaMock.logPaid?.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.logPaid?.create).toHaveBeenCalledWith({
      data: {
        paid_at: new Date(payload.paid_at),
        resident: {
          connect: {
            id: payload.resident_id,
          },
        },
      },
    });
  });

  it('if invalid paid_at', async () => {
    const payload: PaidPayload = {
      resident_id: 'thisismockresidentid',
      paid_at: '',
    };
    await expect(repository.createPaidLog(payload)).rejects.toThrow('Invalid paid_at date');
  });
});
