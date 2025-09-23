import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="py-20 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Platform Showcase Terdepan</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
            Platform untuk <span className="text-primary text-glow">memamerkan project</span>.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan komunitas Klub Pemrograman TI POLNES. Showcase project terbaikmu,
            dapatkan feedback, dan bersaing di leaderboard bulanan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="glow-purple group">
              Mulai Showcase
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            {/* <Button variant="outline" size="lg" className="group bg-transparent">
              <Play className="mr-2 h-4 w-4" />
              Lihat Demo
            </Button> */}
          </div>

          {/* <div className="mt-12 text-sm text-muted-foreground">
            <p>
              Dipercaya oleh <span className="text-primary font-semibold">500+</span> mahasiswa
              POLNES
            </p>
          </div> */}
        </div>
      </div>
    </section>
  )
}
