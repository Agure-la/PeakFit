import { useState } from 'react'
import { Dumbbell, Plus, Trash2, Check, X, Clock, Send, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import type { Workout, Exercise, WorkoutSet } from '../utils/reports'
import { openWhatsApp, generateWorkoutReport } from '../utils/reports'
import { useLocalStorage } from '../hooks/useLocalStorage'

const PRESET_EXERCISES: Record<string, string[]> = {
  Chest: ['Bench Press', 'Incline Dumbbell Press', 'Chest Fly', 'Cable Crossover', 'Push-Ups', 'Dips'],
  Back: ['Pull-Ups', 'Deadlift', 'Barbell Row', 'Lat Pulldown', 'Seated Row', 'Face Pulls'],
  Legs: ['Squats', 'Leg Press', 'Romanian Deadlift', 'Lunges', 'Leg Curls', 'Leg Extensions', 'Calf Raises'],
  Shoulders: ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Rear Delt Fly', 'Arnold Press', 'Shrugs'],
  Arms: ['Bicep Curls', 'Tricep Pushdowns', 'Hammer Curls', 'Skull Crushers', 'Preacher Curls', 'Dips'],
  Core: ['Plank', 'Crunches', 'Russian Twists', 'Leg Raises', 'Hanging Leg Raises', 'Ab Wheel Rollouts'],
  Cardio: ['Treadmill Run', 'Cycling', 'Rowing', 'Jump Rope', 'HIIT Sprints', 'Stair Master'],
}

const MUSCLE_GROUPS = Object.keys(PRESET_EXERCISES)

function uid() {
  return Math.random().toString(36).slice(2, 11)
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('nlg_workouts', [])
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new')
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null)

  const [date, setDate] = useState(todayStr())
  const [title, setTitle] = useState('Push Day')
  const [duration, setDuration] = useState(60)
  const [exercises, setExercises] = useState<Exercise[]>([])

  const [selectedGroup, setSelectedGroup] = useState<string>('Chest')
  const [newExerciseName, setNewExerciseName] = useState('Bench Press')
  const [defaultSets, setDefaultSets] = useState(3)
  const [defaultReps, setDefaultReps] = useState(10)
  const [defaultWeight, setDefaultWeight] = useState(20)

  const addExercise = () => {
    if (!newExerciseName.trim()) return
    const newSets: WorkoutSet[] = Array.from({ length: defaultSets }, () => ({
      reps: defaultReps,
      weight: defaultWeight,
      done: false,
    }))
    const ex: Exercise = {
      id: uid(),
      name: newExerciseName,
      muscleGroup: selectedGroup,
      sets: newSets,
    }
    setExercises([...exercises, ex])
  }

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id))
  }

  const updateSet = (exId: string, setIdx: number, field: keyof WorkoutSet, value: number | boolean) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exId) return ex
      return {
        ...ex,
        sets: ex.sets.map((s, i) => i === setIdx ? { ...s, [field]: value } : s)
      }
    }))
  }

  const addSet = (exId: string) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exId) return ex
      const last = ex.sets[ex.sets.length - 1] || { reps: 10, weight: 20, done: false }
      return { ...ex, sets: [...ex.sets, { ...last, done: false }] }
    }))
  }

  const removeSet = (exId: string, setIdx: number) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exId) return ex
      return { ...ex, sets: ex.sets.filter((_, i) => i !== setIdx) }
    }))
  }

  const saveWorkout = (markComplete: boolean) => {
    if (exercises.length === 0) {
      alert('Please add at least one exercise first! 💪')
      return
    }
    const workout: Workout = {
      id: uid(),
      date,
      title: title || 'Untitled Workout',
      duration: Number(duration) || 0,
      exercises,
      completed: markComplete || exercises.every(e => e.sets.every(s => s.done)),
    }
    setWorkouts([...workouts, workout])
    setExercises([])
    setTitle('Push Day')
    setDuration(60)
    setDate(todayStr())
    alert(`Workout "${workout.title}" saved successfully! ✅`)
  }

  const deleteWorkout = (id: string) => {
    if (confirm('Delete this workout?')) {
      setWorkouts(workouts.filter(w => w.id !== id))
    }
  }

  const totalVolume = exercises.reduce((sum, e) =>
    sum + e.sets.reduce((s2, set) => s2 + (set.done ? set.reps * set.weight : 0), 0), 0)
  const completedSets = exercises.reduce((sum, e) => sum + e.sets.filter(s => s.done).length, 0)
  const totalSets = exercises.reduce((sum, e) => sum + e.sets.length, 0)

  const quickStartTemplates = [
    { name: 'Push Day', muscles: ['Chest', 'Shoulders', 'Arms'] },
    { name: 'Pull Day', muscles: ['Back', 'Arms'] },
    { name: 'Leg Day', muscles: ['Legs', 'Core'] },
    { name: 'Upper Body', muscles: ['Chest', 'Back', 'Arms', 'Shoulders'] },
    { name: 'Lower Body', muscles: ['Legs', 'Core'] },
    { name: 'Full Body', muscles: ['Chest', 'Back', 'Legs', 'Arms'] },
  ]

  const applyTemplate = (tmpl: { name: string, muscles: string[] }) => {
    setTitle(tmpl.name)
    const sampleExercises: Exercise[] = tmpl.muscles.flatMap(mg => {
      const exs = PRESET_EXERCISES[mg].slice(0, 2)
      return exs.map(name => ({
        id: uid(),
        name,
        muscleGroup: mg,
        sets: Array.from({ length: 3 }, () => ({ reps: 10, weight: 20, done: false })),
      }))
    })
    setExercises(sampleExercises)
  }

  return (
    <section id="workouts" className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-semibold mb-4 tracking-wider uppercase">
            <Dumbbell className="inline w-4 h-4 mr-2" />
            Workout Tracker
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            LOG EVERY <span className="text-gradient">REP. EVERY SET.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Track your workouts in real-time, log sets and weights, and send your complete session
            directly to WhatsApp for easy sharing with your No Limit Gym trainer.
          </p>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'new'
                ? 'bg-gradient-brand text-white shadow-lg shadow-brand-500/30'
                : 'glass-card text-gray-400 hover:text-white'
            }`}
          >
            ✏️ New Workout
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-gradient-brand text-white shadow-lg shadow-brand-500/30'
                : 'glass-card text-gray-400 hover:text-white'
            }`}
          >
            📚 History
            {workouts.length > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{workouts.length}</span>
            )}
          </button>
          <button
            onClick={() => openWhatsApp(generateWorkoutReport(workouts))}
            className="ml-auto px-6 py-3 rounded-xl font-semibold flex items-center gap-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-xl hover:shadow-green-500/30 transition-all hover:scale-[1.02]"
          >
            <Send className="w-5 h-5" />
            Send to WhatsApp
          </button>
        </div>

        {activeTab === 'new' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-400" />
                  Workout Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5 block">Workout Title</label>
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
                      placeholder="e.g. Push Day, Legs, HIIT"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5 block">Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-brand-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5 block">
                        <Clock className="inline w-3 h-3 mr-1" />Minutes
                      </label>
                      <input
                        type="number"
                        value={duration}
                        onChange={e => setDuration(Number(e.target.value))}
                        min={1}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-brand-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 block">⚡ Quick Templates</label>
                  <div className="grid grid-cols-2 gap-2">
                    {quickStartTemplates.map(t => (
                      <button
                        key={t.name}
                        onClick={() => applyTemplate(t)}
                        className="text-xs px-3 py-2.5 bg-dark-700 hover:bg-brand-500/20 border border-dark-600 hover:border-brand-500/50 rounded-lg text-gray-300 hover:text-brand-400 transition-all text-left"
                      >
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-[10px] text-gray-500">{t.muscles.join(', ')}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-5">➕ Add Exercise</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">Muscle Group</label>
                    <select
                      value={selectedGroup}
                      onChange={e => {
                        setSelectedGroup(e.target.value)
                        setNewExerciseName(PRESET_EXERCISES[e.target.value][0])
                      }}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-brand-500 outline-none"
                    >
                      {MUSCLE_GROUPS.map(mg => <option key={mg} value={mg}>{mg}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-semibold uppercase mb-1.5 block">Exercise Name</label>
                    <select
                      value={newExerciseName}
                      onChange={e => setNewExerciseName(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:border-brand-500 outline-none"
                    >
                      {PRESET_EXERCISES[selectedGroup].map(ex => <option key={ex} value={ex}>{ex}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Sets</label>
                      <input type="number" min={1} max={12} value={defaultSets}
                        onChange={e => setDefaultSets(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Reps</label>
                      <input type="number" min={1} value={defaultReps}
                        onChange={e => setDefaultReps(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Kg</label>
                      <input type="number" min={0} value={defaultWeight}
                        onChange={e => setDefaultWeight(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm outline-none" />
                    </div>
                  </div>
                  <button
                    onClick={addExercise}
                    className="w-full py-3 bg-gradient-brand text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-brand-500/30 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Exercise
                  </button>
                </div>
              </div>

              {exercises.length > 0 && (
                <div className="glass-card rounded-3xl p-6 border border-brand-500/30">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Session Summary</span>
                  </div>
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between"><span className="text-gray-400">Exercises</span><span className="text-white font-bold">{exercises.length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Sets Done / Total</span><span className="text-white font-bold">{completedSets} / {totalSets}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Total Volume (kg)</span><span className="text-brand-400 font-bold">{totalVolume.toLocaleString()} kg</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Duration</span><span className="text-white font-bold">{duration} min</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => saveWorkout(false)}
                      className="py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-semibold transition-all"
                    >
                      💾 Save Draft
                    </button>
                    <button
                      onClick={() => saveWorkout(true)}
                      className="py-3 bg-gradient-brand text-white rounded-xl font-bold hover:shadow-xl hover:shadow-brand-500/30 transition-all"
                    >
                      ✅ Save Complete
                    </button>
                  </div>
                  <button
                    onClick={() => openWhatsApp(generateWorkoutReport([...workouts, {
                      id: 'preview', date, title, duration: Number(duration),
                      exercises, completed: true
                    }]))}
                    className="w-full mt-2 py-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-green-500/30 transition-all"
                  >
                    <Send className="w-4 h-4" /> Preview & Send to WhatsApp
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-6 sm:p-8 min-h-[600px]">
                {exercises.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-brand/10 border border-brand-500/30 flex items-center justify-center mb-6">
                      <Dumbbell className="w-12 h-12 text-brand-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Your Workout is Empty</h3>
                    <p className="text-gray-400 max-w-md mb-8">
                      Add exercises using the form on the left, or start with a quick template like
                      "Push Day" to automatically load a full workout routine.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {quickStartTemplates.slice(0, 4).map(t => (
                        <button
                          key={t.name}
                          onClick={() => applyTemplate(t)}
                          className="px-5 py-2.5 bg-dark-700 hover:bg-brand-500/20 border border-dark-600 hover:border-brand-500/50 rounded-xl text-gray-300 hover:text-brand-400 font-semibold transition-all"
                        >
                          {t.name} Template
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <h3 className="text-2xl font-bold text-white mb-1">{title || 'Workout'}</h3>
                    <div className="flex gap-4 text-sm text-gray-400 mb-6">
                      <span>📅 {date}</span>
                      <span>⏱️ {duration} min</span>
                      <span>🏋️ {exercises.length} exercises</span>
                    </div>

                    {exercises.map((ex, idx) => (
                      <div key={ex.id} className="bg-dark-700/40 rounded-2xl p-5 border border-dark-600">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center text-xs font-bold text-white">{idx + 1}</span>
                              <h4 className="text-lg font-bold text-white">{ex.name}</h4>
                              <span className="text-[10px] px-2 py-1 bg-dark-600 text-gray-400 rounded-full uppercase">{ex.muscleGroup}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeExercise(ex.id)}
                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            aria-label="Remove exercise"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-[10px] uppercase tracking-wider text-gray-500 border-b border-dark-600">
                                <th className="text-left py-2 px-2 w-16">Set</th>
                                <th className="text-left py-2 px-2">Weight (kg)</th>
                                <th className="text-left py-2 px-2">Reps</th>
                                <th className="text-center py-2 px-2 w-16">Done</th>
                                <th className="w-10"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {ex.sets.map((set, si) => (
                                <tr key={si} className={`border-b border-dark-600/60 ${set.done ? 'bg-green-500/5' : ''}`}>
                                  <td className="py-2 px-2 font-bold text-gray-400">{si + 1}</td>
                                  <td className="py-2 px-2">
                                    <input type="number" min={0} value={set.weight}
                                      onChange={e => updateSet(ex.id, si, 'weight', Number(e.target.value))}
                                      className="w-full px-2 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm focus:border-brand-500 outline-none" />
                                  </td>
                                  <td className="py-2 px-2">
                                    <input type="number" min={1} value={set.reps}
                                      onChange={e => updateSet(ex.id, si, 'reps', Number(e.target.value))}
                                      className="w-full px-2 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm focus:border-brand-500 outline-none" />
                                  </td>
                                  <td className="py-2 px-2 text-center">
                                    <button
                                      onClick={() => updateSet(ex.id, si, 'done', !set.done)}
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                        set.done
                                          ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                                          : 'bg-dark-700 text-gray-500 hover:text-white border border-dark-600'
                                      }`}
                                    >
                                      {set.done ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                    </button>
                                  </td>
                                  <td className="py-2 px-2 text-right">
                                    <button
                                      onClick={() => removeSet(ex.id, si)}
                                      disabled={ex.sets.length <= 1}
                                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <button
                          onClick={() => addSet(ex.id)}
                          className="mt-3 text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add another set
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {workouts.length === 0 ? (
              <div className="glass-card rounded-3xl p-20 text-center">
                <Dumbbell className="w-16 h-16 text-gray-600 mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-white mb-2">No workouts yet</h3>
                <p className="text-gray-400 mb-6">Switch to the "New Workout" tab and log your first training session!</p>
                <button
                  onClick={() => setActiveTab('new')}
                  className="px-8 py-3 bg-gradient-brand text-white rounded-xl font-bold hover:shadow-xl hover:shadow-brand-500/30 transition-all"
                >
                  Start Your First Workout →
                </button>
              </div>
            ) : (
              workouts.slice().reverse().map(w => {
                const isExpanded = expandedWorkout === w.id
                const totalSets = w.exercises.reduce((s, e) => s + e.sets.length, 0)
                const doneSets = w.exercises.reduce((s, e) => s + e.sets.filter(x => x.done).length, 0)
                const volume = w.exercises.reduce((sum, e) =>
                  sum + e.sets.reduce((s2, set) => s2 + (set.done ? set.reps * set.weight : 0), 0), 0)
                return (
                  <div key={w.id} className="glass-card rounded-3xl overflow-hidden">
                    <button
                      onClick={() => setExpandedWorkout(isExpanded ? null : w.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-dark-700/30 transition-all"
                    >
                      <div className="flex items-center gap-5 text-left">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          w.completed ? 'bg-green-500/20 border border-green-500/30' : 'bg-brand-500/10 border border-brand-500/30'
                        }`}>
                          <Dumbbell className={`w-7 h-7 ${w.completed ? 'text-green-400' : 'text-brand-400'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold text-white">{w.title}</h3>
                            {w.completed && <span className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-bold uppercase">Completed</span>}
                          </div>
                          <div className="flex gap-4 text-xs text-gray-400">
                            <span>📅 {w.date}</span>
                            <span>⏱️ {w.duration} min</span>
                            <span>🏋️ {w.exercises.length} exercises</span>
                            <span>📦 {volume.toLocaleString()} kg vol</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="text-xs text-gray-500 uppercase">Sets</div>
                          <div className="font-bold text-white">{doneSets}/{totalSets}</div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteWorkout(w.id)
                          }}
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openWhatsApp(generateWorkoutReport([w]))
                          }}
                          className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-dark-600 p-6 space-y-3 bg-dark-900/30">
                        {w.exercises.map((ex, i) => (
                          <div key={ex.id} className="bg-dark-700/40 rounded-xl p-4 border border-dark-600/50">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-6 h-6 rounded-md bg-gradient-brand flex items-center justify-center text-xs font-bold text-white">{i + 1}</span>
                              <h4 className="font-bold text-white">{ex.name}</h4>
                              <span className="text-[10px] px-2 py-0.5 bg-dark-600 text-gray-400 rounded-full">{ex.muscleGroup}</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {ex.sets.map((set, si) => (
                                <div key={si} className={`p-2 rounded-lg text-center text-xs ${
                                  set.done ? 'bg-green-500/10 border border-green-500/30' : 'bg-dark-700 border border-dark-600'
                                }`}>
                                  <div className="text-[10px] text-gray-500 uppercase mb-0.5">Set {si + 1}</div>
                                  <div className="font-bold text-white">{set.weight}kg × {set.reps}</div>
                                  <div className={`text-[10px] ${set.done ? 'text-green-400' : 'text-gray-500'}`}>
                                    {set.done ? '✓ Done' : 'Pending'}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default WorkoutTracker
