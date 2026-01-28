import { PrismaClient } from '@prisma/client'

// 在开发环境中，每次热重载都会创建新的 PrismaClient 实例
// 为了避免"Too many connections"错误，我们使用全局变量缓存实例
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
