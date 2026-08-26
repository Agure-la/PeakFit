import { useState, useEffect } from 'react'
import { Menu, X, Dumbbell, Phone } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Fitness', href: '#fitness' },
    { name: 'Diet', href: '#diet' },
    { name: 'Recovery', href: '#recovery' },
    { name: 'Packages', href: '#packages' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center glow-orange">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="font-display text-2xl tracking-wider text-white">NO LIMIT</span>
              <span className="block text-xs text-brand-400 tracking-widest -mt-1">GYM</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-brand-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/254712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-brand text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-brand-500/30 transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              Join Now
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white rounded-lg hover:bg-dark-700 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-dark-900/98 backdrop-blur-lg border-t border-dark-600 animate-fade-in">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-brand-400 hover:bg-dark-800 rounded-lg transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/254712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full mt-4 px-5 py-3 bg-gradient-brand text-white rounded-full font-semibold"
            >
              <Phone className="w-4 h-4" />
              Join Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
