export function slugify(value, suffix = '') {
  const base = value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!base) return ''
  if (!suffix) return base

  return `${base}-${suffix}`
}
