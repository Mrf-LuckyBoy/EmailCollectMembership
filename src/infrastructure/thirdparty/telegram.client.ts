import { ProjectConfig } from '../../pkg/config/config.js';
import { createHttpClient } from '../../pkg/http/axios.factory.js';

const telegramClient = createHttpClient({
  baseURL: `${ProjectConfig.DomainTele}/bot${ProjectConfig.ChatBotTele}`,
});

export const TelegramAPI = {
  async sendMessage(text: string) {
    return telegramClient.post('/sendMessage', {
      chat_id: ProjectConfig.ChatIDTele,
      text,
    });
  },
};
