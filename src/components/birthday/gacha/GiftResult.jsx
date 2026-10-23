import { Check, Sparkles } from 'lucide-react'

export function GiftResult({ gift }) {
  const message = gift?.message || 'Semoga harimu menyenangkan!'

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-[#FFF5FA]">
        <div className="p-6 text-center">
          <Sparkles
            size={32}
            strokeWidth={1.6}
            className="mx-auto mb-3 text-pink-400"
          />
          <p className="text-lg break-words font-medium text-neutral-800 leading-relaxed">
            {message}
          </p>
          <span className="mt-3 block text-xs text-neutral-400">
            Hadiah #{gift?.id ?? ''}
          </span>
        </div>

        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#3199DF] shadow-sm">
          <Check size={18} strokeWidth={2.5} />
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-neutral-400">Hadiah berhasil dipilih ♡</p>
      </div>
    </div>
  )
}
