import { ArrowDown, Gift, Sparkles } from 'lucide-react'

export function RouletteTrack({
  viewportRef,
  trackRef,
  rouletteItems,
  isDrawing,
}) {
  const surpriseCount = rouletteItems.length / 12
  const previewText = rouletteItems.length
    ? rouletteItems[0].message.slice(0, 22) + '…'
    : 'No data'

  return (
    <div className="overflow-hidden rounded-xl bg-white py-5">
      <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-pink-500">
        <Sparkles size={14} strokeWidth={1.7} />
        <span>{isDrawing ? 'Drawing...' : 'Pick Your Surprise'}</span>
      </div>

      <div ref={viewportRef} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={trackRef}
          className="flex w-max gap-2 will-change-transform"
          style={{ transform: 'translateX(0px)' }}
        >
          {rouletteItems.map((item) => (
            <div
              key={item.rouletteKey}
              className="flex h-28 w-[100px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-neutral-50 p-2"
            >
              <div className="flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-white">
                <Gift
                  size={25}
                  strokeWidth={1.5}
                  className="text-pink-400"
                />
              </div>
              <span className="w-full truncate text-center text-xs font-medium text-neutral-600">
                {previewText}
              </span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[104px] -translate-x-1/2 rounded-xl bg-pink-500/[0.06] ring-2 ring-inset ring-pink-400/70" />
        <div className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 text-pink-500">
          <ArrowDown size={17} fill="currentColor" />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-30 -translate-x-1/2 rotate-180 text-pink-500">
          <ArrowDown size={17} fill="currentColor" />
        </div>
      </div>

      <p className="mt-4 px-3 text-center text-xs leading-5 text-neutral-400">
        {isDrawing
          ? 'Stop the roulette to reveal your gift.'
          : `${surpriseCount} surprise${surpriseCount !== 1 ? 's' : ''} waiting for you.`}
      </p>
    </div>
  )
}
