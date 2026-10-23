import { Gift, Sparkles } from 'lucide-react'

export function GachaHeader({ selectedGift, isDrawing, isStopping }) {
  return (
    <div className="px-4 pb-5 pt-6 text-center sm:px-5">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#3199DF] shadow-[0_3px_12px_rgba(67,112,140,0.08)]">
        {selectedGift ? <Sparkles size={25} strokeWidth={1.7} /> : <Gift size={25} strokeWidth={1.7} />}
      </div>
      <h2 className="mt-4 text-xl font-bold tracking-tight text-neutral-800">
        {selectedGift ? 'A Gift for You!' : 'Lucky Gift Draw'}
      </h2>
      <p className="mx-auto mt-1 max-w-xs text-sm leading-6 text-[#66869A]">
        {selectedGift ? 'A little surprise, picked just for you ♡' : isStopping ? 'Your surprise is almost here...' : isDrawing ? 'When you are ready, stop the draw!' : 'There is a little surprise waiting for you.'}
      </p>
    </div>
  )
}
