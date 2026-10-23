import { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Music2, Sparkles, ArrowRight, PartyPopper } from 'lucide-react'

import { BirthdayForm } from '../components/birthday/BirthdayForm'
import { AgeCounter } from '../components/birthday/AgeCounter'
import { GachaGift } from '../components/birthday/GachaGift'
import { BirthdayLetter } from '../components/birthday/BirthdayLetter'
import { Certificate } from '../components/birthday/Certificate'
import { ProgressIndicator } from '../components/common/ProgressIndicator'
import { Button } from '../components/common/Button'
import { birthdayConfig } from '../data/birthdayConfig'
import { useAge } from '../hooks/useAge'
import { useMusic } from '../hooks/useMusic'

export function BirthdayPage({ onBackToGallery, session }) {
  const [page, setPage] = useState('form')
  const [recipient, setRecipient] = useState({ name: '', date: '' })
  const [openedGifts, setOpenedGifts] = useState(new Set())
  const { isPlaying, error: musicError, startMusic, stopMusic, toggleMusic } = useMusic(birthdayConfig.music)
  const age = useAge(recipient.date)
  const certificateRef = useRef(null)
  const rootRef = useRef(null)

  const allGiftsOpened = openedGifts.size >= 3

  useEffect(() => {
    return () => {
      stopMusic()
    }
  }, [stopMusic])

  const handleStart = (data) => {
    setRecipient({ name: data.name, date: data.date })
    startMusic().catch(() => {
      /* keep going, manual button is fallback */
    })
    setPage('age')
  }

  const goToGifts = () => {
    confetti({ particleCount: 40, spread: 120, origin: { y: 0.6 } })
    setPage('gacha')
  }

  const renderPage = () => {
    switch (page) {
      case 'form':
        return <BirthdayForm onStart={handleStart} />

      case 'age':
        return age ? (
          <AgeCounter recipient={recipient} age={age} onNext={goToGifts} />
        ) : null

      case 'gacha':
        return (
          <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 sm:gap-9" data-page-anim>
            <div className="relative w-full max-w-xl px-3 py-3 text-center">
              <Sparkles size={22} className="absolute left-2 top-2 text-pink-400 sm:left-8" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-500">
                Sesuatu yang spesial
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
                Buka Hadiahmu
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500 sm:text-base">
                Ada beberapa kejutan kecil yang sudah disiapkan khusus untukmu. Coba buka satu per satu, ya!
              </p>
              <Sparkles size={18} className="absolute bottom-2 right-3 text-pink-400 sm:right-8" />
            </div>

            <div className="w-full max-w-md">
              <ProgressIndicator current={openedGifts.size} total={birthdayConfig.gifts.length} />
            </div>

            <div className="w-full max-w-3xl">
              <GachaGift
                key="gacha-roulette"
                gifts={birthdayConfig.gifts}
                openedGiftIds={Array.from(openedGifts)}
                isOpened={false}
                onOpen={(id) => setOpenedGifts((prev) => new Set([...prev, id]))}
              />
            </div>

            {allGiftsOpened && (
              <div className="flex w-full flex-col items-center gap-3 py-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-pink-500">
                  <Sparkles size={23} />
                </div>
                <p className="text-lg font-bold text-neutral-900">
                  Semua hadiah sudah dibuka!
                </p>
                <p className="text-sm text-neutral-500">
                  Masih ada satu kejutan lagi untukmu.
                </p>
                <Button onClick={() => setPage('letter')} className="group mt-2">
                  Baca Surat
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </section>
        )

      case 'letter':
        return (
          <section className="flex flex-col items-center gap-8" data-page-anim>
            <BirthdayLetter
              message={birthdayConfig.birthdayMessage}
              onNext={() => setPage('certificate')}
            />
          </section>
        )

      case 'certificate':
        return (
          <section className="flex flex-col items-center gap-8" data-page-anim>
            <Certificate
              ref={certificateRef}
              recipient={recipient}
              age={age}
              config={birthdayConfig.certificate}
            />
          </section>
        )

      default:
        return <BirthdayForm onStart={handleStart} />
    }
  }

  const isBirthdayPage = page !== 'gallery'

  return (
    <>
      <header className="relative z-20 flex min-h-14 items-center justify-between px-5 py-3 sm:px-8">
        {!isPlaying && !musicError && (
          <button
            type="button"
            onClick={toggleMusic}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-50"
          >
            <Music2 size={16} />
            Putar musik
          </button>
        )}

        {isPlaying && (
          <button
            type="button"
            onClick={toggleMusic}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-50"
          >
            <Music2 size={16} />
            Pause musik
          </button>
        )}

        {onBackToGallery && (
          <button
            type="button"
            onClick={() => {
              stopMusic()
              onBackToGallery()
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-50"
          >
            <PartyPopper size={16} />
            Kembali ke Galeri
          </button>
        )}
      </header>

      <main
        className={`relative z-10 mx-auto w-full max-w-5xl px-3 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8 ${
          page === 'form' ? 'flex min-h-[calc(100vh-5rem)] items-center justify-center' : ''
        }`}
        ref={rootRef}
      >
        {renderPage()}
      </main>

      {isBirthdayPage && (
        <style>{`
          [data-page-anim] {
            opacity: 0;
            transform: translateY(10px);
          }

          @media (prefers-reduced-motion: no-preference) {
            [data-page-anim] {
              animation: fadeSlideIn 0.5s ease-out forwards;
            }
          }

          @keyframes fadeSlideIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      )}
    </>
  )
}
