import { useState, useRef } from 'react'
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation'
import confetti from 'canvas-confetti'
import { Music2, Sparkles, ArrowRight } from 'lucide-react'

import { BirthdayForm } from './components/birthday/BirthdayForm'
import { AgeCounter } from './components/birthday/AgeCounter'
import { GachaGift } from './components/birthday/GachaGift'
import { BirthdayLetter } from './components/birthday/BirthdayLetter'
import { Certificate } from './components/birthday/Certificate'
import { CelebrationActions } from './components/birthday/CelebrationActions'
import { ProgressIndicator } from './components/common/ProgressIndicator'
import { Button } from './components/common/Button'

import { birthdayConfig } from './data/birthdayConfig'
import { useAge } from './hooks/useAge'
import { useMusic } from './hooks/useMusic'

export default function App() {
  const [page, setPage] = useState('form')
  const [recipient, setRecipient] = useState({ name: '', date: '' })
  const [openedGifts, setOpenedGifts] = useState(new Set())

  const { isPlaying, error: musicError, startMusic } = useMusic(
    birthdayConfig.music
  )

  const age = useAge(recipient.date)
  const certificateRef = useRef(null)

  const handleStart = (data) => {
    setRecipient({ name: data.name, date: data.date })
    startMusic()
    setPage('age')
  }

  const handleOpenGift = (id) => {
    setOpenedGifts((prev) => new Set([...prev, id]))
  }

  const allGiftsOpened =
    openedGifts.size >= birthdayConfig.gifts.length

  const goToGifts = () => {
    confetti({
      particleCount: 40,
      spread: 120,
      origin: { y: 0.6 },
    })

    setPage('gacha')
  }

  const renderPage = () => {
    switch (page) {
      case 'form':
        return <BirthdayForm onStart={handleStart} />

      case 'age':
        return age ? (
          <AgeCounter
            recipient={recipient}
            age={age}
            onNext={goToGifts}
          />
        ) : null

      case 'gacha':
        return (
          <section
            className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 sm:gap-9"
            data-page-anim
          >
            <div className="relative w-full max-w-xl px-3 py-3 text-center">
              <Sparkles
                size={22}
                className="absolute left-2 top-2 text-[#91B4C8] sm:left-8"
              />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5286A4]">
                Sesuatu yang spesial
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
                Buka Hadiahmu
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500 sm:text-base">
                Ada beberapa kejutan kecil yang sudah disiapkan khusus
                untukmu. Coba buka satu per satu, ya!
              </p>

              <Sparkles
                size={18}
                className="absolute bottom-2 right-3 text-[#91B4C8] sm:right-8"
              />
            </div>

            <div className="w-full max-w-md">
              <ProgressIndicator
                current={openedGifts.size}
                total={birthdayConfig.gifts.length}
              />
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {birthdayConfig.gifts.map((gift) => (
                <GachaGift
                  key={gift.id}
                  gift={gift}
                  isOpened={openedGifts.has(gift.id)}
                  onOpen={handleOpenGift}
                />
              ))}
            </div>

            {allGiftsOpened && (
              <div className="flex w-full flex-col items-center gap-3 py-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F3F8] text-[#3199DF]">
                  <Sparkles size={23} />
                </div>

                <p className="text-lg font-bold text-neutral-900">
                  Semua hadiah sudah dibuka!
                </p>

                <p className="text-sm text-neutral-500">
                  Masih ada satu kejutan lagi untukmu.
                </p>

                <Button
                  onClick={() => setPage('letter')}
                  className="group mt-2"
                >
                  Baca Surat
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            )}
          </section>
        )

      case 'letter':
        return (
          <section
            className="flex flex-col items-center gap-8"
            data-page-anim
          >
            <BirthdayLetter
              message={birthdayConfig.birthdayMessage}
              onNext={() => setPage('certificate')}
            />
          </section>
        )

      case 'certificate':
        return (
          <section
            className="flex flex-col items-center gap-8"
            data-page-anim
          >
            <Certificate
              ref={certificateRef}
              recipient={recipient}
              age={age}
              config={birthdayConfig.certificate}
            />
            <CelebrationActions />
          </section>
        )

      default:
        return <BirthdayForm onStart={handleStart} />
    }
  }

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(255, 255, 255)"
      gradientBackgroundEnd="rgb(248, 252, 255)"
      firstColor="145, 180, 200"
      secondColor="49, 153, 223"
      blendingValue="normal"
      className="text-neutral-800"
    >
      <header className="relative z-20 flex min-h-14 items-center justify-end px-5 py-3 sm:px-8">
        {!isPlaying && !musicError && page !== 'form' && (
          <button
            type="button"
            onClick={startMusic}
            className="inline-flex items-center gap-2 rounded-full border border-[#D7E4EC] bg-white/90 px-4 py-2 text-sm font-medium text-[#5286A4] transition-colors hover:border-[#91B4C8] hover:bg-[#F0F7FA]"
          >
            <Music2 size={16} />
            Putar musik
          </button>
        )}

        {isPlaying && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs text-[#5286A4]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#3199DF]" />
            Musik sedang diputar
          </span>
        )}
      </header>

      <main
        className={`relative z-10 mx-auto w-full max-w-5xl px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8 ${
          page === 'form'
            ? 'flex min-h-[calc(100vh-5rem)] items-center justify-center'
            : ''
        }`}
      >
        {renderPage()}
      </main>
    </BackgroundGradientAnimation>
  )
}