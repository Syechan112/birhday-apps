import { Gift, Check } from 'lucide-react'

export function ProgressIndicator({ current, total }) {
  const percent =
    total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0

  return (
    <div className="mx-auto flex w-full max-w-[220px] items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
        {percent === 100 ? <Check size={18} /> : <Gift size={18} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-neutral-500">Hadiah</span>
          <span className="font-semibold tabular-nums text-neutral-800">
            {current}/{total}
          </span>
        </div>

        <div
          className="h-1.5 overflow-hidden rounded-full bg-neutral-100"
          role="progressbar"
          aria-label="Progres hadiah yang dibuka"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={current}
        >
          <div
            className="h-full rounded-full bg-pink-500 transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  )
}