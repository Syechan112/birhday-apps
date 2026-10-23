import { useState } from 'react'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { Button } from '../common/Button'
import { CalendarModal } from './form/CalendarModal'
import { formatDate, parseDate, toDateString } from './form/calendarUtils'

export function BirthdayForm({ onStart }) {
  const now = new Date()
  const today = toDateString(now.getFullYear(), now.getMonth(), now.getDate())
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [nameFocused, setNameFocused] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [yearPickerOpen, setYearPickerOpen] = useState(false)

  const openCalendar = () => {
    const selectedDate = parseDate(date)
    setCalendarMonth(selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date(now.getFullYear(), now.getMonth(), 1))
    setYearPickerOpen(false)
    setCalendarOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !date) return setError('Nama dan tanggal lahir wajib diisi.')
    if (date > today) return setError('Tanggal lahir tidak boleh berada di masa depan.')
    setError('')
    onStart({ name: name.trim(), date })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg overflow-hidden border-2 border-[#91B4C8] bg-white p-5 transition-colors duration-300 sm:p-9" data-page-anim>
        <div className={nameFocused ? 'pointer-events-none blur-[3px] opacity-40' : ''}>
          <div className="mb-8"><h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-5xl">A little<br />surprise!</h2><div className="mt-5 h-1 w-16 bg-[#3199DF]" /></div>
        </div>
        <div className="relative flex flex-col gap-5">
          <div className={`relative z-10 flex flex-col gap-2 transition-all duration-300 ${nameFocused ? 'scale-[1.01]' : ''}`}>
            <label htmlFor="birthday-name" className="text-sm font-semibold text-neutral-900">Nama kamu</label>
            <input id="birthday-name" type="text" placeholder="Masukkan nama" value={name} onChange={(e) => { setName(e.target.value); setError('') }} onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)} autoComplete="given-name" className="w-full rounded-none border border-[#B4C9D6] bg-white px-4 py-3.5 text-base text-black outline-none focus:border-[#3199DF] focus:ring-2 focus:ring-[#3199DF]/20" required />
          </div>
          <div className={nameFocused ? 'pointer-events-none blur-[3px] opacity-40' : ''}>
            <label htmlFor="birthday-date" className="mb-2 block text-sm font-semibold text-neutral-900">Tanggal lahir</label>
            <button id="birthday-date" type="button" onClick={openCalendar} aria-haspopup="dialog" aria-expanded={calendarOpen} className="flex w-full items-center justify-between gap-3 border border-[#B4C9D6] bg-white px-4 py-3.5 text-left hover:border-[#3199DF]"><span className={`truncate text-base ${date ? 'text-neutral-950' : 'text-neutral-400'}`}>{date ? formatDate(date) : 'Pilih tanggal lahir'}</span><CalendarDays size={20} className="shrink-0 text-[#3199DF]" /></button>
          </div>
          {error && <p role="alert" className="border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <div className={nameFocused ? 'pointer-events-none blur-[3px] opacity-40' : ''}><Button type="submit" className="group mt-2 w-full justify-between rounded-full px-5 py-3.5"><span>Buka Hadiahmu!</span><span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><ArrowRight size={20} /></span></Button></div>
        </div>
      </form>
      <CalendarModal calendarOpen={calendarOpen} setCalendarOpen={setCalendarOpen} yearPickerOpen={yearPickerOpen} setYearPickerOpen={setYearPickerOpen} calendarMonth={calendarMonth} setCalendarMonth={setCalendarMonth} date={date} setDate={setDate} today={today} now={now} onError={setError} />
    </>
  )
}
