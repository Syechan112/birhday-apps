import { Check, Sparkles } from 'lucide-react'
import { handleImageError } from '../../../utils/gachaUtils'

export function GiftResult({ gift }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E8F3F8]">
        <img src={gift.image} alt={gift.caption || `Hadiah ${gift.id}`} className="h-full w-full object-cover" onError={(event) => handleImageError(event, gift.id)} />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#3199DF] shadow-sm"><Check size={18} strokeWidth={2.5} /></span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2"><Sparkles size={15} className="shrink-0 text-[#3199DF]" /><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5286A4]">{gift.caption || 'Your Special Gift'}</p></div>
        <h3 className="mt-3 text-lg font-bold text-neutral-800">Hadiah #{gift.id}</h3>
        <p className="mt-2 break-words text-sm leading-6 text-neutral-600">{gift.message}</p>
        <p className="mt-4 text-xs text-neutral-400">Hadiah berhasil dipilih ♡</p>
      </div>
    </div>
  )
}
