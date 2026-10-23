export function calculateAge(birthDate, now = new Date()) {
  const bd = new Date(birthDate)
  const today = new Date(now)

  let years = today.getFullYear() - bd.getFullYear()
  const monthDiff = today.getMonth() - bd.getMonth()
  const dayDiff = today.getDate() - bd.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years--
  }

  const lastBirthday = new Date(today.getFullYear(), bd.getMonth(), bd.getDate())
  if (lastBirthday > today) {
    lastBirthday.setFullYear(lastBirthday.getFullYear() - 1)
  }

  const diffTime = today - lastBirthday
  const daysSinceLastBirthday = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  const totalDays = Math.floor((today - bd) / (1000 * 60 * 60 * 24))

  return {
    years,
    daysSinceLastBirthday,
    totalDays,
    lastBirthday,
  }
}