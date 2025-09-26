'use server'

import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Role } from '@prisma/client'
import { auth } from '@/lib/auth'

/**
 * Running on server !!!
 * Use this to protect your api route or server action with roles based
 */
export async function requireAuth(options?: { roles?: Role[] }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return {
      error: NextResponse.json(
        {
          status: 'failed',
          message: 'Unauthorized: Login required',
        },
        { status: 401 }
      ),
    }
  }

  if (options?.roles && !options.roles.includes(session.user.role as Role)) {
    return {
      error: NextResponse.json(
        {
          status: 'failed',
          message: 'Forbidden: Insufficient role',
        },
        { status: 403 }
      ),
    }
  }

  return { session }
}
