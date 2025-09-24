'use server'

import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import prisma from '../prisma'

export async function seedUsers() {
  const userId = nanoid()

  const hashedPassword = await bcrypt.hash(
      (process.env.DEFAULT_PASSWORD as string) || 'Password1',
      10
    )

  await prisma.user.upsert({
    where: { email: 'hello@codeshowcase.dev' },
    update: {}, // kalau sudah ada, tidak perlu update
    create: {
      id: userId,
      name: 'Super Admin',
      email: 'hello@codeshowcase.dev',
      image: process.env.DEFAULT_USER_IMAGE,
      emailVerified: true,
      role: 'MODERATOR',
      accounts: {
        create: [
          {
            accountId: userId,
            provider: 'email-password',
            providerAccountId: userId,
            providerId: 'credential',
            password: hashedPassword,
          },
        ],
      },
    },
  })
}
