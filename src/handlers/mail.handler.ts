import type { FastifyReply, FastifyRequest } from "fastify";
import type { SendEmail } from "../application/usecases/send-mail.usecase.js";
import { BaseResponse } from "../domain/baseResponse.dto.js";

export class ManaulHandler {
  constructor(private sendMailUsecase: SendEmail) { }

  async manaulChargeMail(request: FastifyRequest, reply: FastifyReply) {
    try {
      await this.sendMailUsecase.execute()
      return reply.status(201).send(BaseResponse.success(null, 'create log paid success'));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      return reply.status(500).send(BaseResponse.error('try again later', message))
    }
  }
}
