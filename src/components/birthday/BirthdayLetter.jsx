import { useEffect, useRef } from 'react'
import { animate, createScope } from 'animejs'
import { Button } from '../common/Button'
import { useTypewriter } from '../../hooks/useTypewriter'

export function BirthdayLetter({ message, onNext }) {
  const rootRef = useRef(null)
  const { displayed, isComplete, skip } = useTypewriter(message, 18)

  useEffect(() => {
    const scope = createScope({ root: rootRef.current }).add(() => {
      animate('[data-letter]', {
        translateX: ['48px', '0px'],
        opacity: [0, 1],
        duration: 700,
        ease: 'out(3)',
      })
    })
    return () => scope.revert()
  }, [])

  return (
    <section ref={rootRef} className="w-full max-w-2xl" data-letter>
      <div className="rounded-[2rem] border border-amber-100 bg-[#fffdf8] p-7 sm:p-12 shadow-xl shadow-amber-950/5">
        <p className="mb-6 font-serif text-sm uppercase tracking-[0.25em] text-amber-700">Untukmu, dengan hangat</p>
        <div className="whitespace-pre-line font-serif text-lg leading-8 text-stone-700 min-h-72">
          {displayed}<span className="animate-pulse text-rose-400">{isComplete ? '' : '|'}</span>
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          {!isComplete && <Button variant="secondary" onClick={skip}>Lewati Animasi</Button>}
          <Button onClick={onNext} disabled={!isComplete}>Lihat Sertifikat →</Button>
        </div>
      </div>
    </section>
  )
}