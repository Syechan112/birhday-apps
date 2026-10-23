const MS_PER_DAY = 1000 * 60 * 60 * 24

function atLocalMidnight(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getTimeUntilBirthday(birthdayISO) {
  const today = atLocalMidnight(new Date())
  const month = today.getMonth() + 1
  const day = today.getDate()

  const isBirthdayToday = `${month}-${day}` === birthdayISO.slice(5, 10)

  if (isBirthdayToday) {
    return { days: 0, isBirthdayToday: true }
  }

  let birthdayThisYear = new Date(today.getFullYear(), birthdayISO.slice(5, 7) - 1, birthdayISO.slice(8, 10))
  birthdayThisYear = atLocalMidnight(birthdayThisYear)

  if (birthdayThisYear < today) {
    birthdayThisYear = new Date(today.getFullYear() + 1, birthdayISO.slice(5, 7) - 1, birthdayISO.slice(8, 10))
    birthdayThisYear = atLocalMidnight(birthdayThisYear)
  }

  const diffDays = Math.ceil((birthdayThisYear - today) / MS_PER_DAY)

  return {
    days: diffDays,
    isBirthdayToday: false,
  }
}
