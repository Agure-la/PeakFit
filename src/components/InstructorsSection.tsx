import { Award, Dumbbell, Medal, Users } from 'lucide-react'

const InstructorsSection = () => {
  const trainers = [
    {
      name: 'John Kamau',
      role: 'Head Coach & Founder',
      specialty: 'Strength & Conditioning',
      experience: '12+ years',
      certifications: ['NSCA-CSCS', 'NASM-CPT', 'Olympic Lifting'],
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20african%20american%20male%20fitness%20trainer%20headshot%20portrait%2C%20muscular%20build%2C%20wearing%20black%20athletic%20shirt%2C%20confident%20smile%2C%20modern%20gym%20background%2C%20professional%20lighting%2C%20high%20quality&image_size=square',
      stats: { clients: 500, transformations: 300 },
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Amina Wanjiru',
      role: 'Nutrition Director',
      specialty: 'Diet & Nutrition Coaching',
      experience: '8+ years',
      certifications: ['Registered Dietitian', 'Sports Nutritionist', 'ISSN Specialist'],
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20african%20american%20female%20nutritionist%20headshot%20portrait%2C%20friendly%20smile%2C%20wearing%20white%20coat%20or%20athletic%20wear%2C%20healthy%20food%20in%20background%2C%20professional%20lighting%2C%20high%20quality&image_size=square',
      stats: { clients: 400, transformations: 280 },
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'David Ochieng',
      role: 'Elite Performance Coach',
      specialty: 'HIIT & Sports Performance',
      experience: '10+ years',
      certifications: ['CrossFit L3', 'USA Weightlifting', 'FMS Certified'],
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20african%20american%20male%20CrossFit%20coach%20headshot%20portrait%2C%20athletic%20build%2C%20wearing%20training%20shirt%2C%20determined%20expression%2C%20gym%20equipment%20background%2C%20professional%20lighting%2C%20high%20quality&image_size=square',
      stats: { clients: 350, transformations: 220 },
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Sarah Akinyi',
      role: 'Women\'s Fitness Lead',
      specialty: 'Body Sculpting & Glute Training',
      experience: '7+ years',
      certifications: ['ACE Certified', 'Pre/Post Natal', 'Booty Building Expert'],
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20african%20american%20female%20fitness%20trainer%20headshot%20portrait%2C%20athletic%20muscular%20build%2C%20wearing%20sports%20bra%20and%20leggings%2C%20confident%20smile%2C%20modern%20gym%20background%2C%20professional%20lighting%2C%20high%20quality&image_size=square',
      stats: { clients: 600, transformations: 450 },
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Michael Otieno',
      role: 'Boxing & MMA Coach',
      specialty: 'Combat Sports & Conditioning',
      experience: '15+ years',
      certifications: ['Pro Boxer Retired', 'MMA Coach', 'Conditioning Specialist'],
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20african%20american%20male%20boxing%20coach%20headshot%20portrait%2C%20wearing%20boxing%20handwraps%2C%20tough%20confident%20look%2C%20boxing%20ring%20or%20punching%20bag%20background%2C%20professional%20lighting%2C%20high%20quality&image_size=square',
      stats: { clients: 250, transformations: 180 },
      color: 'from-purple-500 to-violet-500',
    },
    {
      name: 'Grace Nduta',
      role: 'Yoga & Recovery Specialist',
      specialty: 'Yoga, Mobility & Recovery',
      experience: '6+ years',
      certifications: ['RYT-500 Yoga', 'Pilates Instructor', 'Foam Rolling'],
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20african%20american%20female%20yoga%20instructor%20headshot%20portrait%2C%20peaceful%20serene%20smile%2C%20wearing%20yoga%20outfit%2C%20yoga%20mat%20and%20plants%20background%2C%20soft%20natural%20lighting%2C%20high%20quality&image_size=square',
      stats: { clients: 300, transformations: 200 },
      color: 'from-teal-500 to-cyan-500',
    },
  ]

  return (
    <section id="trainers" className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Expert Trainers
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            MEET YOUR <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">COACHES</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Our certified trainers are passionate, experienced, and fully committed to your success.
            With diverse specialties across strength, nutrition, recovery, and combat sports —
            you're in expert hands at No Limit Gym.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-10 mb-16 border border-purple-500/20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-400" />
              </div>
              <div className="font-display text-4xl text-white mb-1">50+</div>
              <div className="text-sm text-gray-400">Certified Trainers Available</div>
            </div>
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-400" />
              </div>
              <div className="font-display text-4xl text-white mb-1">100%</div>
              <div className="text-sm text-gray-400">Nationally Certified</div>
            </div>
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-blue-400" />
              </div>
              <div className="font-display text-4xl text-white mb-1">10,000+</div>
              <div className="text-sm text-gray-400">Total Transformations</div>
            </div>
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-pink-400" />
              </div>
              <div className="font-display text-4xl text-white mb-1">5-20 yrs</div>
              <div className="text-sm text-gray-400">Avg. Experience</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="group glass-card rounded-3xl overflow-hidden hover-lift">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent"></div>
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-br ${trainer.color} text-white text-xs font-bold tracking-wider uppercase shadow-lg`}>
                  {trainer.specialty.split(' & ')[0]}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                <p className="text-brand-400 font-semibold text-sm mb-3">{trainer.role}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-brand-400" />
                    {trainer.experience} exp
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-400" />
                    {trainer.stats.clients}+ clients
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {trainer.certifications.map((cert, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 bg-dark-700 text-gray-400 rounded-full border border-dark-600 font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
                <a
                  href="https://wa.me/254712345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-2.5 rounded-xl bg-dark-700 hover:bg-gradient-brand text-gray-300 hover:text-white text-sm font-semibold transition-all"
                >
                  Book Session
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstructorsSection
