import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
export { metadata } from './metadata'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable}`}>{children}</body>
    </html>
  )
}
