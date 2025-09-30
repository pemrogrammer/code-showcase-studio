import { LogoutAlert } from '@/app/auth/logout/_components/logout-alert'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LogoutPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LogoutAlert />
    </div>
  )
}
