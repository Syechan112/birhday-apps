export const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

export const WEEKDAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export const pad = (value) => String(value).padStart(2, '0')

export const toDateString = (year, month, day) =>
  `${year}-${pad(month + 1)}-${pad(day)}`

export const parseDate = (value) => {
  if (!value) return null

  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const formatDate = (value) => {
  const date = parseDate(value)

  return date
    ? `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
    : ''
}
