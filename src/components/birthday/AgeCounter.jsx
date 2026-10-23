import { useEffect, useRef } from 'react'
import { animate, createScope } from 'animejs'
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'
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
      className="mx-auto flex w-full min-w-0 max-w-2xl flex-col gap-8 px-5 py-8 text-left sm:gap-10 sm:px-10 sm:py-12"
      data-age-panel
      data-page-anim
    >
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pink-500">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
          <span>Hari spesialmu telah tiba</span>
        </div>

        <h1 className="break-words text-4xl font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-6xl">
          Happy Birthday,
          <span className="mt-1 block break-words text-pink-500">
            {recipient.name}!
          </span>
        </h1>

        <p className="max-w-md text-sm leading-6 text-neutral-500 sm:text-base">
          Satu tahun lagi penuh cerita, pengalaman, dan momen yang membuatmu
          menjadi dirimu hari ini.
        </p>
      </div>

      <div className="min-w-0 max-w-full rounded-2xl bg-white p-5 sm:p-8">
        <p className="text-sm text-neutral-500">
          Sejauh ini kamu sudah menjalani
        </p>

        <div className="my-5 flex min-w-0 max-w-full items-baseline gap-3">
          <span
            data-counter
            className="block max-w-full overflow-hidden text-ellipsis text-[clamp(3rem,14vw,5rem)] font-bold leading-none tracking-tight tabular-nums text-neutral-950 sm:text-7xl"
          >
            0
          </span>

          <span className="shrink-0 text-base font-medium text-pink-500 sm:text-2xl">
            tahun
          </span>
        </div>

        <div className="mb-5 h-px w-full bg-neutral-100 sm:mb-6" />

        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex min-w-0 items-start gap-3 rounded-xl bg-neutral-50 p-4">
            <CalendarDays
              size={20}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-pink-500"
            />

            <div className="min-w-0">
              <p className="break-words text-2xl font-semibold tracking-tight text-neutral-950">
                {age.totalDays.toLocaleString('id-ID')}
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Hari total di bumi
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-start gap-3 rounded-xl bg-neutral-50 p-4">
            <Clock3
              size={20}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-pink-500"
            />

            <div className="min-w-0">
              <p className="break-words text-2xl font-semibold tracking-tight text-neutral-950">
                {age.daysSinceLastBirthday.toLocaleString('id-ID')}
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Hari sejak ultah terakhir
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-6 text-neutral-500 sm:text-base sm:leading-7">
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
    </section>
  )
}