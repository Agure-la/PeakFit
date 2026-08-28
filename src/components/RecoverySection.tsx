import { Moon, Droplets, Sparkles, Hand, HeartPulse, Activity } from 'lucide-react'

const RecoverySection = () => {
  const services = [
    {
      icon: HeartPulse,
      title: 'Sports Massage Therapy',
      description: 'Deep tissue and sports massage to release tight muscles, improve circulation, and accelerate recovery after intense training.',
      includes: ['Deep tissue massage', 'Trigger point therapy', 'Myofascial release', '60 & 90 min sessions'],
      price: 'From KSh 2,500',
    },
    {
      icon: Droplets,
      title: 'Sauna & Steam Room',
      description: 'Detoxify, relax, and soothe sore muscles in our premium Finnish sauna and aromatic steam rooms, available to all members.',
      includes: ['Traditional Finnish sauna', 'Aromatherapy steam', 'Cold plunge pool', 'Unlimited access'],
      price: 'Free for members',
    },
    {
      icon: Moon,
      title: 'Sleep Optimization',
      description: 'Learn scientifically-backed sleep strategies to enhance muscle repair, hormone regulation, and next-day performance.',
      includes: ['Sleep quality assessment', 'Bedtime routines', 'Sleep environment tips', 'Recovery tracking app'],
      price: 'Included in coaching',
    },
    {
      icon: Sparkles,
      title: 'Stretching & Mobility',
      description: 'Guided flexibility sessions, foam rolling classes, and dynamic mobility work to prevent injury and improve range of motion.',
      includes: ['Daily stretch classes', 'Foam roller stations', 'Yoga & flow sessions', 'Dynamic warm-up drills'],
      price: 'Free for members',
    },
    {
      icon: Hand,
      title: 'Cryotherapy',
      description: 'Whole-body cryotherapy sessions to reduce inflammation, speed muscle recovery, and boost endorphins naturally.',
      includes: ['3-min cold therapy', 'Localized cryo options', 'Post-workout recovery boost', 'Anti-inflammatory benefits'],
      price: 'From KSh 1,000',
    },
    {
      icon: Activity,
      title: 'Active Recovery Days',
      description: 'Light swimming pool sessions, guided walking groups, and low-intensity cycling to aid recovery on rest days.',
      includes: ['Swimming pool access', 'Light cycling sessions', 'Nature walking groups', 'Meditation & breathwork'],
      price: 'Free for members',
    },
  ]

  return (
    <section id="recovery" className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Recovery & Regeneration
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            RECOVER FASTER. <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">TRAIN HARDER.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Your muscles don't grow in the gym — they grow during recovery. We provide world-class
            recovery facilities and expert guidance so you can come back stronger for every single session.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-20 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Relaxing%20spa%20and%20recovery%20area%20in%20a%20modern%20gym%2C%20sauna%20steam%20room%2C%20massage%20table%2C%20person%20relaxing%20on%20a%20yoga%20mat%2C%20soft%20blue%20lighting%2C%20peaceful%20zen%20atmosphere%2C%20high%20quality&image_size=portrait_4_3"
                alt="Recovery and Relaxation Zone"
                className="relative w-full rounded-3xl shadow-2xl object-cover aspect-[4/5]"
              />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 hover-lift flex flex-col sm:flex-row gap-5 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <span className="text-sm font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.includes.map((item, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 bg-dark-700 text-gray-300 rounded-full border border-dark-600">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '24/7', label: 'Sauna & Steam Access', color: 'text-blue-400' },
              { value: '48h', label: 'Avg. Recovery Time Cut', color: 'text-cyan-400' },
              { value: '10+', label: 'Recovery Modalities', color: 'text-sky-400' },
              { value: '100%', label: 'Member Satisfaction', color: 'text-indigo-400' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`font-display text-5xl sm:text-6xl ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecoverySection
