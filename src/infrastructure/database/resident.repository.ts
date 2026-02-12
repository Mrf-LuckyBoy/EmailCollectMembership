import type { ResidentRepositoryPort } from '../../application/ports/resident-repository.port.js';
import type { Resident } from '../../domain/resident.dto.js';
import { PrismaClient } from '../../pkg/generated/client.js';

export class ResidentRepository implements ResidentRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllResident(): Promise<Resident[]> {
    const resident = await this.prisma.resident.findMany({
      select: {
        f_name: true,
        l_name: true,
        n_name: true,
        email: true,
      },
    });

    const result = resident.map(r => ({
      residentFullName: `${r.f_name} ${r.l_name}`,
      residentName: r.n_name ?? '',
      residentMail: r.email,
    }));

    return result;
  }
}
