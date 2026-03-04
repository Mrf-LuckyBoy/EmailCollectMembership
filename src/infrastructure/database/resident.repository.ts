import type { ResidentRepositoryPort } from '../../application/ports/resident-repository.port.js';
import type { Resident } from '../../domain/resident.dto.js';
import { PrismaClient } from '../../pkg/generated/client.js';

export class ResidentRepository implements ResidentRepositoryPort {
  constructor(private readonly prisma: PrismaClient) { }

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

  async getAllResidentUnpaid(): Promise<Resident[]> {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    const unpaidResidents = await this.prisma.resident.findMany({
      where: {
        logpaid: {
          none: {
            paid_at: {
              gte: startOfMonth,
              lt: endOfMonth,
            },
          },
        },
      },
    })

    const result = unpaidResidents.map(r => ({
      residentFullName: `${r.f_name} ${r.l_name}`,
      residentName: r.n_name ?? '',
      residentMail: r.email,
    }))

    return result
  }
}
