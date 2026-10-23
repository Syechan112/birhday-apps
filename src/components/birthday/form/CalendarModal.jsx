import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '../../common/Button'
import { MONTHS, WEEKDAYS, toDateString, formatDate } from '../../../utils/calendarUtils'

export function CalendarModal({ calendarOpen, setCalendarOpen, yearPickerOpen, setYearPickerOpen, calendarMonth, setCalendarMonth, date, setDate, today, now, onError }) {
  if (!calendarOpen) return null
  const year = calendarMonth.getFullYear()
  const month = calendarMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPreviousMonth = new Date(year, month, 0).getDate()
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDay + 1
    if (dayNumber < 1) return { day: daysInPreviousMonth + dayNumber, monthOffset: -1 }
    if (dayNumber > daysInMonth) return { day: dayNumber - daysInMonth, monthOffset: 1 }
    return { day: dayNumber, monthOffset: 0 }
  })
  const changeMonth = (offset) => {
    setCalendarMonth(new Date(year, month + offset, 1))
    setYearPickerOpen(false)
  }
  const selectDay = (day, monthOffset) => {
    const selectedDate = new Date(year, month + monthOffset, day)
    const value = toDateString(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    if (value > today) return
    setDate(value); onError(''); setCalendarOpen(false); setYearPickerOpen(false)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/30 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && setCalendarOpen(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="calendar-title" className="w-full max-w-sm border-2 border-[#91B4C8] bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between"><div><p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#5286A4]">Tanggal spesial</p><h3 id="calendar-title" className="text-2xl font-extrabold tracking-tight text-neutral-950">Pilih tanggal</h3></div><button type="button" onClick={() => setCalendarOpen(false)} aria-label="Tutup kalender" className="flex h-9 w-9 items-center justify-center border border-[#D7E4EC]"><X size={18} /></button></div>
        <div className="mb-4 flex items-center justify-between gap-2"><button type="button" onClick={() => changeMonth(-1)} className="flex h-10 w-10 items-center justify-center border border-[#D7E4EC]"><ChevronLeft size={19} /></button><button type="button" onClick={() => setYearPickerOpen(!yearPickerOpen)} className="px-2 py-2 text-center"><span className="block text-base font-bold">{MONTHS[month]}</span><span className="text-sm text-[#5286A4]">{year}</span></button><button type="button" onClick={() => changeMonth(1)} disabled={year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth())} className="flex h-10 w-10 items-center justify-center border border-[#D7E4EC] disabled:opacity-30"><ChevronRight size={19} /></button></div>
        {yearPickerOpen ? <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto">{Array.from({ length: now.getFullYear() - 1900 + 1 }, (_, index) => now.getFullYear() - index).map((itemYear) => <button key={itemYear} type="button" onClick={() => { setCalendarMonth(new Date(itemYear, month, 1)); setYearPickerOpen(false) }} className={`border px-3 py-3 text-sm font-semibold ${itemYear === year ? 'border-[#3199DF] bg-[#3199DF] text-white' : 'border-[#D7E4EC]'}`}>{itemYear}</button>)}</div> : <><div className="mb-2 grid grid-cols-7">{WEEKDAYS.map((weekday) => <div key={weekday} className="py-2 text-center text-xs font-semibold text-neutral-400">{weekday}</div>)}</div><div className="grid grid-cols-7 gap-y-1">{calendarDays.map(({ day, monthOffset }, index) => { const cellDate = new Date(year, month + monthOffset, day); const value = toDateString(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate()); const isSelected = value === date; const isToday = value === today; const isFuture = value > today; const isCurrentMonth = monthOffset === 0; return <button key={`${monthOffset}-${day}-${index}`} type="button" disabled={isFuture} onClick={() => selectDay(day, monthOffset)} className={`mx-auto flex aspect-square w-full max-w-10 items-center justify-center text-sm ${isSelected ? 'bg-[#3199DF] font-bold text-white' : isToday ? 'border border-[#3199DF] font-bold text-[#2588CC]' : isCurrentMonth ? 'text-neutral-800 hover:bg-[#EAF3F8]' : 'text-neutral-300'} disabled:opacity-25`}>{day}</button> })}</div></>}
        <div className="mt-5 border-t border-[#D7E4EC] pt-4"><div className="mb-4 flex min-h-5 items-center justify-between"><span className="text-xs text-neutral-500">{date ? formatDate(date) : 'Belum ada tanggal dipilih'}</span>{date && <button type="button" onClick={() => setDate('')} className="text-xs font-semibold text-[#2588CC]">Hapus</button>}</div><Button type="button" onClick={() => { if (!date) { onError('Pilih tanggal lahir terlebih dahulu.'); return } setCalendarOpen(false); setYearPickerOpen(false) }} className="w-full justify-between"><span>Konfirmasi tanggal</span><ArrowRight size={18} /></Button></div>
      </div>
    </div>
  )
}
