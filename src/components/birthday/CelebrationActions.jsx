import { useEffect, useRef, useState } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { Button } from '../common/Button'
import confetti from 'canvas-confetti'

export function CelebrationActions() {
  const emojisRef = useRef(null)
  const [showHug, setShowHug] = useState(false)

  const spamConfetti = () => {
    const count = 50
    const scalar = 2.4
    const width = window.innerWidth
    const height = window.innerHeight
    confetti({
      particleCount: 7,
      spread: 90,
      origin: { y: 0.55 },
      zIndex: 9999,
      count,
      scalar,
    })
  }

  useEffect(() => {
    if (!emojisRef.current) return
    const scope = createScope({ root: emojisRef.current }).add(() => {
      animate('.emoji-float', {
        translateY: () => [0, -20],
        opacity: [0.7, 0],
        rotate: () => [0, 360],
        loop: true,
        loopDelay: 200,
        duration: 2200,
        ease: 'inOut(sine)',
      })
    })
    return () => scope.revert()
  }, [])

  return (
    <section ref={emojisRef} className="flex flex-col items-center gap-8">
      <div className="flex gap-4 flex-wrap justify-center">
        <Button onClick={spamConfetti}>🎉 Spam Confetti</Button>
        <Button onClick={() => setShowHug(true)}>🤗 Peluk Virtual</Button>
      </div>
      {showHug && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowHug(false)}>
          <div className="relative animate-bounce rounded-full bg-rose-100 p-8 text-center" onClick={e => e.stopPropagation()}>
            <div className="text-5xl sm:text-7xl mb-3">🤗 🎂 🤗</div>
            <p className="mb-4 text-lg font-semibold text-rose-600">Sending you the biggest virtual hug!</p>
            <Button variant="secondary" size="sm" onClick={() => setShowHug(false)}>Tutup</Button>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
        <span className="emoji-float absolute" style={{ left: '10%' }}>🎈</span>
        <span className="emoji-float absolute" style={{ left: '30%' }}>🎂</span>
        <span className="emoji-float absolute" style={{ left: '50%', animationDelay: '300ms' }}>🎁</span>
        <span className="emoji-float absolute" style={{ left: '70%' }}>🎉</span>
        <span className="emoji-float absolute" style={{ left: '90%', animationDelay: '600ms' }}>🎈</span>
      </div>
    </section>
  )
}