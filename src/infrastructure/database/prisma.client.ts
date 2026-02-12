import { PrismaClient } from '../../pkg/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { ProjectConfig } from '../../pkg/config/config.js';

const adapter = new PrismaPg({
  connectionString: ProjectConfig.DBUrl,
});

export const prisma = new PrismaClient({ adapter });
