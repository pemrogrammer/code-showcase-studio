'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { RegisterForm } from './_components/register-form'

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Register</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <RegisterForm />
        <CardFooter>
          <div className="flex justify-center w-full border-t py-4">
            <Link
              href="/auth/login"
              className="text-xs text-neutral-500 hover:text-primary transition-colors"
            >
              Sudah punya akun? <span className="underline">Masuk di sini.</span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

