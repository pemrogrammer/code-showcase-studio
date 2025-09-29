'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import authClient from '@/lib/auth-client'

// --- Configuration Constants ---
const COOLDOWN_SECONDS = 60
const COOLDOWN_STORAGE_KEY = 'verification_cooldown_timestamp'
const EMAIL_STORAGE_KEY = 'email_for_verification'

// --- Zod Schema for the Form ---
const formSchema = z.object({
  otp: z.string().length(6, { message: 'Your code must be 6 digits.' }),
})

export default function EmailVerificationPage() {
  const [loading, setLoading] = useState(false) // For the main OTP submission
  const [isSending, setIsSending] = useState(false) // For the "Resend" button
  const [cooldown, setCooldown] = useState(0)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  })

  useEffect(() => {
    const storedEmail = sessionStorage.getItem(EMAIL_STORAGE_KEY)
    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      router.push('/auth/login')
    }
  }, [])

  // --- Cooldown Logic ---
  useEffect(() => {
    // On initial page load, check if a cooldown is already active in localStorage
    const cooldownEndTime = parseInt(localStorage.getItem(COOLDOWN_STORAGE_KEY) || '0')
    if (cooldownEndTime > Date.now()) {
      const remainingSeconds = Math.ceil((cooldownEndTime - Date.now()) / 1000)
      setCooldown(remainingSeconds)
    }

    // Set up an interval to tick down the cooldown every second
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer)
  }, [])

  // --- Handlers ---
  const handleResend = async () => {
    if (cooldown > 0 || isSending) return
    setIsSending(true)

    // The backend knows who the user is from their secure session cookie.
    // We do NOT need to send the email address from the client.
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: 'email-verification',
    })

    if (!error) {
      // On success, set the cooldown timestamp in localStorage for persistence
      const cooldownEndTime = Date.now() + COOLDOWN_SECONDS * 1000
      localStorage.setItem(COOLDOWN_STORAGE_KEY, cooldownEndTime.toString())
      setCooldown(COOLDOWN_SECONDS)
    }
    setIsSending(false)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    await authClient.emailOtp.verifyEmail(
      { email: email, otp: values.otp },
      {
        onSuccess: async () => {
          localStorage.removeItem(COOLDOWN_STORAGE_KEY)
          sessionStorage.removeItem(EMAIL_STORAGE_KEY)

          router.push('/feeds')
        },
        onError: (error) => {
          form.setError('otp', { type: 'server', message: error.error.message })
          setLoading(false)
        },
      }
    )
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            {email ? `We've sent a code to ${email}.` : 'Please wait...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="6-digit code"
                        className="text-center text-lg tracking-widest"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Verify Account'}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <span>Didn&apos;t receive the code?</span>
            <Button
              variant="link"
              className="px-1 font-semibold"
              disabled={cooldown > 0 || isSending}
              onClick={handleResend}
            >
              {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Click to resend'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
