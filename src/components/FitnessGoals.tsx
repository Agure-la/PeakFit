import { useState } from 'react'
import { Target, Plus, Trash2, Send, Trophy, Clock, Flame, Dumbbell, Scale, Percent, Edit2, Check, X, Calendar } from 'lucide-react'
import type { FitnessGoal } from '../utils/reports'
import { openWhatsApp, generateGoalsReport } from '../utils/reports'
import { useLocalStorage } from '../hooks/useLocalStorage'

function uid() { return Math.random().toString(36).slice(2, 11) }
function todayStr() { return new Date().toISOString().split('T')[0] }
function addMonths(date: string, months: number) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d.toISOString().split('T')[0]
}

type GoalCategory = FitnessGoal['category']

const CATEGORY_META: Record<GoalCategory, { icon: typeof Scale; color: string; bg: string; border: string; defUnit: string; examples: { title: string; target: number; unit: string; deadline: string }[] }> = {
  Weight: {
    icon: Scale, color: 'text-blue-400', bg: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/30', defUnit: 'kg',
    examples: [
      { title: 'Lose 10kg', target: 70, unit: 'kg', deadline: addMonths(todayStr(), 3) },
      { title: 'Gain 5kg muscle', target: 80, unit: 'kg', deadline: addMonths(todayStr(), 4) },
    ]
  },
  Strength: {
    icon: Dumbbell, color: 'text-orange-400', bg: 'from-orange-500 to-red-500',
    border: 'border-orange-500/30', defUnit: 'kg',
    examples: [
      { title: 'Bench Press 100kg', target: 100, unit: 'kg', deadline: addMonths(todayStr(), 3) },
      { title: 'Deadlift 150kg', target: 150, unit: 'kg', deadline: addMonths(todayStr(), 6) },
    ]
  },
  Cardio: {
    icon: Flame, color: 'text-green-400', bg: 'from-green-500 to-emerald-500',
    border: 'border-green-500/30', defUnit: 'km',
    examples: [
      { title: 'Run 5km non-stop', target: 5, unit: 'km', deadline: addMonths(todayStr(), 2) },
      { title: 'Complete a Half Marathon', target: 21, unit: 'km', deadline: addMonths(todayStr(), 6) },
    ]
  },
  Body: {
    icon: Percent, color: 'text-pink-400', bg: 'from-pink-500 to-rose-500',
    border: 'border-pink-500/30', defUnit: '%',
    examples: [
      { title: 'Reach 15% Body Fat', target: 15, unit: '%', deadline: addMonths(todayStr(), 4) },
      { title: '30 inch waist', target: 76, unit: 'cm', deadline: addMonths(todayStr(), 3) },
    ]
  },
  Other: {
    icon: Trophy, color: 'text-purple-400', bg: 'from-purple-500 to-violet-500',
    border: 'border-purple-500/30', defUnit: '',
    examples: [
      { title: 'Gym 5x per week', target: 20, unit: 'sessions/month', deadline: addMonths(todayStr(), 1) },
      { title: 'Quit junk food', target: 30, unit: 'days', deadline: addMonths(todayStr(), 1) },
    ]
  },
}

const CATEGORIES: GoalCategory[] = ['Weight', 'Strength', 'Cardio', 'Body', 'Other']

const FitnessGoals = () => {
  const [goals, setGoals] = useLocalStorage<FitnessGoal[]>('nlg_goals', [])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [updateValue, setUpdateValue] = useState('')

  const [category, setCategory] = useState<GoalCategory>('Weight')
  const [title, setTitle] = useState('Lose 10kg')
  const [targetValue, setTargetValue] = useState(70)
  const [currentValue, setCurrentValue] = useState(80)
  const [unit, setUnit] = useState('kg')
  const [deadline, setDeadline] = useState(addMonths(todayStr(), 3))
  const [description, setDescription] = useState('')

  const resetForm = () => {
    setTitle('')
    setTargetValue(0)
    setCurrentValue(0)
    setUnit(CATEGORY_META[category].defUnit)
    setDeadline(addMonths(todayStr(), 3))
    setDescription('')
    setEditingId(null)
  }

  const switchCategory = (c: GoalCategory) => {
    setCategory(c)
    setUnit(CATEGORY_META[c].defUnit)
    if (!editingId) {
      const ex = CATEGORY_META[c].examples[0]
      setTitle(ex.title)
      setTargetValue(ex.target)
      setUnit(ex.unit)
      setDeadline(ex.deadline)
    }
  }

  const applyPreset = (idx: number) => {
    const ex = CATEGORY_META[category].examples[idx]
    setTitle(ex.title)
    setTargetValue(ex.target)
    setUnit(ex.unit)
    setDeadline(ex.deadline)
  }

  const saveGoal = () => {
    if (!title.trim()) { alert('Please enter a goal title 🎯'); return }
    if (targetValue <= 0) { alert('Target value must be greater than 0'); return }

    if (editingId) {
      setGoals(prev => prev.map(g => g.id === editingId
        ? { ...g, category, title, targetValue, currentValue, unit, deadline, description }
        : g
      ))
    } else {
      const goal: FitnessGoal = {
        id: uid(),
        category, title, targetValue, currentValue, unit, deadline, description,
        createdAt: todayStr(),
      }
      setGoals([...goals, goal])
    }
    resetForm()
    setShowForm(false)
  }

  const deleteGoal = (id: string) => {
    if (confirm('Delete this goal?')) {
      setGoals(goals.filter(g => g.id !== id))
    }
  }

  const editGoal = (g: FitnessGoal) => {
    setEditingId(g.id)
    setCategory(g.category)
    setTitle(g.title)
    setTargetValue(g.targetValue)
    setCurrentValue(g.currentValue)
    setUnit(g.unit)
    setDeadline(g.deadline)
    setDescription(g.description || '')
    setShowForm(true)
  }

  const startQuickUpdate = (g: FitnessGoal) => {
    setUpdatingId(g.id)
    setUpdateValue(String(g.currentValue))
  }

  const applyQuickUpdate = (id: string) => {
    const v = Number(updateValue)
    if (isNaN(v)) { alert('Please enter a valid number'); return }
    setGoals(prev => prev.map(g => g.id === id ? { ...g, currentValue: v } : g))
    setUpdatingId(null)
  }

  const daysLeft = (date: string) => {
    const today = new Date()
    const d = new Date(date)
    const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const achieved = goals.filter(g => g.currentValue >= g.targetValue).length
  const avgProgress = goals.length
    ? Math.round(goals.reduce((s, g) => s + Math.min(100, (g.currentValue / g.targetValue) * 100), 0) / goals.length)
    : 0

  return (
    <section id="goals" className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            <Target className="inline w-4 h-4 mr-2" />
            Fitness Goals
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            SET BIG. <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">TRACK DAILY.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Define precise, measurable fitness targets. Monitor progress as you check in, and send your
            goals with current status directly to your No Limit Gym trainer on WhatsApp.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">Total Goals</div>
                <div className="font-display text-3xl text-white">{goals.length}</div>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">Achieved</div>
                <div className="font-display text-3xl text-green-400">{achieved}</div>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">In Progress</div>
                <div className="font-display text-3xl text-orange-400">{goals.length - achieved}</div>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                <Percent className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">Avg Progress</div>
                <div className="font-display text-3xl text-white">{avgProgress}%</div>
              </div>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#2a2a2a" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="url(#grad1)" strokeWidth="3"
                  strokeDasharray={`${(avgProgress / 100) * 94.2} 94.2`} strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center mb-8 justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { resetForm(); setShowForm(!showForm) }}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-brand text-white flex items-center gap-2 hover:shadow-xl hover:shadow-brand-500/30 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5" />
              {showForm ? 'Close' : 'Add New Goal'}
            </button>
            {CATEGORIES.map(c => (
              <span key={c} className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl glass-card text-xs font-semibold text-gray-400">
                {(() => { const M = CATEGORY_META[c]; const I = M.icon; return <I className={`w-3.5 h-3.5 ${M.color}`} /> })()}
                {c}
              </span>
            ))}
          </div>

          <button
            onClick={() => openWhatsApp(generateGoalsReport(goals))}
            className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-xl hover:shadow-green-500/30 transition-all hover:scale-[1.02]"
          >
            <Send className="w-5 h-5" />
            Send Goals to WhatsApp
          </button>
        </div>

        {showForm && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-purple-500/30 animate-slide-up">
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              {editingId ? 'Edit Goal' : 'Create New Fitness Goal'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
              {CATEGORIES.map(c => {
                const M = CATEGORY_META[c]
                const I = M.icon
                return (
                  <button
                    key={c}
                    onClick={() => switchCategory(c)}
                    className={`px-3 py-3 rounded-xl border transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                      category === c
                        ? `bg-gradient-to-br ${M.bg} text-white border-transparent shadow-lg`
                        : `bg-dark-700 border-dark-600 ${M.color} hover:bg-dark-600`
                    }`}
                  >
                    <I className="w-5 h-5" />
                    {c}
                  </button>
                )
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">Goal Title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 outline-none"
                  placeholder="e.g. Lose 10kg, Bench 100kg, Run 5km"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">Target Value</label>
                <input
                  type="number"
                  value={targetValue}
                  onChange={e => setTargetValue(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">Starting / Current Value</label>
                <input
                  type="number"
                  value={currentValue}
                  onChange={e => setCurrentValue(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">Unit (kg, km, %, cm...)</label>
                <input
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">
                  <Calendar className="inline w-3 h-3 mr-1" /> Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-purple-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">Notes / Motivation (optional)</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 outline-none resize-none"
                  placeholder="Why do you want to achieve this? How will you stay consistent?"
                />
              </div>
            </div>

            <div className="mb-5">
              <div className="text-xs text-gray-500 uppercase mb-2">💡 Quick Presets ({category})</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_META[category].examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => applyPreset(i)}
                    className="px-3 py-2 bg-dark-700 hover:bg-purple-500/20 border border-dark-600 hover:border-purple-500/50 rounded-lg text-xs text-gray-300 hover:text-purple-400 font-semibold transition-all"
                  >
                    {ex.title} ({ex.target}{ex.unit})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={saveGoal}
                className="px-8 py-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                {editingId ? '✓ Save Changes' : '🎯 Create Goal'}
              </button>
              <button
                onClick={() => { resetForm(); setShowForm(false) }}
                className="px-6 py-3 rounded-xl bg-dark-700 hover:bg-dark-600 text-gray-300 font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {goals.length === 0 ? (
          <div className="glass-card rounded-3xl p-20 text-center">
            <Target className="w-16 h-16 text-gray-600 mx-auto mb-5" />
            <h3 className="text-2xl font-bold text-white mb-2">No Goals Set Yet</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Start your journey by setting specific targets. Goals help you measure progress and
              keep you accountable with your No Limit Gym trainers.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-3 bg-gradient-brand text-white rounded-xl font-bold hover:shadow-xl hover:shadow-brand-500/30 transition-all"
            >
              + Set Your First Goal
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(g => {
              const M = CATEGORY_META[g.category]
              const I = M.icon
              const pct = Math.min(100, Math.max(0, Math.round((g.currentValue / g.targetValue) * 100)))
              const isDone = g.currentValue >= g.targetValue
              const dl = daysLeft(g.deadline)
              const updating = updatingId === g.id
              return (
                <div key={g.id} className={`glass-card rounded-3xl p-6 relative overflow-hidden hover-lift ${isDone ? 'border-2 border-green-500/50 glow-orange' : M.border + ' border'}`}>
                  {isDone && (
                    <div className="absolute top-4 right-4">
                      <div className="relative">
                        <Trophy className="w-10 h-10 text-yellow-400" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${M.bg} flex items-center justify-center mb-4 shadow-lg`}>
                    <I className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${M.bg + ' text-white bg-gradient-to-br'}`}>
                      {g.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                      dl < 0 ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {dl < 0 ? `Overdue ${-dl}d` : `${dl}d left`}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{g.title}</h3>
                  {g.description && <p className="text-xs text-gray-400 mb-3 italic">{g.description}</p>}

                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase">Current</div>
                      <div className="font-display text-3xl text-white">{g.currentValue}<span className="text-lg text-gray-500">{g.unit}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 uppercase">Target</div>
                      <div className="font-display text-2xl text-gray-400">{g.targetValue}<span className="text-sm">{g.unit}</span></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className={isDone ? 'text-green-400 font-bold' : 'text-brand-400 font-semibold'}>{pct}% Progress</span>
                      <span className="text-gray-500">
                        {isDone ? '🎉 Achieved!' : `${Math.max(0, g.targetValue - g.currentValue)}${g.unit} to go`}
                      </span>
                    </div>
                    <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isDone ? 'bg-gradient-to-r from-green-500 to-emerald-500' : `bg-gradient-to-r ${M.bg}`}`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>

                  {updating ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={updateValue}
                        onChange={e => setUpdateValue(e.target.value)}
                        className="flex-1 px-3 py-2 bg-dark-700 border border-purple-500/50 rounded-lg text-white text-sm outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => applyQuickUpdate(g.id)}
                        className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                      ><Check className="w-4 h-4" /></button>
                      <button
                        onClick={() => setUpdatingId(null)}
                        className="p-2 rounded-lg bg-dark-600 text-gray-400 hover:bg-dark-500"
                      ><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <button
                        onClick={() => startQuickUpdate(g)}
                        className="py-2 rounded-lg bg-dark-700 hover:bg-purple-500/20 text-xs font-semibold text-gray-300 hover:text-purple-400 border border-dark-600 transition-all flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Log
                      </button>
                      <button
                        onClick={() => editGoal(g)}
                        className="py-2 rounded-lg bg-dark-700 hover:bg-blue-500/20 text-xs font-semibold text-gray-300 hover:text-blue-400 border border-dark-600 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteGoal(g.id)}
                        className="py-2 rounded-lg bg-dark-700 hover:bg-red-500/20 text-xs font-semibold text-gray-300 hover:text-red-400 border border-dark-600 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default FitnessGoals
