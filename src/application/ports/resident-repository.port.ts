import type { Resident } from '../../domain/resident.dto.js';

export interface ResidentRepositoryPort {
  getAllResident(): Promise<Resident[]>;
  getAllResidentUnpaid(): Promise<Resident[]>;
  getResidentByid(residentID: string): Promise<Resident>;
}
