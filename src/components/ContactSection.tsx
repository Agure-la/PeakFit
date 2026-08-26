import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Calendar, User, ChevronRight } from 'lucide-react'

const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      primary: 'Kismenti, Harambee Estate',
      secondary: 'Near TJU Garage, Nairobi, Kenya',
      link: 'https://maps.google.com/?q=Kismenti+Harambee+Estate+Nairobi',
      linkText: 'Get Directions →',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Phone,
      title: 'WhatsApp / Call',
      primary: '+254 712 345 678',
      secondary: 'Mon-Sun: 5am — 11pm for support',
      link: 'https://wa.me/254712345678',
      linkText: 'Chat on WhatsApp →',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'info@nolimitgym.co.ke',
      secondary: 'We reply within 2 hours on weekdays',
      link: 'mailto:info@nolimitgym.co.ke?subject=Gym%20Enquiry',
      linkText: 'Send Email →',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      primary: '24/7 Gym Access',
      secondary: 'Staffed: Mon-Sat 5am-10pm, Sun 6am-8pm',
      link: '#packages',
      linkText: 'View Plans →',
      color: 'from-purple-500 to-violet-500',
    },
  ]

  const faqs = [
    {
      q: 'Do you offer student discounts?',
      a: 'Yes! We offer 15% off all monthly memberships with a valid student ID. Contact us via WhatsApp to claim your discount.',
    },
    {
      q: 'Can I visit as a guest before joining?',
      a: 'Absolutely! We offer a FREE 1-day trial pass for first-time visitors. Just message us on WhatsApp to book your trial day.',
    },
    {
      q: 'Is there parking available?',
      a: 'Yes! We have secure, free on-site parking for 50+ vehicles plus bike racks. CCTV monitored 24/7.',
    },
    {
      q: 'Do I need to bring my own equipment?',
      a: 'No, we provide everything including mats, towels, water fountain. Just bring your workout clothes, shoes, and a water bottle!',
    },
    {
      q: 'What if I\'m a complete beginner?',
      a: 'Perfect! Most of our members start as beginners. We provide a FREE orientation session, personalized starter workout, and trainers are always on the floor to help.',
    },
  ]

  return (
    <section id="contact" className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            LET'S <span className="bg-gradient-to-r from-green-400 to-brand-500 bg-clip-text text-transparent">CONNECT</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Ready to start your fitness journey? Have questions? We're here to help.
            Reach out via WhatsApp, email, phone, or drop by our Kismenti location near TJU Garage.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-20">
          <div className="lg:col-span-3 space-y-5">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row gap-5 items-start hover-lift group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{item.title}</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">{item.primary}</h3>
                  <p className="text-sm text-gray-400 mb-3">{item.secondary}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-400 group-hover:gap-2 transition-all">
                    {item.linkText}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/254712345678?text=Hi%20No%20Limit%20Gym%2C%20I%20want%20to%20join%21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-green-500/30 transition-all hover:scale-[1.02] glow-orange"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </a>
              <a
                href="mailto:info@nolimitgym.co.ke?subject=Gym%20Membership%20Enquiry"
                className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-[1.02]"
              >
                <Send className="w-6 h-6" />
                Send Email
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-brand-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Book a Free Visit</h3>
                  <p className="text-xs text-gray-400">Let's show you around the gym</p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thanks! We will contact you shortly via WhatsApp.'); }}>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    placeholder="WhatsApp number"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <select
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all appearance-none"
                  >
                    <option value="" className="text-gray-500">Best day to visit</option>
                    <option>This Week - Monday</option>
                    <option>This Week - Tuesday</option>
                    <option>This Week - Wednesday</option>
                    <option>This Week - Thursday</option>
                    <option>This Week - Friday</option>
                    <option>This Weekend</option>
                    <option>Next Week</option>
                  </select>
                </div>
                <select
                  className="w-full px-4 py-3.5 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all appearance-none"
                >
                  <option value="" className="text-gray-500">I'm interested in...</option>
                  <option>Starter Membership</option>
                  <option>Pro Membership (Most Popular)</option>
                  <option>Elite Membership</option>
                  <option>Personal Training</option>
                  <option>Diet / Nutrition Plan</option>
                  <option>Free 1-Day Trial</option>
                </select>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-brand text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-brand-500/40 transition-all hover:scale-[1.02] glow-orange"
                >
                  Request Booking
                  <ChevronRight className="w-5 h-5" />
                </button>
              </form>

              <p className="text-[11px] text-gray-500 mt-4 text-center">
                ✅ No spam. We'll only contact you regarding your booking.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="glass-card rounded-3xl overflow-hidden">
            <div className="relative">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Exterior%20street%20view%20of%20modern%20gym%20building%20in%20Nairobi%20Kenya%2C%20No%20Limit%20Gym%20signage%2C%20parking%20area%2C%20african%20people%20entering%2C%20urban%20neighborhood%2C%20sunny%20day%2C%20high%20quality%20photography&image_size=landscape_16_9"
                alt="No Limit Gym Location - Kismenti Harambee Estate"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
            </div>
            <div className="p-7">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">📍 Our Exact Location</h3>
                  <p className="text-gray-400 leading-relaxed">
                    <strong className="text-gray-300">Kismenti, Harambee Estate</strong><br />
                    <span className="text-brand-400 font-semibold">Near TJU Garage</span><br />
                    Embakasi West Constituency, Nairobi, Kenya
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-dark-700/50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">🚗 From CBD</div>
                  <div className="text-sm font-semibold text-white">~25 min drive</div>
                </div>
                <div className="p-4 bg-dark-700/50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">🚌 Matatu Route</div>
                  <div className="text-sm font-semibold text-white">Route 33 / 34</div>
                </div>
                <div className="p-4 bg-dark-700/50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">🅿️ Parking</div>
                  <div className="text-sm font-semibold text-green-400">Free & Secure</div>
                </div>
                <div className="p-4 bg-dark-700/50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">🚲 Bikes</div>
                  <div className="text-sm font-semibold text-white">Racks Available</div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Kismenti+Harambee+Estate+Nairobi+near+TJU+Garage"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 w-full py-3 bg-dark-700 hover:bg-gradient-brand text-white rounded-xl font-semibold transition-all"
              >
                <MapPin className="w-5 h-5" />
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 hover-lift">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500/20 to-orange-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0 font-bold text-sm text-brand-400">
                    Q
                  </span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{faq.q}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
            <a
              href="https://wa.me/254712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 text-brand-400 font-semibold hover:text-brand-300 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Still have questions? Chat with us now →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
