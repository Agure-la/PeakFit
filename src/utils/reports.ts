export interface WorkoutSet {
  reps: number
  weight: number
  done: boolean
}

export interface Exercise {
  id: string
  name: string
  muscleGroup: string
  sets: WorkoutSet[]
  notes?: string
}

export interface Workout {
  id: string
  date: string
  title: string
  duration: number // minutes
  exercises: Exercise[]
  completed: boolean
}

export interface FitnessGoal {
  id: string
  title: string
  category: 'Weight' | 'Strength' | 'Cardio' | 'Body' | 'Other'
  targetValue: number
  currentValue: number
  unit: string
  deadline: string
  description?: string
  createdAt: string
}

export interface ProgressEntry {
  id: string
  date: string
  weight?: number
  bodyFat?: number
  waist?: number
  chest?: number
  arms?: number
  notes?: string
}

const WHATSAPP_NUMBER = '254712345678'

export function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function generateWorkoutReport(workouts: Workout[]): string {
  const totalWorkouts = workouts.length
  const completedWorkouts = workouts.filter(w => w.completed).length
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0)
  const totalExercises = workouts.reduce((sum, w) => sum + w.exercises.length, 0)

  let msg = '🔥 *NO LIMIT GYM — WORKOUT TRACKING REPORT* 🔥\n'
  msg += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'
  msg += `📊 *Summary Stats:*\n`
  msg += `   • Total Workouts: ${totalWorkouts}\n`
  msg += `   • Completed: ${completedWorkouts}/${totalWorkouts}\n`
  msg += `   • Total Time: ${totalMinutes} min (${(totalMinutes / 60).toFixed(1)} hrs)\n`
  msg += `   • Total Exercises: ${totalExercises}\n\n`

  if (workouts.length === 0) {
    msg += '⚠️ No workouts logged yet. Start crushing it! 💪\n'
  } else {
    msg += '📋 *Recent Workouts:*\n\n'
    workouts.slice(-5).reverse().forEach((w, i) => {
      const pct = w.exercises.length > 0
        ? Math.round((w.exercises.reduce((s, e) => s + e.sets.filter(set => set.done).length, 0) /
            w.exercises.reduce((s, e) => s + e.sets.length, 0)) * 100)
        : 0
      msg += `${i + 1}. *${w.title}* — ${w.date}\n`
      msg += `    ⏱️ ${w.duration}min | 🏋️ ${w.exercises.length} exercises | ✅ ${pct}%\n`
      w.exercises.slice(0, 3).forEach(ex => {
        const volume = ex.sets.reduce((s, set) => s + (set.done ? set.reps * set.weight : 0), 0)
        msg += `       • ${ex.name}: ${ex.sets.length} sets (${volume}kg vol)\n`
      })
      if (w.exercises.length > 3) msg += `       ... +${w.exercises.length - 3} more\n`
      msg += '\n'
    })
  }

  msg += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
  msg += '💪 Keep pushing your limits at No Limit Gym!\n'
  msg += '📍 Kismenti, Harambee Estate (Near TJU Garage)\n'
  msg += '📞 +254 712 345 678'
  return msg
}

export function generateGoalsReport(goals: FitnessGoal[]): string {
  const totalGoals = goals.length
  const achievedCount = goals.filter(g => g.currentValue >= g.targetValue).length
  const avgProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, g) => sum + Math.min(100, (g.currentValue / g.targetValue) * 100), 0) / goals.length)
    : 0

  let msg = '🎯 *NO LIMIT GYM — FITNESS GOALS REPORT* 🎯\n'
  msg += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'
  msg += `📊 *Overview:*\n`
  msg += `   • Total Goals: ${totalGoals}\n`
  msg += `   • Achieved: ${achievedCount} ✅\n`
  msg += `   • In Progress: ${totalGoals - achievedCount} 🔥\n`
  msg += `   • Avg Progress: ${avgProgress}%\n\n`

  if (goals.length === 0) {
    msg += '⚠️ No goals set yet. Define your targets and start tracking!\n'
  } else {
    msg += '🏆 *Your Goals:*\n\n'
    goals.forEach((g, i) => {
      const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100))
      const remaining = Math.max(0, g.targetValue - g.currentValue)
      const status = pct >= 100 ? '✅ ACHIEVED' : `⏳ ${remaining}${g.unit} to go`
      msg += `${i + 1}. *${g.title}* [${g.category}]\n`
      msg += `    🎯 Target: ${g.targetValue}${g.unit}\n`
      msg += `    📍 Current: ${g.currentValue}${g.unit} (${pct}%)\n`
      msg += `    📅 Deadline: ${g.deadline}\n`
      msg += `    ${status}\n`
      if (g.description) msg += `    💭 ${g.description}\n`
      msg += '\n'
    })
  }

  msg += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
  msg += '💪 Set bigger goals. Achieve bigger results. No Limits!\n'
  msg += '📍 Kismenti, Harambee Estate (Near TJU Garage)\n'
  msg += '📞 +254 712 345 678'
  return msg
}

export function generateProgressReport(entries: ProgressEntry[], goals: FitnessGoal[]): string {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date))

  let msg = '📈 *NO LIMIT GYM — PROGRESS MONITORING REPORT* 📈\n'
  msg += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'
  msg += `📊 *Total Check-ins: ${entries.length}*\n\n`

  if (entries.length === 0) {
    msg += '⚠️ No progress logged yet. Start tracking your measurements weekly!\n'
  } else {
    const first = sorted[0]
    const latest = sorted[sorted.length - 1]

    const diff = (label: string, current?: number, initial?: number, unit = '') => {
      if (current === undefined || initial === undefined) return ''
      const d = current - initial
      const arrow = d > 0 ? '⬆️' : d < 0 ? '⬇️' : '➡️'
      return `   • ${label}: ${initial} → ${current}${unit} ${arrow}${d > 0 ? '+' : ''}${d}${unit}\n`
    }

    msg += `📅 *From ${first.date} to ${latest.date}*\n\n`
    msg += diff('Weight', latest.weight, first.weight, 'kg')
    msg += diff('Body Fat', latest.bodyFat, first.bodyFat, '%')
    msg += diff('Waist', latest.waist, first.waist, 'cm')
    msg += diff('Chest', latest.chest, first.chest, 'cm')
    msg += diff('Arms', latest.arms, first.arms, 'cm')

    if (sorted.length >= 2) {
      msg += '\n📝 *Recent Check-ins:*\n\n'
      sorted.slice(-6).reverse().forEach((e, i) => {
        msg += `${i + 1}. *${e.date}*\n`
        const parts: string[] = []
        if (e.weight) parts.push(`⚖️ ${e.weight}kg`)
        if (e.bodyFat) parts.push(`🔥 ${e.bodyFat}%`)
        if (e.waist) parts.push(`📏 Waist ${e.waist}cm`)
        if (e.chest) parts.push(`💪 Chest ${e.chest}cm`)
        if (e.arms) parts.push(`💪 Arms ${e.arms}cm`)
        msg += `    ${parts.join(' | ')}\n`
        if (e.notes) msg += `    💭 ${e.notes}\n`
        msg += '\n'
      })
    }
  }

  if (goals.length > 0) {
    const weightGoal = goals.find(g => g.category === 'Weight')
    if (weightGoal && entries.length > 0) {
      const latest = sorted[sorted.length - 1]
      if (latest.weight !== undefined) {
        const pct = Math.min(100, Math.round((latest.weight / weightGoal.targetValue) * 100))
        msg += `🎯 *Weight Goal Progress:* ${pct}% (${latest.weight}/${weightGoal.targetValue}${weightGoal.unit})\n`
      }
    }
  }

  msg += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
  msg += '💪 Consistency beats perfection. Keep tracking!\n'
  msg += '📍 Kismenti, Harambee Estate (Near TJU Garage)\n'
  msg += '📞 +254 712 345 678'
  return msg
}

export function generateFullReport(workouts: Workout[], goals: FitnessGoal[], progress: ProgressEntry[]): string {
  let msg = '*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*\n'
  msg += '🔥 *NO LIMIT GYM — COMPLETE FITNESS REPORT* 🔥\n'
  msg += '*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*\n\n'
  msg += `📅 Generated: ${new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n\n`
  msg += generateWorkoutReport(workouts) + '\n\n'
  msg += generateGoalsReport(goals) + '\n\n'
  msg += generateProgressReport(progress, goals)
  return msg
}
