import { Dumbbell, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, ChevronRight, Heart } from 'lucide-react'

const Footer = () => {
  const sections = [
    {
      title: 'Programs',
      links: [
        { name: 'Strength Training', href: '#fitness' },
        { name: 'Cardio & HIIT', href: '#fitness' },
        { name: 'Diet & Nutrition', href: '#diet' },
        { name: 'Recovery & Sauna', href: '#recovery' },
        { name: 'Boxing & MMA', href: '#fitness' },
      ],
    },
    {
      title: 'Fitness Tracker',
      links: [
        { name: '💪 Workout Tracker', href: '#workouts' },
        { name: '🎯 Fitness Goals', href: '#goals' },
        { name: '📈 Progress Monitor', href: '#progress' },
        { name: 'Send Report to Trainer', href: '#progress' },
        { name: 'Export to WhatsApp', href: '#progress' },
      ],
    },
    {
      title: 'Membership',
      links: [
        { name: 'Starter Plan', href: '#packages' },
        { name: 'Pro Plan (Popular)', href: '#packages' },
        { name: 'Elite Plan', href: '#packages' },
        { name: 'Personal Training', href: '#packages' },
        { name: 'Student Discount', href: '#contact' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#home' },
        { name: 'Our Trainers', href: '#trainers' },
        { name: 'Member Reviews', href: '#reviews' },
        { name: 'FAQs', href: '#contact' },
        { name: 'Contact Us', href: '#contact' },
      ],
    },
  ]

  const socials = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Twitter, href: '#', label: 'Twitter/X', color: 'hover:bg-sky-500' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-700 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-4 xl:col-span-3">
            <a href="#home" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center glow-orange">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-display text-2xl tracking-wider text-white">NO LIMIT</span>
                <span className="block text-xs text-brand-400 tracking-widest -mt-1">GYM</span>
              </div>
            </a>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Nairobi's #1 fitness destination in Kismenti, Harambee Estate.
              World-class equipment, expert trainers, and a community that pushes you to go beyond your limits.
              Your transformation starts here.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">Kismenti, Harambee Estate</div>
                  <div className="text-sm text-gray-400">Near TJU Garage, Nairobi, Kenya</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                  +254 712 345 678 <span className="text-brand-400">(WhatsApp)</span>
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@nolimitgym.co.ke" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
                  info@nolimitgym.co.ke
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <span className="text-brand-400 font-semibold">24/7</span> Gym Access for Members
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-xl bg-dark-700 flex items-center justify-center text-gray-400 hover:text-white transition-all ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {sections.map((section, i) => (
              <div key={i}>
                <h4 className="text-white font-bold mb-5 tracking-wide text-sm">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-xs text-gray-400 hover:text-brand-400 transition-colors"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-400 flex-shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-12 xl:col-span-2">
            <h4 className="text-white font-bold mb-5 tracking-wide">Quick Actions</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/254712345678?text=Hi%2C%20I%20want%20a%20FREE%201-day%20trial%20at%20No%20Limit%20Gym%21"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-green-500/30 transition-all"
              >
                🎁 Free 1-Day Trial
              </a>
              <a
                href="#packages"
                className="block w-full text-center px-5 py-3 bg-gradient-brand text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-brand-500/30 transition-all"
              >
                💪 View Membership Plans
              </a>
              <a
                href="https://wa.me/254712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-semibold text-sm transition-all"
              >
                💬 Chat With Us
              </a>
              <a
                href="https://maps.google.com/?q=Kismenti+Harambee+Estate+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-semibold text-sm transition-all"
              >
                📍 Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-10 border border-brand-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Ready to unlock your full potential?</h3>
            <p className="text-sm text-gray-400">Join No Limit Gym today — your first consultation is free.</p>
          </div>
          <a
            href="https://wa.me/254712345678?text=Hi%20No%20Limit%20Gym%2C%20I%27m%20ready%20to%20join%21"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white rounded-full font-bold hover:shadow-2xl hover:shadow-brand-500/40 transition-all hover:scale-105 whitespace-nowrap glow-orange"
          >
            Join Today
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        <div className="border-t border-dark-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            © {new Date().getFullYear()} No Limit Gym, Nairobi. Made with
            <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
            in Kenya. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
