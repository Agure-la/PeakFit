import { Star, Quote, User } from 'lucide-react'

const ReviewsSection = () => {
  const reviews = [
    {
      name: 'Peter Mwangi',
      age: 32,
      role: 'Business Owner',
      rating: 5,
      duration: 'Member for 18 months',
      text: 'No Limit Gym completely changed my life. I lost 22kg in 8 months and gained more confidence than I ever thought possible. The trainers push you just enough, and the community here is amazing. Everyone knows your name!',
      result: 'Lost 22kg, gained 6kg muscle',
      color: 'from-orange-500 to-amber-500',
    },
    {
      name: 'Lilian Chebet',
      age: 28,
      role: 'Software Engineer',
      rating: 5,
      duration: 'Member for 1 year',
      text: 'As someone who sits at a desk all day, I needed a place that understood my tight schedule and back problems. Coach Amina built me a workout plan that fits my 1-hour lunch breaks perfectly! The diet coaching was a game changer.',
      result: 'Fixed chronic back pain, toned physique',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Brian Kiprop',
      age: 25,
      role: 'Amateur Boxer',
      rating: 5,
      duration: 'Member for 2 years',
      text: 'Coach Michael is the best boxing coach in Nairobi. He trained me from zero experience to winning my first amateur bout. The boxing ring, sparring partners, and strength conditioning program at No Limit are unmatched.',
      result: 'Won 3 amateur boxing titles',
      color: 'from-purple-500 to-violet-500',
    },
    {
      name: 'Joyce Wairimu',
      age: 35,
      role: 'Mother of 3',
      rating: 5,
      duration: 'Member for 14 months',
      text: 'I had tried 4 different gyms before No Limit and quit all of them. Sarah\'s women\'s fitness program felt so welcoming — no judgment, just real results. I\'m stronger now than before I had kids! The sauna after workouts is my self-care.',
      result: 'Post-baby body transformation, 18kg lost',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'James Kariuki',
      age: 40,
      role: 'Bank Manager',
      rating: 5,
      duration: 'Member for 9 months',
      text: 'The 24/7 access was a lifesaver. With my crazy work schedule, I can hit the gym at 5am or 10pm. The Pro plan with 2 PT sessions a month plus the custom diet plan is worth every shilling. My cholesterol dropped 30%!',
      result: 'Cholesterol down 30%, BP normalized',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Naomi Jelimo',
      age: 22,
      role: 'University Student',
      rating: 5,
      duration: 'Member for 6 months',
      text: 'As a broke student, I was worried gyms were too expensive. The Starter plan plus student discount was perfect! Grace\'s yoga classes helped me manage stress during exams and I\'m so much stronger now. Highly recommend!',
      result: 'Strength +30%, better mental health',
      color: 'from-teal-500 to-cyan-500',
    },
  ]

  const aggregateStats = [
    { label: 'Average Rating', value: '4.9/5', icon: Star },
    { label: 'Google Reviews', value: '1,200+', icon: Quote },
    { label: 'Member Retention', value: '94%', icon: User },
    { label: 'Recommendation Rate', value: '98%', icon: Star },
  ]

  return (
    <section id="reviews" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl -translate-x-1/3"></div>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            Member Success Stories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            REAL PEOPLE. <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">REAL RESULTS.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Don't just take our word for it. Hear from the thousands of members who have transformed
            their bodies and lives at No Limit Gym, Kismenti.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {aggregateStats.map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center hover-lift">
              <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" fill={i === 0 || i === 3 ? 'currentColor' : 'none'} />
              <div className="font-display text-4xl text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <div key={index} className="glass-card rounded-3xl p-7 hover-lift relative">
              <Quote className="absolute top-5 right-5 w-8 h-8 text-dark-600 opacity-60" />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-dark-600'}`}
                  />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                "{review.text}"
              </p>

              <div className={`mb-5 p-3 rounded-xl bg-gradient-to-br ${review.color} bg-opacity-10 border border-white/5`}>
                <div className="text-xs text-gray-400 mb-0.5">🏆 Result Achieved</div>
                <div className="text-sm font-semibold text-white">{review.result}</div>
              </div>

              <div className="flex items-center gap-4 pt-5 border-t border-dark-600">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center flex-shrink-0`}>
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white truncate">{review.name}</h4>
                    <span className="text-xs text-gray-500">{review.age}yrs</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="truncate">{review.role}</span>
                    <span>•</span>
                    <span className="flex-shrink-0 text-brand-400">{review.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/254712345678?text=Hi%2C%20I%20want%20to%20share%20my%20No%20Limit%20Gym%20success%20story%21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-yellow-500/30 text-yellow-400 rounded-full font-bold hover:bg-yellow-500/10 transition-all"
          >
            Share Your Story
            <Star className="w-5 h-5" fill="currentColor" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
