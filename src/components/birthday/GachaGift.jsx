import { useState, useRef } from 'react'
import { animate } from 'animejs'
import { Gift, Check, Sparkles, ArrowUpRight } from 'lucide-react'

export function GachaGift({ gift, isOpened, onOpen }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const ref = useRef(null)

  const handleOpen = () => {
    if (isOpened || isAnimating) return

    setIsAnimating(true)

    animate(ref.current, {
      rotate: [0, -8, 8, -5, 5, 0],
      scale: [1, 1.05, 1],
      duration: 650,
      ease: 'out(2)',
      onComplete: () => {
        setIsAnimating(false)
        onOpen(gift.id)
      },
    })
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleOpen}
      disabled={isOpened || isAnimating}
      aria-label={
        isOpened
          ? `Hadiah ${gift.id} sudah dibuka`
          : `Buka hadiah ${gift.id}`
      }
      className={`group relative w-full overflow-hidden rounded-2xl text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B4C8] focus-visible:ring-offset-2 ${
        isOpened
          ? 'bg-white shadow-[0_3px_18px_rgba(67,112,140,0.09)]'
          : 'bg-[#F0F7FA] shadow-[0_3px_14px_rgba(67,112,140,0.06)] hover:-translate-y-1 hover:bg-[#E8F3F8] hover:shadow-[0_10px_24px_rgba(67,112,140,0.12)]'
      }`}
    >
      {isOpened ? (
        <>
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#E8F3F8]">
            <img
              src={gift.image}
              alt={gift.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = `https://picsum.photos/seed/birthday-${gift.id}/600/400`
              }}
            />

            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#3199DF] shadow-sm">
              <Check size={16} strokeWidth={2.5} />
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="shrink-0 text-[#3199DF]" />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5286A4]">
                {gift.caption}
              </p>
            </div>

            <p className="mt-3 break-words text-base font-semibold leading-6 text-neutral-800">
              {gift.message}
            </p>

            <p className="mt-4 text-xs text-neutral-400">
              Hadiah #{gift.id} · Sudah dibuka
            </p>
          </div>
        </>
      ) : (
        <div className="relative flex min-h-60 flex-col items-center justify-center overflow-hidden p-5 sm:min-h-64">
          <span className="pointer-events-none absolute right-5 top-5 rotate-12 text-[#91B4C8]/80 transition-transform duration-300 group-hover:rotate-45">
            <Sparkles size={20} />
          </span>

          <span className="pointer-events-none absolute bottom-12 left-6 text-[#91B4C8]/60">
            <Sparkles size={13} />
          </span>

          <span className="pointer-events-none absolute left-1/2 top-7 h-1.5 w-1.5 rounded-full bg-[#91B4C8]/70" />

          <div className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-white text-[#3199DF] shadow-[0_5px_18px_rgba(67,112,140,0.10)] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <Gift size={38} strokeWidth={1.6} />
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5286A4]">
              A little surprise
            </p>

            <p className="mt-2 text-xl font-bold tracking-tight text-neutral-800">
              Hadiah #{gift.id}
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              Ada sesuatu untukmu ♡
            </p>
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#5286A4] transition-colors group-hover:bg-[#3199DF] group-hover:text-white">
            Buka hadiah
            <ArrowUpRight size={14} />
          </span>
        </div>
      )}
    </button>
  )
}