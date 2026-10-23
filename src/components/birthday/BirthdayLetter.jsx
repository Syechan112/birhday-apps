
import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { Heart, Sparkles, PenLine } from 'lucide-react'
import { Button } from '../common/Button'
import { useTypewriter } from '../../hooks/useTypewriter'

export function BirthdayLetter({ message, onNext }) {
  const rootRef = useRef(null)
  const { displayed, isComplete, skip } = useTypewriter(message, 18)

  useEffect(() => {
    const element = rootRef.current
    if (!element) return

    const animation = animate(element, {
      opacity: [0, 1],
      translateY: [
        { to: -12, duration: 350, ease: 'out(3)' },
        { to: 0, duration: 500, ease: 'outBounce' },
      ],
      duration: 850,
    })

    return () => animation.cancel()
  }, [])


  return (
    <section
      ref={rootRef}
      className="mx-auto w-full max-w-xl rounded-3xl border border-[#E5EFF5] bg-[#F8FBFD]/90 px-5 py-8 sm:px-8 sm:py-10"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FA] text-[#719BB4]">
          <PenLine size={18} strokeWidth={1.7} />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8AA9BC]">
            A little letter
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#40596B] sm:text-2xl">
            Untukmu, dengan hangat.
          </h2>
        </div>

        <Sparkles
          size={19}
          strokeWidth={1.5}
          className="ml-auto shrink-0 text-[#B8D5E5]"
        />
      </div>

      <div className="mb-7 h-px w-full bg-[#E7F0F5]" />

      <div className="min-h-64 whitespace-pre-line text-[15px] leading-8 text-[#617585] sm:min-h-72 sm:text-base sm:leading-9">
        {displayed}
        {!isComplete && (
          <span className="ml-0.5 inline-block animate-pulse text-[#8ABAD5]">
            |
          </span>
        )}
      </div>

      <div className="mt-8 flex items-center gap-2 text-[#8AAFC4]">
        <Heart size={14} fill="currentColor" strokeWidth={1.5} />
        <span className="text-xs tracking-wide">
          Made with love, just for you
        </span>
      </div>

      <div className="mt-7 flex flex-wrap gap-3 border-t border-[#E7F0F5] pt-6">
        {!isComplete && (
          <Button variant="secondary" onClick={skip}>
            Lewati Animasi
          </Button>
        )}

        <Button onClick={onNext} disabled={!isComplete}>
          Lihat Sertifikat →
        </Button>
      </div>
    </section>
  )
}
