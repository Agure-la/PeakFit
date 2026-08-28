import { ArrowRight, Play, Users, Trophy, Clock } from 'lucide-react'

const Hero = () => {
  const stats = [
    { icon: Users, value: '70+', label: 'Active Members' },
    { icon: Trophy, value: '5+', label: 'Expert Trainers' },
    { icon: Clock, value: '24/7', label: 'Gym Access' },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20luxury%20gym%20interior%20with%20professional%20athletes%20training%2C%20dumbbells%2C%20weight%20racks%2C%20treadmills%2C%20dramatic%20orange%20and%20dark%20lighting%2C%20energetic%20atmosphere%2C%20high%20quality%20photography&image_size=landscape_16_9"
          alt="No Limit Gym Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="text-sm font-semibold text-brand-300">#1 Gym in Kismenti, Nairobi</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-none tracking-wider mb-6">
            <span className="text-white">PUSH YOUR</span>
            <br />
            <span className="text-gradient">LIMITS</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
            Transform your body and mind at No Limit Gym. Premium fitness equipment,
            world-class trainers, personalized diet plans, and recovery programs —
            everything you need to achieve your fitness goals under one roof.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="#packages"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-brand text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-brand-500/40 transition-all hover:scale-105 glow-orange"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#fitness"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-brand-400 transition-all backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
              </div>
              Explore Programs
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-xl">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card rounded-2xl p-5 text-center">
                <stat.icon className="w-6 h-6 text-brand-400 mx-auto mb-3" />
                <div className="font-display text-3xl sm:text-4xl text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent"></div>
    </section>
  )
}

export default Hero
