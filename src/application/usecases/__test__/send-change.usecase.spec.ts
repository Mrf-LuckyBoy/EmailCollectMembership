import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SendChargeEmail } from '../send-change.usecase.js';
import { TelegramAPI } from '../../../infrastructure/thirdparty/telegram.client.js';

vi.mock('../../../infrastructure/thirdparty/telegram.client', () => ({
  TelegramAPI: {
    sendMessage: vi.fn(),
  },
}));

describe('SendChargeEmail', () => {
  const residentRepoMock = {
    getAllResident: vi.fn(),
  };

  const mailgenMock = {
    generateChangeEmail: vi.fn(),
  };

  const emailSenderMock = {
    send: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send email and telegram message for each user', async () => {
    residentRepoMock.getAllResident.mockResolvedValue([
      {
        residentFullName: 'John Doe',
        residentName: 'JD',
        residentMail: 'john@test.com',
      },
    ]);

    mailgenMock.generateChangeEmail.mockReturnValue({
      sendTo: 'john@test.com',
      text: 'text content',
      html: '<p>html</p>',
    });

    const usecase = new SendChargeEmail(
      residentRepoMock,
      mailgenMock,
      emailSenderMock
    );

    await usecase.execute();

    expect(residentRepoMock.getAllResident).toHaveBeenCalledTimes(1);
    expect(mailgenMock.generateChangeEmail).toHaveBeenCalledTimes(1);
    expect(emailSenderMock.send).toHaveBeenCalledTimes(1);
    expect(TelegramAPI.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('should not send anything when no users found', async () => {
    residentRepoMock.getAllResident.mockResolvedValue([]);

    const usecase = new SendChargeEmail(
      residentRepoMock,
      mailgenMock,
      emailSenderMock
    );

    await usecase.execute();

    expect(mailgenMock.generateChangeEmail).not.toHaveBeenCalled();
    expect(emailSenderMock.send).not.toHaveBeenCalled();
    expect(TelegramAPI.sendMessage).not.toHaveBeenCalled();
  });
});
