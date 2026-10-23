import { ArrowRight, Camera, Heart, Sparkles } from 'lucide-react'
import { Button } from '../components/common/Button'
import { birthdayConfig } from '../data/birthdayConfig'

export function Gallery({ onStartBirthday }) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-9 py-4 sm:py-8" data-page-anim>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#5286A4]">
          <Sparkles size={15} /> Memory lane
        </span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-6xl">
          Galeri kenangan
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-neutral-600 sm:text-base">
          Beberapa potongan kecil dari cerita yang layak disimpan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {birthdayConfig.gifts.map((gift, index) => (
          <article key={gift.id} className="group overflow-hidden border border-[#D7E4EC] bg-white/85 p-3 shadow-sm transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EAF3F8]">
              <img
                src={gift.image}
                alt={gift.caption}
                loading={index < 3 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(event) => {
                  event.currentTarget.src = `https://picsum.photos/seed/birthday-gallery-${gift.id}/800/600`
                }}
              />
              <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#3199DF]">
                <Camera size={15} />
              </span>
            </div>
            <div className="px-2 pb-2 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#5286A4]">Kenangan {String(gift.id).padStart(2, '0')}</p>
              <p className="mt-2 text-base font-bold text-neutral-900">{gift.message}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 border-t border-[#B5C9D5] pt-9 text-center">
        <Heart size={24} className="fill-[#3199DF] text-[#3199DF]" />
        <p className="text-lg font-bold text-neutral-900">Ada kejutan ulang tahun untukmu.</p>
        <Button onClick={onStartBirthday} className="group">
          Mulai Birthday Surprise
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  )
}
