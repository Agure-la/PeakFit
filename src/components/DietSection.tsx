import { Utensils, Apple, Droplets, Leaf, Beef, Wheat } from 'lucide-react'

const DietSection = () => {
  const plans = [
    {
      icon: Beef,
      title: 'Muscle Building Diet',
      description: 'High-protein, calorie-surplus meal plans designed to fuel muscle growth with optimal macros for lean gains.',
      macros: { protein: '40%', carbs: '40%', fats: '20%' },
      meals: ['6-8 meals daily', '2500-4000 kcal', 'Lean proteins & complex carbs', 'Post-workout nutrition'],
    },
    {
      icon: Droplets,
      title: 'Fat Loss / Cutting',
      description: 'Calorie-controlled, nutrient-dense meal plans that preserve muscle while accelerating fat loss.',
      macros: { protein: '45%', carbs: '25%', fats: '30%' },
      meals: ['4-5 meals daily', '1500-2200 kcal', 'High protein & fiber', 'Smart carb cycling'],
    },
    {
      icon: Leaf,
      title: 'Vegan & Plant-Based',
      description: 'Complete plant-based nutrition plans with all essential amino acids, perfect for ethical and clean eating.',
      macros: { protein: '30%', carbs: '50%', fats: '20%' },
      meals: ['Plant protein sources', 'Iron & B12 optimization', 'Meal prep made easy', 'Superfood integration'],
    },
    {
      icon: Apple,
      title: 'Maintenance & Health',
      description: 'Balanced, sustainable eating plans for long-term health, energy, and weight maintenance.',
      macros: { protein: '30%', carbs: '40%', fats: '30%' },
      meals: ['Balanced whole foods', '3 main + 2 snacks', 'Antioxidant-rich', 'Gut health focus'],
    },
  ]

  const tips = [
    { title: 'Eat Every 3 Hours', desc: 'Keep metabolism active and energy levels stable with timed meals throughout the day.' },
    { title: 'Hydration is Key', desc: 'Drink 3-4 liters of water daily. Dehydration kills performance and gains.' },
    { title: 'Protein at Every Meal', desc: 'Aim for 1.6-2.2g of protein per kg of bodyweight to build and maintain muscle.' },
    { title: 'Sleep & Recovery Diet', desc: 'Casein protein, magnesium, and tryptophan-rich meals before bed for better recovery.' },
  ]

  return (
    <section id="diet" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold mb-4 tracking-wider uppercase">
              <Utensils className="inline w-4 h-4 mr-2" />
              Diet & Nutrition
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
              FUEL YOUR <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">BODY RIGHT</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Diet is 70% of your results. Our certified nutritionists create personalized meal plans
              tailored to your body type, goals, and lifestyle — whether you're bulking, cutting, or
              optimizing for long-term health and performance.
            </p>

            <div className="space-y-4">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-4 p-4 glass-card rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-400">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl"></div>
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Healthy%20fitness%20meal%20prep%20spread%20with%20grilled%20chicken%20breast%2C%20brown%20rice%2C%20quinoa%2C%20avocado%2C%20vegetables%2C%20protein%20shakes%2C%20nuts%2C%20eggs%2C%20on%20a%20dark%20marble%20table%2C%20professional%20food%20photography%2C%20vibrant%20colors&image_size=square_hd"
                alt="Nutritious Fitness Meals"
                className="relative w-full aspect-square object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 max-w-xs animate-pulse-slow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Free Diet Consultation</div>
                    <div className="text-xs text-gray-400">With any membership</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="glass-card rounded-3xl p-6 hover-lift group">
              <div className="w-14 h-14 rounded-2xl bg-dark-700 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-green-500/20 group-hover:to-emerald-500/30 transition-all">
                <plan.icon className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{plan.title}</h3>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">{plan.description}</p>

              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="text-center p-2 bg-dark-700/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Protein</div>
                  <div className="text-green-400 font-bold text-sm">{plan.macros.protein}</div>
                </div>
                <div className="text-center p-2 bg-dark-700/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Carbs</div>
                  <div className="text-yellow-400 font-bold text-sm">{plan.macros.carbs}</div>
                </div>
                <div className="text-center p-2 bg-dark-700/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Fats</div>
                  <div className="text-pink-400 font-bold text-sm">{plan.macros.fats}</div>
                </div>
              </div>

              <ul className="space-y-2">
                {plan.meals.map((meal, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <Wheat className="w-3 h-3 text-green-400 flex-shrink-0" />
                    {meal}
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

export default DietSection
