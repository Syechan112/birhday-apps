import { RotateCcw, Sparkles } from 'lucide-react'

export function DrawButton({ onClick, isDrawing, isStopping, drawCount, maxDraws }) {
  const progress = `${drawCount}/${maxDraws}`

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isStopping}
      className={`mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 ${
        isDrawing
          ? 'bg-neutral-900 text-white hover:bg-neutral-800'
          : 'bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700'
      }`}
    >
      {isDrawing ? (
        <>
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          {isStopping ? 'Stopping...' : 'Stop Draw'}
        </>
      ) : (
        <>
          <Sparkles size={17} strokeWidth={1.8} />
          Mulai Draw
          <span className="text-xs opacity-80">({progress})</span>
        </>
      )}
    </button>
  )
}

export function ResetButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pink-600 active:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2"
    >
      <RotateCcw size={16} />
      Lanjut
    </button>
  )
}
