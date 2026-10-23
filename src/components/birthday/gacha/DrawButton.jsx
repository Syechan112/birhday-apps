import { RotateCcw, Sparkles } from 'lucide-react'

export function DrawButton({ onClick, isDrawing, isStopping }) {
  return (
    <button type="button" onClick={onClick} disabled={isStopping} className={`mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B4C8] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 ${isDrawing ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-[#3199DF] text-white hover:bg-[#2588CA]'}`}>
      {isDrawing ? (<><span className="h-2 w-2 animate-pulse rounded-full bg-white" />{isStopping ? 'Stopping...' : 'Stop Draw'}</>) : (<><Sparkles size={17} />Mulai Draw</>)}
    </button>
  )
}

export function ResetButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#3199DF] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2588CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B4C8] focus-visible:ring-offset-2"><RotateCcw size={16} />Draw Lagi</button>
  )
}
