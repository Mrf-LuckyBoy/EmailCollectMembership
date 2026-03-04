import type { PaidPayload } from "../../domain/paid.dto.js";
import type { LogPaid } from "../../domain/paid.model.js";

export interface PaidRepositoryPort {
  createPaidLog(data: PaidPayload): Promise<LogPaid>
}
