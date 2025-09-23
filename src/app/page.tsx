import CTASection from '@/features/landing/components/cta-section'
import Footer from '@/features/landing/components/footer'
import Header from '@/features/landing/components/header'
import HeroSection from '@/features/landing/components/hero-section'
import LeaderboardSection from '@/features/landing/components/leaderboard-section'
import TimelineSection from '@/features/landing/components/timeline-section'
// import { StatsSection } from '@/components/stats-section'
// import { FeaturesSection } from '@/components/features-section'

export default function HomePage() {
  return (
    <div className="min-h-screen grid-pattern">
      <Header />

      <main>
        <HeroSection />
        {/* <StatsSection />  */}
        {/* <FeaturesSection /> */}
        <TimelineSection />
        <LeaderboardSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
