'use server'

import { auth } from '@/lib/auth'
import prisma from '../prisma'

export async function seedUsers() {
  const email = 'hello@codeshowcase.dev'

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log('🌱 Super Admin user already exists, skipping creation.')
    return
  }

  const res = await auth.api.createUser({
    body: {
      email,
      password: (process.env.DEFAULT_PASSWORD as string) || 'Password1',
      name: 'Super Admin',
      role: 'MODERATOR',
      data: {
        username: 'superadmin',
        displayUsername: 'Super Admin',
        image: process.env.DEFAULT_USER_IMAGE,
      },
    },
  })

  if (res?.user?.id) {
    await prisma.user.update({
      where: { id: res.user.id },
      data: {
        emailVerified: true,
      },
    })
    console.log('✅ Super Admin created via auth.api.createUser.')
  }
}

