import { Dumbbell, Heart, Zap, Target, Flame, Activity } from 'lucide-react'

const FitnessSection = () => {
  const programs = [
    {
      icon: Dumbbell,
      title: 'Strength Training',
      description: 'Build lean muscle and raw power with our comprehensive strength programs featuring free weights, machines, and progressive overload techniques.',
      features: ['Personalized strength plans', 'Progressive overload tracking', 'Compound & isolation lifts', 'Powerlifting & bodybuilding'],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Activity,
      title: 'Cardio & Endurance',
      description: 'Boost your cardiovascular health and stamina with high-energy cardio sessions including HIIT, running, cycling, and jump rope training.',
      features: ['HIIT & Tabata classes', 'Treadmill & elliptical zones', 'Stair climber & rowers', 'Endurance marathon prep'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      title: 'Functional Fitness',
      description: 'Train movements, not just muscles. Our functional programs improve mobility, balance, and real-world athletic performance.',
      features: ['CrossFit style WODs', 'Kettlebell & sandbag training', 'Plyometrics & agility', 'Mobility & flexibility work'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'HIIT & Fat Loss',
      description: 'Maximize calorie burn in minimal time with intense interval sessions scientifically proven for rapid fat loss and metabolic boost.',
      features: ['30-min express sessions', 'Afterburn effect (EPOC)', 'Circuit training', 'MetCon classes daily'],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Flame,
      title: 'Body Sculpting',
      description: 'Shape and define your physique with targeted muscle sculpting programs designed for aesthetics, symmetry, and stage-ready conditioning.',
      features: ['Hypertrophy specialization', 'Body part split routines', 'Posing & stage prep', 'Physique transformation'],
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Target,
      title: 'Sports Specific',
      description: 'Athlete-focused training programs designed to elevate performance in your specific sport with position-specific drills and conditioning.',
      features: ['Football & rugby conditioning', 'Basketball & volleyball', 'Boxing & MMA training', 'Speed & agility camps'],
      color: 'from-purple-500 to-violet-500',
    },
  ]

  return (
    <section id="fitness" className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Fitness Programs
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            TRAIN FOR <span className="text-gradient">YOUR GOALS</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Whatever your fitness ambition — build muscle, lose weight, improve athletic performance,
            or simply get healthier — we have the perfect program tailored for you with expert guidance every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 hover-lift group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <program.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{program.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{program.description}</p>
              <ul className="space-y-3">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FitnessSection
