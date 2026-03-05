import { describe, it, expect, vi, beforeEach } from "vitest";
import type { FastifyReply, FastifyRequest } from "fastify";
import { AdminHandler } from "../admin.handler.js";
import { BaseResponse } from "../../domain/baseResponse.dto.js";
import type { LogPaid } from "../../domain/paid.model.js";
import type { PaidPayload } from "../../domain/paid.dto.js";


describe("AdminHandler", () => {
  let handler: AdminHandler;
  let mockUsecase: any;
  let mockReply: FastifyReply;

  beforeEach(() => {
    mockUsecase = {
      createLogPaid: vi.fn(),
    };

    handler = new AdminHandler(mockUsecase);

    mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;
  });

  it("should return 201 when create log paid success", async () => {
    const payload: PaidPayload = {
      resident_id: "res-1",
      paid_at: "2026-03-05",
    };

    const result: LogPaid = {
      id: "log-1",
      resident_id: "res-1",
      paid_at: new Date(payload.paid_at),
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockUsecase.createLogPaid.mockResolvedValue(result);

    const request = {
      body: payload,
    } as FastifyRequest<{ Body: typeof payload }>;

    await handler.createPaidLog(request, mockReply);

    expect(mockUsecase.createLogPaid).toHaveBeenCalledWith(payload);

    expect(mockReply.status).toHaveBeenCalledWith(201);

    expect(mockReply.send).toHaveBeenCalledWith(
      BaseResponse.success(result, "create log paid success")
    );
  });

  it("should return 500 when error occurs", async () => {
    const payload: PaidPayload = {
      resident_id: "res-1",
      paid_at: "2026-03-05",
    };

    mockUsecase.createLogPaid.mockRejectedValue(new Error("DB error"));

    const request = {
      body: payload,
    } as FastifyRequest<{ Body: typeof payload }>;

    await handler.createPaidLog(request, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(500);

    expect(mockReply.send).toHaveBeenCalledWith(
      BaseResponse.error("try again later", "DB error")
    );
  });

  it("should handle unknown error", async () => {
    const adminUsecase = {
      createLogPaid: vi.fn().mockRejectedValue('something bad'),
    };

    const handler = new AdminHandler(adminUsecase as any);

    const request = { body: {} } as any;

    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any;

    await handler.createPaidLog(request, reply);

    expect(reply.status).toHaveBeenCalledWith(500);

    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'try again later',
      })
    );
  })
});
