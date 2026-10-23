import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '../../common/Button'
import { MONTHS, WEEKDAYS, toDateString, formatDate } from '../../../utils/calendarUtils'

export function CalendarModal({
  calendarOpen,
  setCalendarOpen,
  setYearPickerOpen,
  yearPickerOpen,
  calendarMonth,
  setCalendarMonth,
  date,
  setDate,
  today,
  now,
  onError,
}) {
  if (!calendarOpen) return null

  const year = calendarMonth.getFullYear()
  const month = calendarMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPreviousMonth = new Date(year, month, 0).getDate()

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDay + 1

    if (dayNumber < 1) {
      return { day: daysInPreviousMonth + dayNumber, monthOffset: -1 }
    }

    if (dayNumber > daysInMonth) {
      return { day: dayNumber - daysInMonth, monthOffset: 1 }
    }

    return { day: dayNumber, monthOffset: 0 }
  })

  const changeMonth = (offset) => {
    setCalendarMonth(new Date(year, month + offset, 1))
    setYearPickerOpen(false)
  }

  const selectDay = (day, monthOffset) => {
    const selectedDate = new Date(year, month + monthOffset, day)
    const value = toDateString(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    )

    if (value > today) return

    setDate(value)
    onError('')
    setCalendarOpen(false)
    setYearPickerOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(e) =>
        e.target === e.currentTarget && setCalendarOpen(false)
      }
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-title"
        className="w-full max-w-sm rounded-t-2xl bg-white p-5 shadow-2xl shadow-neutral-950/10 sm:rounded-2xl sm:p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3
              id="calendar-title"
              className="text-xl font-semibold tracking-tight text-neutral-900"
            >
              Pilih tanggal
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Kapan kamu lahir?
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCalendarOpen(false)}
            aria-label="Tutup kalender"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-pink-50 hover:text-pink-500"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Bulan sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-pink-50 hover:text-pink-500"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            type="button"
            onClick={() => setYearPickerOpen(!yearPickerOpen)}
            className="rounded-lg px-3 py-2 text-center transition-colors hover:bg-pink-50"
          >
            <span className="block text-sm font-semibold text-neutral-900">
              {MONTHS[month]}
            </span>
            <span className="text-sm text-pink-500">{year}</span>
          </button>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            disabled={
              year > now.getFullYear() ||
              (year === now.getFullYear() && month >= now.getMonth())
            }
            aria-label="Bulan berikutnya"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-pink-50 hover:text-pink-500 disabled:opacity-25"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        {yearPickerOpen ? (
          <div className="grid max-h-64 grid-cols-3 gap-1.5 overflow-y-auto">
            {Array.from(
              { length: now.getFullYear() - 1900 + 1 },
              (_, index) => now.getFullYear() - index
            ).map((itemYear) => (
              <button
                key={itemYear}
                type="button"
                onClick={() => {
                  setCalendarMonth(new Date(itemYear, month, 1))
                  setYearPickerOpen(false)
                }}
                className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${itemYear === year
                    ? 'bg-pink-500 text-white'
                    : 'text-neutral-700 hover:bg-pink-50'
                  }`}
              >
                {itemYear}
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-2 grid grid-cols-7">
              {WEEKDAYS.map((weekday) => (
                <div
                  key={weekday}
                  className="py-2 text-center text-xs font-medium text-neutral-400"
                >
                  {weekday}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {calendarDays.map(({ day, monthOffset }, index) => {
                const cellDate = new Date(year, month + monthOffset, day)
                const value = toDateString(
                  cellDate.getFullYear(),
                  cellDate.getMonth(),
                  cellDate.getDate()
                )

                const isSelected = value === date
                const isToday = value === today
                const isFuture = value > today
                const isCurrentMonth = monthOffset === 0

                return (
                  <button
                    key={`${monthOffset}-${day}-${index}`}
                    type="button"
                    disabled={isFuture}
                    onClick={() => selectDay(day, monthOffset)}
                    aria-pressed={isSelected}
                    className={`mx-auto flex aspect-square w-full max-w-10 items-center justify-center rounded-full text-sm transition-colors ${isSelected
                        ? 'bg-pink-500 font-semibold text-white'
                        : isToday
                          ? 'font-semibold text-pink-500 ring-1 ring-inset ring-pink-300'
                          : isCurrentMonth
                            ? 'text-neutral-800 hover:bg-pink-50'
                            : 'text-neutral-300 hover:bg-neutral-50'
                      } disabled:cursor-not-allowed disabled:opacity-25`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </>
        )}

        <div className="mt-5 border-t border-neutral-100 pt-4">
          <div className="mb-4 flex min-h-5 items-center justify-between gap-3">
            <span className="truncate text-xs text-neutral-500">
              {date ? formatDate(date) : 'Belum ada tanggal dipilih'}
            </span>

            {date && (
              <button
                type="button"
                onClick={() => {
                  setDate('')
                  onError('')
                }}
                className="shrink-0 text-xs font-medium text-pink-500 hover:text-pink-600"
              >
                Hapus
              </button>
            )}
          </div>

          <Button
            type="button"
            onClick={() => {
              if (!date) {
                onError('Pilih tanggal lahir terlebih dahulu.')
                return
              }

              onError('')
              setCalendarOpen(false)
              setYearPickerOpen(false)
            }}
            className="flex w-full items-center justify-between rounded-lg bg-pink-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600"
          >
            <span>Konfirmasi tanggal</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}