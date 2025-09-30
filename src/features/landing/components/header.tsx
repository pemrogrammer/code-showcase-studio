'use client'

import { Button } from '@/components/ui/button'
import { Code, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [bgColor, setBgColor] = useState('bg-transparent') // Initial background color

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setBgColor('backdrop-blur-sm bg-background/60')
    } else {
      setBgColor('bg-transparent')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-500 ${bgColor}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 glow-purple">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Code Showcase Studio</h1>
              <p className="text-xs text-muted-foreground">KPTI Project Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Fitur
            </a>
            <a
              href="#timeline"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Timeline
            </a>
            <a
              href="#leaderboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Leaderboard
            </a>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Masuk
              </Button>
            </Link>

            <Link href="/auth/register">
              <Button size="sm" className="glow-purple">
                Daftar
              </Button>
            </Link>
          </nav>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
