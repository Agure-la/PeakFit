import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FitnessSection from './components/FitnessSection'
import DietSection from './components/DietSection'
import RecoverySection from './components/RecoverySection'
import PackagesSection from './components/PackagesSection'
import InstructorsSection from './components/InstructorsSection'
import ReviewsSection from './components/ReviewsSection'
import WorkoutTracker from './components/WorkoutTracker'
import FitnessGoals from './components/FitnessGoals'
import ProgressTracker from './components/ProgressTracker'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { MessageCircle, ArrowUp, Dumbbell } from 'lucide-react'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      <main>
        <Hero />
        <FitnessSection />
        <DietSection />
        <RecoverySection />
        <PackagesSection />
        <InstructorsSection />
        <ReviewsSection />
        <WorkoutTracker />
        <FitnessGoals />
        <ProgressTracker />
        <ContactSection />
      </main>
      <Footer />

      <a
        href="https://wa.me/254712345678"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-110 transition-transform glow-orange animate-pulse-slow"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center shadow-xl shadow-brand-500/40 hover:scale-110 transition-all animate-fade-in"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  )
}

export default App
