import { Check, Crown, Star, Zap, Flame } from 'lucide-react'

const PackagesSection = () => {
  const packages = [
    {
      name: 'Starter',
      tagline: 'Perfect for beginners',
      price: '3,500',
      period: '/month',
      icon: Zap,
      popular: false,
      color: 'from-gray-500 to-gray-600',
      features: [
        'Full gym access during staffed hours',
        'Locker room & shower facilities',
        'Cardio zone unlimited',
        'Strength equipment access',
        'Free fitness assessment',
        'Group classes: 2 per week',
        'Sauna & steam room access',
      ],
      cta: 'Get Started',
      ctaStyle: 'bg-dark-700 hover:bg-dark-600 text-white',
    },
    {
      name: 'Pro',
      tagline: 'Our most popular plan',
      price: '5,500',
      period: '/month',
      icon: Star,
      popular: true,
      color: 'from-brand-500 to-brand-600',
      features: [
        'Everything in Starter, plus:',
        '24/7 gym access (PIN access)',
        'Unlimited group classes daily',
        '2 Personal Training sessions/month',
        'Customized diet plan consultation',
        'Swimming pool access',
        'Guest passes: 2 per month',
        'Body composition analysis monthly',
        'Recovery lounge priority',
      ],
      cta: 'Join Pro Plan',
      ctaStyle: 'bg-gradient-brand text-white hover:shadow-2xl hover:shadow-brand-500/40',
    },
    {
      name: 'Elite',
      tagline: 'For serious athletes',
      price: '7,500',
      period: '/month',
      icon: Crown,
      popular: false,
      color: 'from-yellow-500 to-amber-600',
      features: [
        'Everything in Pro, plus:',
        '8 Personal Training sessions/month',
        'Full diet & nutrition coaching',
        'Weekly body measurements',
        'Unlimited guest passes',
        'Cryotherapy: 4 sessions/month',
        'Sports massage: 2 sessions/month',
        'Priority equipment booking',
        'Competition prep support',
        'Dedicated elite coach',
      ],
      cta: 'Go Elite',
      ctaStyle: 'bg-dark-700 hover:bg-dark-600 text-white',
    },
  ]

  const addons = [
    { name: 'Personal Training', price: '500', unit: '/session', desc: 'One-on-one expert coaching' },
    { name: 'Diet Plan (Custom)', price: '800', unit: '/plan', desc: 'Full nutrition plan by dietitian' },
    { name: 'Sports Massage', price: '1000', unit: '/hour', desc: 'Deep tissue recovery massage' },
    { name: 'Cryotherapy', price: '1000', unit: '/session', desc: 'Whole body cold therapy' },
  ]

  return (
    <section id="packages" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Membership Packages
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            INVEST IN <span className="text-gradient">YOURSELF</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Flexible plans designed for every budget and commitment level.
            No hidden fees, no long-term lock-ins. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                pkg.popular
                  ? 'glass-card glow-orange border-brand-500/50 border-2 scale-105'
                  : 'glass-card hover-lift'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-gradient-brand px-5 py-1.5 rounded-full shadow-lg shadow-brand-500/30">
                    <Flame className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white tracking-wider uppercase">Most Popular</span>
                  </div>
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-5 ${pkg.popular ? 'glow-orange' : ''}`}>
                <pkg.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-sm text-gray-400 mb-6">{pkg.tagline}</p>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-sm text-brand-400 font-bold">KSh</span>
                <span className="font-display text-5xl lg:text-6xl text-white tracking-wide">{pkg.price}</span>
                <span className="text-gray-500 font-medium">{pkg.period}</span>
              </div>

              <ul className="space-y-3 mb-10 min-h-[320px]">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      pkg.popular ? 'bg-brand-500/20' : 'bg-dark-600'
                    }`}>
                      <Check className={`w-3 h-3 ${pkg.popular ? 'text-brand-400' : 'text-gray-400'}`} />
                    </span>
                    <span className={feature.includes('Everything in') ? 'text-brand-400 font-semibold' : 'text-gray-300'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/254712345678?text=Hi%20No%20Limit%20Gym%2C%20I%27m%20interested%20in%20the%20"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 rounded-full font-bold text-center transition-all ${pkg.ctaStyle}`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Add-On Services</h3>
          <p className="text-gray-400 mb-8">Enhance your membership with these premium add-ons</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((addon, i) => (
              <div key={i} className="p-5 rounded-2xl bg-dark-700/50 border border-dark-600 hover:border-brand-500/30 transition-colors">
                <h4 className="font-semibold text-white mb-1">{addon.name}</h4>
                <p className="text-xs text-gray-400 mb-3">{addon.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-brand-400 font-bold">KSh</span>
                  <span className="text-xl font-bold text-white">{addon.price}</span>
                  <span className="text-xs text-gray-500">{addon.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PackagesSection
