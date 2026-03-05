import type { FastifyReply, FastifyRequest } from 'fastify';
import type { PaidPayload } from '../domain/paid.dto.js';
import { AdminUsecase } from '../application/usecases/admin.usecase.js';
import { BaseResponse } from '../domain/baseResponse.dto.js';
import type { LogPaid } from '../domain/paid.model.js';

export class AdminHandler {
  constructor(private adminUseCase: AdminUsecase) {}

  async createPaidLog(request: FastifyRequest<{ Body: PaidPayload }>, reply: FastifyReply) {
    try {
      const result: LogPaid = await this.adminUseCase.createLogPaid(request.body);
      return reply.status(201).send(BaseResponse.success(result, 'create log paid success'));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      return reply.status(500).send(BaseResponse.error('try again later', message));
    }
  }
}
