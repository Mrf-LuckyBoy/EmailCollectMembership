import dotenv from 'dotenv';

dotenv.config();

export default interface Config {
  NodeENV: string;
  HostMail: string;
  HostPass: string;
  ImgLink: string;
  ChatIDTele: string;
  ChatBotTele: string;
  DomainTele: string;
  DBUrl: string;
}

export const ProjectConfig: Config = {
  NodeENV: process.env.NODE_ENV || '',
  HostMail: process.env.HOST_MAIL || '',
  HostPass: process.env.HOST_PASS || '',
  ImgLink: process.env.IMAGE_LINK || '',
  ChatIDTele: process.env.chat_id_tele || '',
  ChatBotTele: process.env.chat_bot_tele || '',
  DomainTele: process.env.domain_tele || '',
  DBUrl: process.env.DATABASE_URL || '',
};
