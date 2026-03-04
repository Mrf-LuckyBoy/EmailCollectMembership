import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ResidentRepository } from '../resident.repository.js';
import type { PrismaClient } from '../../../pkg/generated/client.js';

describe('ResidentRepository', () => {
  let prismaMock: Partial<PrismaClient>;
  let repository: ResidentRepository;

  beforeEach(() => {
    prismaMock = {
      resident: {
        findMany: vi.fn(),
      },
    } as any;

    repository = new ResidentRepository(prismaMock as PrismaClient);
  });

  describe('getAllResident', () => {
    it('should map resident correctly', async () => {
      const mockResidents = [
        {
          f_name: 'John',
          l_name: 'Doe',
          n_name: 'JD',
          email: 'john@test.com',
        },
      ];

      (prismaMock.resident!.findMany as any).mockResolvedValue(mockResidents);

      const result = await repository.getAllResident();

      expect(result).toEqual([
        {
          residentFullName: 'John Doe',
          residentName: 'JD',
          residentMail: 'john@test.com',
        },
      ]);
    });

    it('should map resident when n_name is null', async () => {
      (prismaMock.resident!.findMany as any).mockResolvedValue([
        {
          f_name: 'Jane',
          l_name: 'Smith',
          n_name: null,
          email: 'jane@test.com',
        },
      ]);

      const result = await repository.getAllResident();

      expect(result).toEqual([
        {
          residentFullName: 'Jane Smith',
          residentName: '', // branch 2
          residentMail: 'jane@test.com',
        },
      ]);
    });

    it('should return empty array when no residents', async () => {
      (prismaMock.resident!.findMany as any).mockResolvedValue([]);

      const result = await repository.getAllResident();

      expect(result).toEqual([]);
    });

  })

  describe('getAllResidentUnpaid', () => {

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-03-15T10:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    })

    it('should call prisma with correct date range', async () => {
      (prismaMock.resident!.findMany as any).mockResolvedValue([]);

      await repository.getAllResidentUnpaid();

      expect(prismaMock.resident!.findMany).toHaveBeenCalledWith({
        where: {
          logpaid: {
            none: {
              paid_at: {
                gte: new Date(2026, 2, 1), // March
                lt: new Date(2026, 3, 1),  // April
              },
            },
          },
        },
      });
    });

    it('should map unpaid residents correctly', async () => {
      (prismaMock.resident!.findMany as any).mockResolvedValue([
        {
          f_name: 'John',
          l_name: 'Doe',
          n_name: 'JD',
          email: 'john@test.com',
        },
      ]);

      const result = await repository.getAllResidentUnpaid();

      expect(result).toEqual([
        {
          residentFullName: 'John Doe',
          residentName: 'JD',
          residentMail: 'john@test.com',
        },
      ]);
    });

    it('should map resident when n_name is null', async () => {
      (prismaMock.resident!.findMany as any).mockResolvedValue([
        {
          f_name: 'Jane',
          l_name: 'Smith',
          n_name: null,
          email: 'jane@test.com',
        },
      ]);

      const result = await repository.getAllResidentUnpaid();

      expect(result).toEqual([
        {
          residentFullName: 'Jane Smith',
          residentName: '', // branch 2
          residentMail: 'jane@test.com',
        },
      ]);
    });

    it('should return empty array when all resident already paid', async () => {
      (prismaMock.resident!.findMany as any).mockResolvedValue([]);

      const result = await repository.getAllResidentUnpaid();

      expect(result).toEqual([]);
    })
  })
});
