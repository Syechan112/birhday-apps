import { forwardRef, useState } from 'react'
import { Award, Download } from 'lucide-react'
import { Button } from '../common/Button'
import { downloadCertificate } from '../../utils/downloadCertificate'

export const Certificate = forwardRef(function Certificate({ recipient, age, config }, ref) {
  const [exportState, setExportState] = useState('idle')
  const formattedBirthDate = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(recipient.date))
  const issuedDate = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())

  const exportCertificate = async () => {
    setExportState('loading')
    const filenameName = recipient.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    const result = await downloadCertificate(ref.current, `birthday-certificate-${filenameName || 'birthday'}.png`)
    setExportState(result.success ? 'success' : 'error')
  }

  return (
    <section className="w-full max-w-3xl">
      <div ref={ref} className="relative overflow-hidden bg-[#fffdf8] p-6 sm:p-12 text-center shadow-xl border-[10px] border-double border-amber-300" id="certificate">
        <div className="absolute left-5 top-5 h-10 w-10 border-l-2 border-t-2 border-rose-300" />
        <div className="absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 border-rose-300" />
        <Award className="mx-auto text-amber-500" size={44} strokeWidth={1.5} />
        <p className="mt-5 text-xs font-bold tracking-[0.22em] text-stone-500">{config.title}</p>
        <p className="mt-8 font-serif text-lg text-stone-600">Dengan bangga diberikan kepada</p>
        <h1 className="my-4 font-serif text-4xl sm:text-6xl font-bold text-rose-600 break-words">{recipient.name}</h1>
        <p className="mx-auto max-w-xl text-stone-600">Karena telah berhasil menyelesaikan <strong>{age.years} tahun</strong> perjalanan penuh cerita di bumi.</p>
        <span className="inline-block mt-6 rounded-full bg-violet-100 px-5 py-2 text-sm font-bold text-violet-700">{config.badge}</span>
        <div className="my-8 grid grid-cols-2 gap-4 border-y border-amber-100 py-5 text-sm text-stone-600">
          <div><p className="text-xs uppercase tracking-wider text-stone-400">Tanggal lahir</p><p className="mt-1 font-semibold">{formattedBirthDate}</p></div>
          <div><p className="text-xs uppercase tracking-wider text-stone-400">Diterbitkan</p><p className="mt-1 font-semibold">{issuedDate}</p></div>
        </div>
        <p className="font-serif italic text-stone-600">“{config.closing}”</p>
        <p className="mt-7 text-xs text-stone-400">No. BDAY-{new Date().getFullYear()}-{String(age.totalDays).padStart(5, '0')}</p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3">
        <Button onClick={exportCertificate} disabled={exportState === 'loading'}><Download size={18} />{exportState === 'loading' ? 'Menyiapkan PNG...' : 'Download Sertifikat'}</Button>
        {exportState === 'success' && <p className="text-sm text-emerald-600">Sertifikat berhasil diunduh.</p>}
        {exportState === 'error' && <p className="text-sm text-red-500">Ekspor gagal. Coba lagi.</p>}
      </div>
    </section>
  )
})