import { useEffect, useRef } from 'react'
import { animate, createScope } from 'animejs'
import { ArrowRight, CalendarDays, Clock3, Sparkles } from 'lucide-react'
import { Button } from '../common/Button'

export function AgeCounter({ recipient, age, onNext }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const scope = createScope({ root: rootRef.current }).add(() => {
      animate('[data-counter]', {
        innerHTML: [0, Math.min(age.years, 9999)],
        round: 1,
        duration: 1400,
        ease: 'out(3)',
      })

      animate('[data-age-panel]', {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 700,
        ease: 'out(3)',
      })
    })

    return () => scope.revert()
  }, [age.years])

  return (
    <section
      ref={rootRef}
      className="relative mx-auto flex w-full min-w-0 max-w-2xl flex-col gap-7 overflow-hidden px-5 py-8 text-left sm:gap-10 sm:px-10 sm:py-12"
      data-age-panel
      data-page-anim
    >
      <div className="pointer-events-none absolute right-5 top-8 text-[#3199DF]/70 sm:right-10 sm:top-12">
        <Sparkles size={27} strokeWidth={1.4} />
      </div>

      <div className="pointer-events-none absolute right-8 top-20 hidden h-14 w-14 rotate-12 border border-[#91B4C8] sm:block" />

      <div className="relative flex min-w-0 flex-col gap-4 pr-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#5286A4]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#3199DF]" />
          <span>Hari spesialmu telah tiba</span>
        </div>

        <h1 className="break-words text-4xl font-black leading-[1.08] tracking-tight text-neutral-950 sm:text-6xl">
          Happy Birthday,
          <span className="mt-1 block break-words text-[#3199DF]">
            {recipient.name}!
          </span>
        </h1>

        <div className="h-1 w-16 bg-[#3199DF]" />

        <p className="max-w-md text-sm leading-6 text-neutral-500 sm:text-base">
          Satu tahun lagi penuh cerita, pengalaman, dan momen yang membuatmu
          menjadi dirimu hari ini.
        </p>
      </div>

      <div className="relative min-w-0 max-w-full border-2 border-[#91B4C8] bg-white p-4 sm:p-8">
        <div className="pointer-events-none absolute right-4 top-4 grid grid-cols-3 gap-1 sm:right-6 sm:top-6">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-[#91B4C8]"
            />
          ))}
        </div>

        <p className="pr-8 text-sm font-medium text-neutral-500">
          Sejauh ini kamu sudah menjalani
        </p>

        <div className="my-4 flex min-w-0 max-w-full items-baseline gap-2 overflow-hidden">
          <span
            data-counter
            className="block max-w-full overflow-hidden text-ellipsis text-[clamp(3rem,14vw,5rem)] font-black leading-none tracking-tight tabular-nums text-neutral-950 sm:text-7xl"
          >
            0
          </span>

          <span className="shrink-0 text-base font-bold text-[#3199DF] sm:text-2xl">
            tahun
          </span>
        </div>

        <div className="mb-5 h-px w-full bg-[#D7E4EC] sm:mb-6" />

        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex min-w-0 items-start gap-3 border border-[#D7E4EC] p-3 sm:p-4">
            <CalendarDays
              size={20}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-[#3199DF]"
            />

            <div className="min-w-0">
              <p className="break-words text-2xl font-bold tracking-tight text-neutral-950">
                {age.totalDays.toLocaleString('id-ID')}
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Hari total di bumi
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-start gap-3 border border-[#D7E4EC] p-3 sm:p-4">
            <Clock3
              size={20}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-[#3199DF]"
            />

            <div className="min-w-0">
              <p className="break-words text-2xl font-bold tracking-tight text-neutral-950">
                {age.daysSinceLastBirthday.toLocaleString('id-ID')}
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Hari sejak ultah terakhir
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-base leading-7 text-neutral-600">
          Dunia punya alasan lagi untuk merayakan kehadiranmu.
        </p>

        <Button
          onClick={onNext}
          className="group w-full shrink-0 justify-between gap-4 sm:w-auto"
        >
          <span>Lanjut ke Hadiah</span>
          <ArrowRight
            size={18}
            className="shrink-0 transition-transform group-hover:translate-x-1"
          />
        </Button>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 hidden text-[#91B4C8] sm:block">
        <svg
          viewBox="0 0 40 40"
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 0v40M0 20h40" />
        </svg>
      </div>
    </section>
  )
} 