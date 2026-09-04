import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { LoginForm } from './_components/login-form'
import { headers } from 'next/headers'

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    redirect('/feeds')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <LoginForm />
    </div>
  )
}
