import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PaidRepositoryPort } from '../../ports/paid-repository.port.js';
import { AdminUsecase } from '../admin.usecase.js';
import type { LogPaid } from '../../../domain/paid.model.js';
import type { PaidPayload } from '../../../domain/paid.dto.js';

describe('AdminUseCase', () => {
  let paidRepoMock: PaidRepositoryPort;
  let adminUseCase: AdminUsecase;

  beforeEach(() => {
    paidRepoMock = {
      createPaidLog: vi.fn(),
    } as unknown as PaidRepositoryPort;

    adminUseCase = new AdminUsecase(paidRepoMock);
  });

  it('should create paid log', async () => {
    const payload: PaidPayload = {
      resident_id: 'res-1',
      paid_at: '2026-03-05',
    };

    const expected: LogPaid = {
      id: 'log-1',
      resident_id: 'res-1',
      paid_at: new Date(payload.paid_at),
      created_at: new Date(),
      updated_at: new Date(),
    };

    (paidRepoMock.createPaidLog as any).mockResolvedValue(expected);

    const result = await adminUseCase.createLogPaid(payload);

    expect(paidRepoMock.createPaidLog).toHaveBeenCalledWith(payload);
    expect(result).toEqual(expected);
  });
});
