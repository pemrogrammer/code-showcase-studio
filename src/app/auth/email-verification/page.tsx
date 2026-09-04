import { EmailVerificationForm } from './_components/email-verification-form'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function EmailVerificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user.emailVerified) {
    redirect('/feeds')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted">
      <EmailVerificationForm />
    </div>
  )
}
