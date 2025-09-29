type SendEmailProps = {
  to: string
  subject: string
  text: string
  html?: string
}

export default async function sendEmail({ to, subject, text, html }: SendEmailProps) {
  // TODO: Replace with Mailgun or other email service
  // For now, we'll just log the email content to the console
  console.log('--- Sending Email (Dummy) ---')
  console.log(`To: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Text: ${text}`)
  if (html) {
    console.log(`HTML: ${html}`)
  }
  console.log('-----------------------------')

  // If you want to use Resend as a fallback or for development
  // await resend.emails.send({
  //   from: process.env.EMAIL_FROM!,
  //   to,
  //   subject,
  //   text,
  //   html,
  // })
}
