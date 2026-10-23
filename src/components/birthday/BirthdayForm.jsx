import { useState } from 'react'
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react'
import { Button } from '../common/Button'
import { CalendarModal } from './form/CalendarModal'
import { formatDate, parseDate, toDateString } from '../../utils/calendarUtils'

export function BirthdayForm({ onStart }) {
  const now = new Date()
  const today = toDateString(now.getFullYear(), now.getMonth(), now.getDate())
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [nameFocused, setNameFocused] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1)
  )
  const [yearPickerOpen, setYearPickerOpen] = useState(false)

  const openCalendar = () => {
    const selectedDate = parseDate(date)

    setCalendarMonth(
      selectedDate
        ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
        : new Date(now.getFullYear(), now.getMonth(), 1)
    )
    setYearPickerOpen(false)
    setCalendarOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !date) {
      setError('Nama dan tanggal lahir wajib diisi.')
      return
    }

    if (date > today) {
      setError('Tanggal lahir tidak boleh berada di masa depan.')
      return
    }

    setError('')
    onStart({ name: name.trim(), date })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md bg-white p-6 sm:p-8 rounded-xl"
        data-page-anim
      >
        <div
          className={`mb-8 transition-opacity duration-200 ${nameFocused ? 'pointer-events-none opacity-40 blur-sm' : ''
            }`}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            A little
            <br />
            surprise<span className="text-pink-400">.</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Ada sesuatu yang spesial untukmu.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div
            className={`flex flex-col gap-2 transition-transform duration-200 ${nameFocused ? 'scale-[1.01]' : ''
              }`}
          >
            <label
              htmlFor="birthday-name"
              className="text-sm font-medium text-neutral-800"
            >
              Nama
            </label>

            <input
              id="birthday-name"
              type="text"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              autoComplete="given-name"
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-pink-400"
              required
            />
          </div>

          <div
            className={`transition-opacity duration-200 ${nameFocused ? 'pointer-events-none opacity-40 blur-sm' : ''
              }`}
          >
            <label
              htmlFor="birthday-date"
              className="mb-2 block text-sm font-medium text-neutral-800"
            >
              Tanggal lahir
            </label>

            <button
              id="birthday-date"
              type="button"
              onClick={openCalendar}
              aria-haspopup="dialog"
              aria-expanded={calendarOpen}
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:border-pink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200"
            >
              <span
                className={`text-sm ${date ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
              >
                {date ? formatDate(date) : 'Pilih tanggal lahir'}
              </span>

              <CalendarDays size={18} className="shrink-0 text-pink-400" />
            </button>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <div
            className={`transition-opacity duration-200 ${nameFocused ? 'pointer-events-none opacity-40 blur-sm' : ''
              }`}
          >
            <Button
              type="submit"
              className="group mt-1 flex w-full items-center justify-between rounded-lg bg-pink-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600"
            >
              <span>Buka Hadiahmu</span>
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </form>

      <CalendarModal
        calendarOpen={calendarOpen}
        setCalendarOpen={setCalendarOpen}
        yearPickerOpen={yearPickerOpen}
        setYearPickerOpen={setYearPickerOpen}
        calendarMonth={calendarMonth}
        setCalendarMonth={setCalendarMonth}
        date={date}
        setDate={setDate}
        today={today}
        now={now}
        onError={setError}
      />
    </>
  )
}