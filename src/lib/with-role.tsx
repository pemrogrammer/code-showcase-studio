import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Role } from '@prisma/client'

/**
 *
 * Running on server !!!
 * Use this to protect your server component page, is the same as authz.ts but different
 */
export function withRole<P extends object>(Component: React.ComponentType<P>, allowed: Role[]) {
  const RoleProtectedPage = async (props: P) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      redirect('/auth/login')
    }

    if (!allowed.includes(session.user.role as Role)) {
      redirect('/unauthorized')
    }

    return <Component {...props} />
  }

  return RoleProtectedPage
}
