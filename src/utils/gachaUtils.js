export function getUniqueGifts(gifts, gift) {
  const source = gifts.length ? gifts : gift ? [gift] : []
  const unique = new Map()

  source.forEach((item) => {
    if (item?.id != null) unique.set(item.id, item)
  })

  return Array.from(unique.values())
}

export function getRouletteItems(availableGifts) {
  if (!availableGifts.length) return []

  return Array.from({ length: 12 }, (_, cycle) =>
    availableGifts.map((item, index) => ({
      ...item,
      rouletteKey: `${cycle}-${index}-${item.id}`,
    })),
  ).flat()
}

export function handleImageError(event, id) {
  event.currentTarget.onerror = null
  event.currentTarget.src = `https://picsum.photos/seed/birthday-${id}/600/400`
}
