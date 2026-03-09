import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PaidRepositoryPort } from '../../ports/paid-repository.port.js';
import { AdminUsecase } from '../admin.usecase.js';
import type { LogPaid } from '../../../domain/paid.model.js';
import type { PaidPayload } from '../../../domain/paid.dto.js';
import type { EmailSenderPort } from '../../ports/email-sender.port.js';
import type { MailgenPort } from '../../ports/mailgen.port.js';
import type { ResidentRepositoryPort } from '../../ports/resident-repository.port.js';

describe('AdminUseCase', () => {
  let adminUseCase: AdminUsecase;
  const residentRepoMock: ResidentRepositoryPort = {
    getAllResident: vi.fn(),
    getAllResidentUnpaid: vi.fn(),
    getResidentByid: vi.fn(),
  };

  const mailgenMock: MailgenPort = {
    generateChangeEmail: vi.fn(),
    generateFollowUpEmail: vi.fn(),
  };

  const emailSenderMock: EmailSenderPort = {
    send: vi.fn(),
  };

  const paidRepoMock: PaidRepositoryPort = {
    createPaidLog: vi.fn(),
  };

  beforeEach(() => {
    adminUseCase = new AdminUsecase(paidRepoMock, mailgenMock, emailSenderMock, residentRepoMock);
  });

  describe('createLogPaid', () => {
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

  describe('createSendMailByResidentID', () => {
    it('case if not found resident', async () => {
      (residentRepoMock.getResidentByid as any).mockRejectedValue(new Error('Resident not found'));

      await expect(adminUseCase.createSendMailByResidentID('12345')).rejects.toThrow(
        'Resident not found'
      );
    });

    it('case success', async () => {
      (residentRepoMock.getResidentByid as any)
        .mockResolvedValue({
          residentFullName: 'John Doe',
          residentName: 'JD',
          residentMail: 'john@mail.com',
        });
      (mailgenMock.generateChangeEmail as any)
        .mockResolvedValue({
          sendTo: 'john@test.com',
          text: 'text content',
          html: '<p>html</p>',
        });
      (emailSenderMock.send as any).mockResolvedValue({
        sendTo: 'john@test.com',
        text: 'text content',
        html: '<p>html</p>',
      })

      const result = await adminUseCase.createSendMailByResidentID('12345');

      expect(result).toEqual({
        residentFullName: 'John Doe',
        residentName: 'JD',
        residentMail: 'john@mail.com',
      })

    });
  });
});
