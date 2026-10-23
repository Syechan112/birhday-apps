import { ArrowDown, Gift, Sparkles } from 'lucide-react'
import { handleImageError } from '../../../utils/gachaUtils'

export function RouletteTrack({ viewportRef, trackRef, rouletteItems, isDrawing }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white py-5 shadow-[0_2px_10px_rgba(67,112,140,0.04)]">
      <div className="mb-3 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#5286A4]"><Sparkles size={13} /><span>{isDrawing ? 'Drawing...' : 'Pick Your Surprise'}</span></div>
      <div ref={viewportRef} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />
        <div ref={trackRef} className="flex w-max gap-2 will-change-transform" style={{ transform: 'translateX(0px)' }}>
          {rouletteItems.map((item) => <div key={item.rouletteKey} className="flex h-28 w-[100px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#E8F3F8] bg-[#F0F7FA] p-2"><div className="flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-white">{item.image ? <img src={item.image} alt="" draggable="false" className="h-full w-full object-cover" onError={(event) => handleImageError(event, item.id)} /> : <Gift size={27} strokeWidth={1.6} className="text-[#91B4C8]" />}</div><span className="w-full truncate text-center text-xs font-semibold text-[#5286A4]">Hadiah #{item.id}</span></div>)}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[104px] -translate-x-1/2 rounded-xl border-2 border-[#3199DF]/70 bg-[#3199DF]/[0.06]" />
        <div className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 text-[#3199DF]"><ArrowDown size={17} fill="currentColor" /></div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-30 -translate-x-1/2 rotate-180 text-[#3199DF]"><ArrowDown size={17} fill="currentColor" /></div>
      </div>
      <p className="mt-4 px-3 text-center text-xs leading-5 text-[#829BAA]">{isDrawing ? 'Stop the roulette to reveal your gift.' : `${rouletteItems.length ? rouletteItems.length / 12 : 0} surprise${rouletteItems.length / 12 > 1 ? 's' : ''} waiting for you.`}</p>
    </div>
  )
}
