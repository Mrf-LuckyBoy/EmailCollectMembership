import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResidentRepository } from '../resident.repository.js';
import type { PrismaClient } from '../../../pkg/generated/client.js';

describe
  ('ResidentRepository', () => {
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

  });
