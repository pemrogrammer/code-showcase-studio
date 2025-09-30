import * as React from 'react'

interface EmailTemplateProps {
  firstName: string
  text: string
}

export function EmailTemplate({ firstName, text }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>{text}</p>
    </div>
  )
}
