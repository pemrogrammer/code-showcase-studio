import { Code, Github, Youtube } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Code Showcase Studio</h3>
                <p className="text-sm text-muted-foreground">KPTI Project Platform</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Platform untuk memamerkan project Anda. Bergabunglah dengan komunitas Klub Pemrograman
              TI POLNES.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link
                href="https://github.com/pemrogrammer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>

              <Link
                href="https://www.youtube.com/@pemrogrammer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Timeline
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dokumentasi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Dukungan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Bantuan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kontak
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kebijakan
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Code Showcase Studio. Dibuat dengan ❤️ oleh Klub Pemrograman TI POLNES.
          </p>
        </div>
      </div>
    </footer>
  )
}
