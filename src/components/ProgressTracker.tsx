import { useState } from 'react'
import {
  Activity, Plus, Trash2, Send, Scale, Percent, Ruler, ChevronUp,
  ChevronDown, TrendingDown, TrendingUp, Minus, Calendar, Edit2, Check, X, Download, BarChart3
} from 'lucide-react'
import type { ProgressEntry, Workout, FitnessGoal } from '../utils/reports'
import { openWhatsApp, generateProgressReport, generateFullReport } from '../utils/reports'
import { useLocalStorage } from '../hooks/useLocalStorage'

function uid() { return Math.random().toString(36).slice(2, 11) }
function todayStr() { return new Date().toISOString().split('T')[0] }

const BAR_HEIGHT = 160

const ProgressTracker = () => {
  const [entries, setEntries] = useLocalStorage<ProgressEntry[]>('nlg_progress', [])
  const [workouts] = useLocalStorage<Workout[]>('nlg_workouts', [])
  const [goals] = useLocalStorage<FitnessGoal[]>('nlg_goals', [])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [date, setDate] = useState(todayStr())
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')
  const [waist, setWaist] = useState('')
  const [chest, setChest] = useState('')
  const [arms, setArms] = useState('')
  const [notes, setNotes] = useState('')
  const [chartMetric, setChartMetric] = useState<'weight' | 'bodyFat' | 'waist' | 'chest' | 'arms'>('weight')

  const resetForm = () => {
    setDate(todayStr())
    setWeight('')
    setBodyFat('')
    setWaist('')
    setChest('')
    setArms('')
    setNotes('')
    setEditId(null)
  }

  const saveEntry = () => {
    const hasData = weight || bodyFat || waist || chest || arms || notes
    if (!hasData) {
      alert('Please enter at least one measurement! 📏')
      return
    }

    const entry: ProgressEntry = {
      id: uid(),
      date,
      weight: weight ? Number(weight) : undefined,
      bodyFat: bodyFat ? Number(bodyFat) : undefined,
      waist: waist ? Number(waist) : undefined,
      chest: chest ? Number(chest) : undefined,
      arms: arms ? Number(arms) : undefined,
      notes: notes.trim() || undefined,
    }

    if (editId) {
      setEntries(prev => prev.map(e => e.id === editId ? { ...entry, id: editId } : e))
    } else {
      setEntries([...entries, entry])
    }
    resetForm()
    setShowForm(false)
  }

  const editEntry = (e: ProgressEntry) => {
    setEditId(e.id)
    setDate(e.date)
    setWeight(e.weight?.toString() || '')
    setBodyFat(e.bodyFat?.toString() || '')
    setWaist(e.waist?.toString() || '')
    setChest(e.chest?.toString() || '')
    setArms(e.arms?.toString() || '')
    setNotes(e.notes || '')
    setShowForm(true)
  }

  const deleteEntry = (id: string) => {
    if (confirm('Delete this progress check-in?')) {
      setEntries(entries.filter(e => e.id !== id))
    }
  }

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date))

  const getMetricValues = (key: 'weight' | 'bodyFat' | 'waist' | 'chest' | 'arms') => {
    return sorted
      .filter(e => e[key] !== undefined)
      .map(e => ({ date: e.date, value: e[key] as number, id: e.id }))
  }

  const calcChange = (values: { date: string; value: number }[]) => {
    if (values.length < 2) return null
    const first = values[0].value
    const last = values[values.length - 1].value
    return { diff: last - first, pct: first ? ((last - first) / first) * 100 : 0, first, last }
  }

  const metricMeta: Record<string, { label: string; unit: string; icon: typeof Scale; color: string; grad: string }> = {
    weight: { label: 'Weight', unit: 'kg', icon: Scale, color: 'text-blue-400', grad: 'from-blue-500 to-cyan-500' },
    bodyFat: { label: 'Body Fat', unit: '%', icon: Percent, color: 'text-pink-400', grad: 'from-pink-500 to-rose-500' },
    waist: { label: 'Waist', unit: 'cm', icon: Ruler, color: 'text-orange-400', grad: 'from-orange-500 to-red-500' },
    chest: { label: 'Chest', unit: 'cm', icon: Activity, color: 'text-green-400', grad: 'from-green-500 to-emerald-500' },
    arms: { label: 'Arms', unit: 'cm', icon: Activity, color: 'text-purple-400', grad: 'from-purple-500 to-violet-500' },
  }

  const chartData = getMetricValues(chartMetric)
  const chartChange = calcChange(chartData)
  const maxVal = chartData.length ? Math.max(...chartData.map(d => d.value)) : 0
  const minVal = chartData.length ? Math.min(...chartData.map(d => d.value)) : 0
  const range = maxVal - minVal || 1

  const totalWorkouts = workouts.length
  const totalHours = Math.round(workouts.reduce((s, w) => s + w.duration, 0) / 60)
  const streak = (() => {
    const dates = new Set(workouts.map(w => w.date))
    let s = 0
    const d = new Date()
    while (true) {
      const iso = d.toISOString().split('T')[0]
      if (dates.has(iso)) { s++; d.setDate(d.getDate() - 1) }
      else break
    }
    return s
  })()

  const latest = sorted[sorted.length - 1]
  const first = sorted[0]

  const buildDiffString = (key: 'weight' | 'bodyFat' | 'waist' | 'chest' | 'arms') => {
    const m = metricMeta[key]
    const values = getMetricValues(key)
    if (values.length < 2) return null
    const c = calcChange(values)!
    const Icon = c.diff > 0 ? TrendingUp : c.diff < 0 ? TrendingDown : Minus
    const isGood = (key === 'weight' || key === 'bodyFat' || key === 'waist') ? c.diff < 0 : c.diff > 0
    const color = c.diff === 0 ? 'text-gray-400' : isGood ? 'text-green-400' : 'text-orange-400'
    const sign = c.diff > 0 ? '+' : ''
    return (
      <div className={`text-sm font-semibold flex items-center gap-1 ${color}`}>
        <Icon className="w-4 h-4" />
        {sign}{c.diff.toFixed(1)}{m.unit} ({sign}{c.pct.toFixed(1)}%)
      </div>
    )
  }

  return (
    <section id="progress" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            <Activity className="inline w-4 h-4 mr-2" />
            Progress Monitoring
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            MEASURE. <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">IMPROVE.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Log your body measurements, weight, and body fat weekly. Watch your body transform with
            beautiful progress charts, then send the full report to your No Limit Gym trainer on WhatsApp.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-500 uppercase font-semibold">Workout Streak</div>
              <BarChart3 className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl text-orange-400">{streak}</span>
              <span className="text-sm text-gray-500">days 🔥</span>
            </div>
            <div className="text-xs text-gray-400">Keep it going! Check in daily.</div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-500 uppercase font-semibold">Total Workouts</div>
              <Activity className="w-5 h-5 text-brand-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl text-white">{totalWorkouts}</span>
              <span className="text-sm text-gray-500">sessions</span>
            </div>
            <div className="text-xs text-gray-400">({totalHours} total hours of training)</div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-500 uppercase font-semibold">Progress Check-ins</div>
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl text-blue-400">{entries.length}</span>
              <span className="text-sm text-gray-500">logged</span>
            </div>
            <div className="text-xs text-gray-400">
              {latest ? `Last check-in: ${latest.date}` : 'Log your first one below!'}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-500 uppercase font-semibold">Active Goals</div>
              <Download className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl text-green-400">{goals.filter(g => g.currentValue < g.targetValue).length}</span>
              <span className="text-sm text-gray-500">in progress</span>
            </div>
            <div className="text-xs text-gray-400">{goals.filter(g => g.currentValue >= g.targetValue).length} goals achieved 🎉</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between items-center mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { resetForm(); setShowForm(!showForm) }}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center gap-2 hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5" />
              {showForm ? 'Close' : '+ Log Progress Check-in'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => openWhatsApp(generateProgressReport(entries, goals))}
              className="px-5 py-3 rounded-xl font-semibold flex items-center gap-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-xl hover:shadow-green-500/30 transition-all"
            >
              <Send className="w-4 h-4" /> Progress Report
            </button>
            <button
              onClick={() => openWhatsApp(generateFullReport(workouts, goals, entries))}
              className="px-5 py-3 rounded-xl font-semibold flex items-center gap-2 bg-gradient-brand text-white hover:shadow-xl hover:shadow-brand-500/30 transition-all"
            >
              <Download className="w-4 h-4" /> Full Fitness Report →
            </button>
          </div>
        </div>

        {showForm && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-cyan-500/30 animate-slide-up">
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              {editId ? 'Edit Progress Entry' : 'Log New Progress Check-in'}
              <span className="text-xs font-normal text-gray-400 ml-auto">
                💡 Weekly check-ins recommended (same time, same day)
              </span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block"><Calendar className="inline w-3 h-3 mr-1" /> Date of Check-in</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block"><Scale className="inline w-3 h-3 mr-1 text-blue-400" /> Weight (kg)</label>
                <input type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 75.5"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block"><Percent className="inline w-3 h-3 mr-1 text-pink-400" /> Body Fat (%)</label>
                <input type="number" step="0.1" value={bodyFat} onChange={e => setBodyFat(e.target.value)} placeholder="e.g. 18.5"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block"><Ruler className="inline w-3 h-3 mr-1 text-orange-400" /> Waist (cm)</label>
                <input type="number" step="0.1" value={waist} onChange={e => setWaist(e.target.value)} placeholder="e.g. 85"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block"><Ruler className="inline w-3 h-3 mr-1 text-green-400" /> Chest (cm)</label>
                <input type="number" step="0.1" value={chest} onChange={e => setChest(e.target.value)} placeholder="e.g. 105"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block"><Ruler className="inline w-3 h-3 mr-1 text-purple-400" /> Arms (cm)</label>
                <input type="number" step="0.1" value={arms} onChange={e => setArms(e.target.value)} placeholder="e.g. 38"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 outline-none" />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">Notes / How are you feeling? (optional)</label>
                <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Energy levels, sleep quality, muscle soreness, water retention, cheat meals this week, how clothes fit..."
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 outline-none resize-none" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={saveEntry} className="px-8 py-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/40 transition-all">
                {editId ? <><Check className="inline w-4 h-4 mr-2" /> Save Changes</> : <>✓ Save Check-in</>}
              </button>
              <button onClick={() => { resetForm(); setShowForm(false) }} className="px-6 py-3 rounded-xl bg-dark-700 hover:bg-dark-600 text-gray-300 font-semibold transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3 glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">📈 Progress Chart</h3>
                <p className="text-xs text-gray-400">Track how your measurements change over time</p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {(['weight', 'bodyFat', 'waist', 'chest', 'arms'] as const).map(k => {
                  const m = metricMeta[k]
                  const Icon = m.icon
                  return (
                    <button
                      key={k}
                      onClick={() => setChartMetric(k)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        chartMetric === k
                          ? `bg-gradient-to-br ${m.grad} text-white shadow-lg`
                          : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {m.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {chartData.length === 0 ? (
              <div className="py-20 text-center">
                <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">No {metricMeta[chartMetric].label} data yet</h4>
                <p className="text-gray-400 mb-6 text-sm">
                  Log your {metricMeta[chartMetric].label} in the "Log Progress Check-in" form above to see your progress chart.
                </p>
                <button onClick={() => setShowForm(true)} className="px-6 py-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm">
                  + Add First Measurement
                </button>
              </div>
            ) : (
              <>
                {chartChange && (
                  <div className="flex flex-wrap gap-6 mb-6 p-4 rounded-2xl bg-dark-700/40 border border-dark-600">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase mb-0.5">Starting ({chartData[0].date})</div>
                      <div className="text-2xl font-display text-gray-400">{chartChange.first}{metricMeta[chartMetric].unit}</div>
                    </div>
                    <div className="flex items-center">
                      {chartChange.diff > 0 ? <ChevronUp className="w-8 h-8 text-orange-400" /> : chartChange.diff < 0 ? <ChevronDown className="w-8 h-8 text-green-400" /> : <Minus className="w-8 h-8 text-gray-500" />}
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase mb-0.5">Latest ({chartData[chartData.length - 1].date})</div>
                      <div className="text-2xl font-display text-white">{chartChange.last}{metricMeta[chartMetric].unit}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className={`px-4 py-2 rounded-xl border ${
                        chartChange.diff === 0 ? 'border-gray-600 bg-gray-600/10' :
                        ((chartMetric === 'weight' || chartMetric === 'bodyFat' || chartMetric === 'waist') ? chartChange.diff < 0 : chartChange.diff > 0)
                          ? 'border-green-500/30 bg-green-500/10' : 'border-orange-500/30 bg-orange-500/10'
                      }`}>
                        <div className="text-[10px] text-gray-400 uppercase mb-0.5">Total Change</div>
                        <div className={`text-xl font-bold ${
                          chartChange.diff === 0 ? 'text-gray-300' :
                          ((chartMetric === 'weight' || chartMetric === 'bodyFat' || chartMetric === 'waist') ? chartChange.diff < 0 : chartChange.diff > 0)
                            ? 'text-green-400' : 'text-orange-400'
                        }`}>
                          {chartChange.diff > 0 ? '+' : ''}{chartChange.diff.toFixed(1)}{metricMeta[chartMetric].unit}
                          <span className="text-xs opacity-70 ml-1">({chartChange.pct > 0 ? '+' : ''}{chartChange.pct.toFixed(1)}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-2 text-[10px] text-gray-500 font-semibold">
                    <span>{maxVal.toFixed(1)}{metricMeta[chartMetric].unit}</span>
                    <span>{((maxVal + minVal) / 2).toFixed(1)}</span>
                    <span>{minVal.toFixed(1)}{metricMeta[chartMetric].unit}</span>
                  </div>

                  <div className="ml-14 flex items-end gap-1.5 sm:gap-2" style={{ height: BAR_HEIGHT }}>
                    {chartData.map((d, i) => {
                      const hPercent = ((d.value - minVal) / range) * 100
                      const h = Math.max(8, (hPercent / 100) * BAR_HEIGHT)
                      const isLast = i === chartData.length - 1
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end group relative">
                          <div className={`w-full rounded-t-md transition-all bg-gradient-to-t ${metricMeta[chartMetric].grad} ${
                            isLast ? 'shadow-lg shadow-cyan-500/40 ring-2 ring-white/30' : 'opacity-80 group-hover:opacity-100'
                          }`}
                            style={{ height: `${h}px` }}
                          ></div>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-700 border border-dark-600 text-[10px] text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            <div className="font-bold">{d.value}{metricMeta[chartMetric].unit}</div>
                            <div className="text-gray-400">{d.date}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="ml-14 mt-3 flex justify-between text-[10px] text-gray-500 overflow-hidden">
                    {chartData.filter((_, i, arr) => i === 0 || i === Math.floor(arr.length / 2) || i === arr.length - 1).map((d, i) => (
                      <span key={i} className="font-semibold">{d.date.slice(5)}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-5">🔍 Measurements Summary</h3>

            {sorted.length === 0 ? (
              <div className="text-center py-10">
                <Ruler className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No measurements logged yet</p>
              </div>
            ) : (
              <div className="space-y-5">
                {(['weight', 'bodyFat', 'waist', 'chest', 'arms'] as const).map(k => {
                  const m = metricMeta[k]
                  const Icon = m.icon
                  const values = getMetricValues(k)
                  if (values.length === 0) {
                    return (
                      <div key={k} className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/30 border border-dark-600/50">
                        <div className={`w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center ${m.color} opacity-50`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-500">{m.label}</div>
                          <div className="text-xs text-gray-600">No data logged yet</div>
                        </div>
                      </div>
                    )
                  }
                  const latest = values[values.length - 1]
                  return (
                    <div key={k} className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/40 border border-dark-600 hover:bg-dark-700/60 transition-all">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${m.grad} flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-sm font-semibold text-white">{m.label}</span>
                          <span className={`text-lg font-display ${m.color}`}>
                            {latest.value}{m.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">
                            {values.length} readings • as of {latest.date}
                          </span>
                          {buildDiffString(k)}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {first && latest && latest.weight !== undefined && first.weight !== undefined && (
                  <div className="mt-5 p-4 rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-orange-500/5">
                    <div className="text-xs text-brand-400 uppercase font-semibold mb-1">🏆 Overall Journey</div>
                    <div className="text-sm text-gray-300 mb-2">From <strong className="text-white">{first.date}</strong> to <strong className="text-white">{latest.date}</strong></div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-2 rounded-xl bg-dark-700/60">
                        <div className="text-[10px] text-gray-500">Start Weight</div>
                        <div className="text-lg font-bold text-white">{first.weight}kg</div>
                      </div>
                      <div className="p-2 rounded-xl bg-dark-700/60">
                        <div className="text-[10px] text-gray-500">Current</div>
                        <div className={`text-lg font-bold ${latest.weight! < first.weight! ? 'text-green-400' : latest.weight! > first.weight! ? 'text-orange-400' : 'text-white'}`}>
                          {latest.weight}kg
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-dark-600 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">📋 Full Check-in History</h3>
              <p className="text-xs text-gray-400">{sorted.length} total progress entries</p>
            </div>
            <button
              onClick={() => openWhatsApp(generateProgressReport(entries, goals))}
              className="px-5 py-2.5 rounded-xl bg-dark-700 hover:bg-green-500/20 hover:border-green-500/50 border border-dark-600 text-green-400 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" /> Export All
            </button>
          </div>

          {sorted.length === 0 ? (
            <div className="p-16 text-center">
              <Calendar className="w-14 h-14 text-gray-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">No Check-ins Recorded</h4>
              <p className="text-gray-400 mb-6 text-sm max-w-md mx-auto">
                Start tracking your body transformation journey. Even one check-in a week gives you
                incredible insights when shared with your No Limit Gym trainers.
              </p>
              <button onClick={() => setShowForm(true)} className="px-8 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-all">
                + Log First Check-in
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-dark-700/50 text-[10px] uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold">Date</th>
                    <th className="text-left px-4 py-4 font-bold">Weight</th>
                    <th className="text-left px-4 py-4 font-bold">Body Fat</th>
                    <th className="text-left px-4 py-4 font-bold">Waist</th>
                    <th className="text-left px-4 py-4 font-bold">Chest</th>
                    <th className="text-left px-4 py-4 font-bold">Arms</th>
                    <th className="text-left px-4 py-4 font-bold">Notes</th>
                    <th className="px-4 py-4 font-bold w-32"></th>
                  </tr>
                </thead>
                <tbody>
                  {[...sorted].reverse().map((e) => (
                    <tr key={e.id} className="border-b border-dark-700 hover:bg-dark-700/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{e.date}</td>
                      <td className="px-4 py-4">{e.weight ? <span className="text-blue-400 font-bold">{e.weight}kg</span> : <span className="text-gray-600">—</span>}</td>
                      <td className="px-4 py-4">{e.bodyFat ? <span className="text-pink-400 font-bold">{e.bodyFat}%</span> : <span className="text-gray-600">—</span>}</td>
                      <td className="px-4 py-4">{e.waist ? <span className="text-orange-400 font-bold">{e.waist}cm</span> : <span className="text-gray-600">—</span>}</td>
                      <td className="px-4 py-4">{e.chest ? <span className="text-green-400 font-bold">{e.chest}cm</span> : <span className="text-gray-600">—</span>}</td>
                      <td className="px-4 py-4">{e.arms ? <span className="text-purple-400 font-bold">{e.arms}cm</span> : <span className="text-gray-600">—</span>}</td>
                      <td className="px-4 py-4 max-w-xs">
                        {e.notes ? <span className="text-xs text-gray-400 line-clamp-2">{e.notes}</span> : <span className="text-gray-600">—</span>}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => editEntry(e)} className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-all" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteEntry(e.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProgressTracker
