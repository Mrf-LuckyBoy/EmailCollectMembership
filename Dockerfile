# --- STAGE 1: Build ---
FROM node:20-slim AS builder

# Install openssl for Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy configuration files
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY src ./src

# Generate Prisma Client and build TypeScript
RUN npx prisma generate
RUN npm run build

# --- STAGE 2: Runner ---
FROM node:20-slim AS runner

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy only the necessary files from the builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose the port Fastify is listening on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
