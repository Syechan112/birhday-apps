
import { useState, useRef, useMemo, useEffect } from 'react'
import { animate, createDraggable } from 'animejs'
import { Gift, Check, Sparkles, ArrowRight, RotateCcw } from 'lucide-react'

export function GachaGift({ gift, isOpened, onOpen, gifts = [] }) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectedGift, setSelectedGift] = useState(null)
  const [isStopping, setIsStopping] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  const trackRef = useRef(null)
  const animationRef = useRef(null)
  const positionRef = useRef(0)
  const selectedRef = useRef(null)

  const giftList = useMemo(() => {
    const source = gifts.length ? gifts : [gift]
    return source.filter(Boolean)
  }, [gifts, gift])

  const availableGifts = useMemo(() => {
    return giftList.filter((item) => !item.isOpened)
  }, [giftList])

  const items = useMemo(() => {
    const source = availableGifts.length ? availableGifts : giftList
    return Array.from({ length: 12 }, (_, index) => source[index % source.length])
  }, [availableGifts, giftList])

  useEffect(() => {
    return () => {
      animationRef.current?.pause()
    }
  }, [])

  const startDraw = () => {
    if (isDrawing || isOpened || !availableGifts.length) return

    const winner =
      availableGifts[Math.floor(Math.random() * availableGifts.length)]

    selectedRef.current = winner
    setSelectedGift(null)
    setIsStopping(false)
    setHasDrawn(false)
    setIsDrawing(true)

    const track = trackRef.current
    if (!track) return

    animationRef.current?.pause()
    positionRef.current = 0

    const card = track.parentElement
    const cardWidth = card.clientWidth
    const itemWidth = 100
    const gap = 8
    const step = itemWidth + gap
    const winnerIndex = items.findIndex((item) => item.id === winner.id)
    const targetIndex = 6 + (winnerIndex < 0 ? 0 : winnerIndex)

    const targetPosition =
      targetIndex * step - cardWidth / 2 + itemWidth / 2

    animationRef.current = animate(positionRef, {
      currentTime: 0,
      duration: 5000,
      ease: 'linear',
      onUpdate: () => {
        const distance = (step * items.length) || step
        positionRef.current = (positionRef.current + 4) % distance
        track.style.transform = `translateX(-${positionRef.current}px)`
      },
    })

    selectedRef.current = {
      ...winner,
      targetPosition,
    }
  }

  const stopDraw = () => {
    if (!isDrawing || isStopping) return

    setIsStopping(true)

    const track = trackRef.current
    const winner = selectedRef.current

    if (!track || !winner) {
      setIsDrawing(false)
      setIsStopping(false)
      return
    }

    animationRef.current?.pause()

    const card = track.parentElement
    const itemWidth = 100
    const gap = 8
    const step = itemWidth + gap
    const winnerIndex = items.findIndex((item) => item.id === winner.id)
    const targetIndex = 6 + Math.max(0, winnerIndex)
    const targetPosition =
      targetIndex * step - card.clientWidth / 2 + itemWidth / 2

    const current = positionRef.current
    const cycleWidth = step * items.length
    const destination =
      current +
      cycleWidth * 2 +
      ((targetPosition - (current % cycleWidth) + cycleWidth) % cycleWidth)

    animationRef.current = animate(positionRef, {
      currentTime: destination,
      duration: 2200,
      ease: 'out(4)',
      onUpdate: (self) => {
        const progress = self.progress
        const start = current
        const value = start + (destination - start) * progress
        track.style.transform = `translateX(-${value % cycleWidth}px)`
      },
      onComplete: () => {
        setIsDrawing(false)
        setIsStopping(false)
        setHasDrawn(true)
        setSelectedGift(winner)
        onOpen?.(winner.id)
      },
    })
  }

  const resetDraw = () => {
    setSelectedGift(null)
    setHasDrawn(false)
    setIsStopping(false)
    setIsDrawing(false)
    positionRef.current = 0

    if (trackRef.current) {
      trackRef.current.style.transform = 'translateX(0px)'
    }
  }

  if (isOpened && !selectedGift) {
    return (
      <article className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_3px_18px_rgba(67,112,140,0.09)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#E8F3F8]">
          <img
            src={gift.image}
            alt={gift.caption}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#3199DF] shadow-sm">
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
      </article>
    )
  }

  return (
    <section className="w-full overflow-hidden rounded-2xl bg-[#F0F7FA] shadow-[0_3px_18px_rgba(67,112,140,0.08)]">
      <div className="px-4 pb-5 pt-6 text-center sm:px-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#3199DF] shadow-sm">
          <Gift size={25} strokeWidth={1.7} />
        </div>

        <h2 className="mt-4 text-lg font-bold tracking-tight text-neutral-800 sm:text-xl">
          {hasDrawn ? 'Hadiah untukmu!' : 'Lucky Gift Draw'}
        </h2>

        <p className="mx-auto mt-1 max-w-xs text-sm leading-5 text-[#66869A]">
          {hasDrawn
            ? 'Satu kejutan kecil berhasil kamu dapatkan.'
            : isDrawing
              ? isStopping
                ? 'Roulette sedang memperlambat putarannya...'
                : 'Pilih waktunya dan hentikan roulette!'
              : 'Siap menemukan kejutan spesial untukmu?'}
        </p>
      </div>

      {hasDrawn && selectedGift ? (
        <div className="px-4 pb-5 sm:px-6">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#E8F3F8]">
              <img
                src={selectedGift.image}
                alt={selectedGift.caption}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = `https://picsum.photos/seed/birthday-${selectedGift.id}/600/400`
                }}
              />
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#3199DF] shadow-sm">
                <Check size={18} strokeWidth={2.5} />
              </span>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-[#3199DF]" />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5286A4]">
                  {selectedGift.caption}
                </p>
              </div>
              <h3 className="mt-2 text-lg font-bold text-neutral-800">
                Hadiah #{selectedGift.id}
              </h3>
              <p className="mt-2 break-words text-sm leading-6 text-neutral-600">
                {selectedGift.message}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetDraw}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#5286A4] transition-colors hover:bg-[#E8F3F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B4C8]"
          >
            <RotateCcw size={16} />
            Kembali ke Lucky Draw
          </button>
        </div>
      ) : (
        <>
          <div className="relative mx-4 overflow-hidden rounded-xl border border-white/80 bg-white py-5 shadow-sm sm:mx-6">
            <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-10 w-0.5 -translate-x-1/2 bg-[#3199DF]" />
            <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 text-[#3199DF]">
              <ArrowRight className="rotate-90" size={18} fill="currentColor" />
            </div>

            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className="flex w-max gap-2 px-2"
                style={{ transform: 'translateX(0px)' }}
              >
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex h-24 w-[100px] shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-[#E8F3F8] bg-[#F0F7FA] p-2"
                  >
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white text-[#91B4C8]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Gift size={25} strokeWidth={1.6} />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#5286A4]">
                      Hadiah #{item.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 pb-5 pt-5 sm:px-6">
            <div className="mb-4 flex items-center justify-between text-xs text-[#66869A]">
              <span>{isDrawing ? 'Roulette berjalan' : 'Siap untuk draw?'}</span>
              <span>{availableGifts.length} hadiah tersedia</span>
            </div>

            <button
              type="button"
              onClick={isDrawing ? stopDraw : startDraw}
              disabled={isStopping || (!isDrawing && !availableGifts.length)}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B4C8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                isDrawing
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'bg-[#3199DF] text-white hover:bg-[#2588CA]'
              }`}
            >
              {isDrawing ? (
                <>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  {isStopping ? 'Menghentikan...' : 'Stop Draw'}
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  {availableGifts.length ? 'Mulai Draw' : 'Semua Hadiah Terbuka'}
                </>
              )}
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-[#829BAA]">
              {isDrawing
                ? 'Tekan Stop Draw untuk melihat hadiah pilihanmu.'
                : 'Tekan tombol untuk memulai kejutan ♡'}
            </p>
          </div>
        </>
      )}
    </section>
  )
}
