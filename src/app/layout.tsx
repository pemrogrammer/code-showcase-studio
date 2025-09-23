import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Code Showcase Studio - Platform Project Mahasiswa POLNES',
  description:
    'Platform untuk memamerkan project-project dari mahasiswa Politeknik Negeri Samarinda',
  authors: [
    {
      name: 'Klub Pemrograman TI POLNES',
      url: 'https://github.com/pemrogrammer',
    },
  ],
}

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
