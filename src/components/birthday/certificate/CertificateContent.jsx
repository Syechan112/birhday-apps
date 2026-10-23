import { Award, Crown, Flower2, Sparkles } from 'lucide-react'

export function CertificateContent({ recipient, age, config, details }) {
  return (
    <div className="relative z-10">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-amber-300 bg-white shadow-sm">
        <Award className="size-8 text-rose-500" strokeWidth={1.5} />
      </div>

      <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-rose-400">
        <span className="h-px w-10 bg-amber-400" />
        <Sparkles size={16} />
        <span className="h-px w-10 bg-amber-400" />
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-rose-500">
        {config.title}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold tracking-wide text-rose-600 sm:text-5xl">
        Certificate
      </h2>
      <p className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-stone-600 sm:text-sm">
        Of Birthday Achievement
      </p>

      <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 bg-rose-500 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white">
        <Award size={16} />
        This certificate is presented to
      </div>

      <h1 className="mt-6 break-words font-serif text-4xl font-bold text-rose-600 sm:text-6xl">
        {recipient.name}
      </h1>

      <div className="mx-auto my-5 flex max-w-lg items-center gap-3">
        <span className="h-px flex-1 bg-rose-200" />
        <Flower2 size={18} className="shrink-0 text-rose-400" />
        <span className="h-px flex-1 bg-rose-200" />
      </div>

      <p className="mx-auto max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
        Dengan bangga merayakan perjalanan{' '}
        <strong className="text-rose-600">{age.years} tahun</strong> yang penuh
        cerita, kebahagiaan, dan kenangan indah.
      </p>

      <span className="mt-5 inline-flex items-center gap-2 border border-rose-200 bg-white px-6 py-2 text-sm font-semibold tracking-wide text-rose-600">
        <Crown size={16} />
        {config.badge}
      </span>

      <div className="my-7 grid grid-cols-2 border-y border-rose-200 py-4 text-sm text-stone-600">
        <div className="border-r border-rose-200 px-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
            Tanggal lahir
          </p>
          <p className="mt-2 font-semibold">{details.formattedBirthDate}</p>
        </div>
        <div className="px-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
            Diterbitkan
          </p>
          <p className="mt-2 font-semibold">{details.issuedDate}</p>
        </div>
      </div>

      <p className="font-serif text-base italic leading-relaxed text-rose-500">
        “{config.closing}”
      </p>
      <p className="mt-6 text-[10px] tracking-[0.2em] text-stone-400">
        {details.certificateNumber}
      </p>
    </div>
  )
}
