import { EmailTemplate } from '@/components/ui/email-template'
import prisma from '@/../prisma/prisma'
import { Resend } from 'resend'

type SendEmailProps = {
  to: string
  subject: string
  text: string
  html?: string
}

export default async function sendEmail({ to, subject, text }: SendEmailProps) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: 'Code Showcase Studio <onboarding@resend.dev>',
    to: [to],
    subject: subject,
    react: EmailTemplate({
      firstName:
        (
          await prisma.user.findUnique({
            where: { email: to },
          })
        )?.name || '',
      text,
    }),
  })

  return { data, error }
}
