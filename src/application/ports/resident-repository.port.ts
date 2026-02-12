import type { Resident } from '../../domain/resident.dto.js';

export interface ResidentRepositoryPort {
  getAllResident(): Promise<Resident[]>;
}
