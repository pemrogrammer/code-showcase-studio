import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Bergabung Sekarang</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
            Siap untuk <span className="text-primary text-glow">showcase</span> project terbaikmu?
          </h2>

          <p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan komunitas developer Klub Pemrograman TI POLNES dan mulai memamerkan
            karya-karya terbaikmu. Dapatkan feedback, networking, dan kesempatan karir yang lebih
            baik.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="glow-purple group">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* <div className="mt-8 text-sm text-muted-foreground">
            <p>Gratis untuk semua mahasiswa POLNES • Tidak ada biaya tersembunyi</p>
          </div> */}
        </div>
      </div>
    </section>
  )
}
