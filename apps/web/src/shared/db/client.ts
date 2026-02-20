import { PrismaClient } from '@prisma/client'

/**
 * Singleton Prisma Client for Next.js
 * 
 * In development, we reuse the Prisma instance across hot reloads
 * In production, a single PrismaClient instance is used
 */

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/**
 * Connection pooling settings for serverless (Neon)
 * 
 * For Neon with serverless, the connection string should include:
 * ?schema=public&connection_limit=1
 * 
 * This prevents connection pool exhaustion in serverless environments
 */

export default prisma
