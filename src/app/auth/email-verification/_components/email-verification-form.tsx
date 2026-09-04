'use client'

import { useEffect, useEffectEvent, useState } from 'react'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import authClient from '@/lib/auth-client'

const COOLDOWN_SECONDS = 60
const COOLDOWN_STORAGE_KEY = 'verification_cooldown_timestamp'

const formSchema = z.object({
  otp: z.string().length(6, { message: 'Your code must be 6 digits.' }),
})

export function EmailVerificationForm() {
  const [loading, setLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(5)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  })

  useEffect(() => {
    if (isVerified && redirectCountdown > 0) {
      const timer = setTimeout(() => setRedirectCountdown((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isVerified && redirectCountdown === 0) {
      router.push('/feeds')
    }
  }, [isVerified, redirectCountdown, router])

  const handleEmail = useEffectEvent(async () => {
    const { data, error } = await authClient.getSession()
    if (data?.user?.email) {
      setEmail(data.user.email)
    } else {
      router.push('/auth/login')
    }
  })

  useEffect(() => {
    handleEmail()
  }, [])

  const handleCoolDown = useEffectEvent(() => {
    if (isVerified) return

    const cooldownEndTime = parseInt(localStorage.getItem(COOLDOWN_STORAGE_KEY) || '0')
    if (cooldownEndTime > Date.now()) {
      const remainingSeconds = Math.ceil((cooldownEndTime - Date.now()) / 1000)
      setCooldown(remainingSeconds)
      setIsSent(true)
    }

    return setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
  })

  useEffect(() => {
    const timer = handleCoolDown()
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isVerified])

  const handleSend = async () => {
    if (isSending) return
    setIsSending(true)

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: 'email-verification',
    })

    if (!error) {
      const cooldownEndTime = Date.now() + COOLDOWN_SECONDS * 1000
      localStorage.setItem(COOLDOWN_STORAGE_KEY, cooldownEndTime.toString())
      setCooldown(COOLDOWN_SECONDS)
      setIsSent(true)
    }
    setIsSending(false)
  }

  const handleResend = async () => {
    if (cooldown > 0 || isSending) return
    setIsSending(true)

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: 'email-verification',
    })

    if (!error) {
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
          setIsVerified(true)
        },
        onError: (error) => {
          form.setError('otp', { type: 'server', message: error.error.message })
          setLoading(false)
        },
      }
    )
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            {isSent
              ? 'Enter the 6-digit code sent to your email.'
              : email
              ? `An image verification OTP will be sent to ${email}.`
              : 'Please wait...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSent ? (
            <Button className="w-full" onClick={handleSend} disabled={isSending}>
              {isSending ? <Loader2 className="animate-spin" /> : 'Send Verification Code'}
            </Button>
          ) : (
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
          )}

          {isSent && (
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
          )}
        </CardContent>
      </Card>

      {isVerified && (
        <AlertDialog open={isVerified}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>You are now verified!</AlertDialogTitle>
              <AlertDialogDescription>
                Your email has been successfully verified. You can now access all features.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => router.push('/feeds')}>
                Continue to Feed ({redirectCountdown}s)
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
