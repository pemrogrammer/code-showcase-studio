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
    <div className="w-screen h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
