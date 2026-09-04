'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Code, Menu, X, LogOut, Rss, ChevronDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogoutAlert } from '@/app/auth/logout/_components/logout-alert'
import authClient from '@/lib/auth-client'

export default function Header() {
  const [bgColor, setBgColor] = useState('bg-transparent')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false)

  const { data: session, isPending } = authClient.useSession()

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-500 ${bgColor}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 glow-purple">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Code Showcase Studio</h1>
              <p className="text-xs text-muted-foreground">KPTI Project Platform</p>
            </div>
          </Link>

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

            {isPending ? (
              <div className="flex items-center gap-2 border-l border-border pl-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : session?.user ? (
              <div className="relative border-l border-border pl-4" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted/50 transition-colors focus:outline-none"
                >
                  <Avatar className="h-8 w-8 border border-primary/30">
                    <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                    <AvatarFallback className="text-xs font-semibold bg-primary/20 text-primary">
                      {session.user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-background/95 backdrop-blur-md border border-border shadow-xl py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-border/60">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/feeds"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                      >
                        <Rss className="h-4 w-4 text-primary" />
                        <span>Feeds</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false)
                          setIsLogoutAlertOpen(true)
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </nav>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-border mt-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Fitur
            </a>
            <a
              href="#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Timeline
            </a>
            <a
              href="#leaderboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Leaderboard
            </a>

            {session?.user ? (
              <div className="flex flex-col gap-3 pt-2 border-t border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-primary/30">
                    <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                    <AvatarFallback className="text-xs font-semibold bg-primary/20 text-primary">
                      {session.user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{session.user.name}</span>
                    <span className="text-xs text-muted-foreground">{session.user.email}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-1">
                  <Link href="/feeds" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-1.5">
                      <Rss className="h-4 w-4 text-primary" />
                      Feeds
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setIsLogoutAlertOpen(true)
                    }}
                    className="text-destructive hover:bg-destructive/10 gap-1.5"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Masuk
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full glow-purple">
                    Daftar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {isLogoutAlertOpen && (
          <LogoutAlert isOpen={isLogoutAlertOpen} onOpenChange={setIsLogoutAlertOpen} />
        )}
      </div>
    </header>
  )
}
