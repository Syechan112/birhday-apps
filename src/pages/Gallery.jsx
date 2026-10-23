import { ArrowRight, Camera, Heart, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../components/common/Button'
import { supabase } from '../utils/supabaseClient'

const PHOTOS_PER_PAGE = 12

export function Gallery({ onStartBirthday, onOpenPhoto }) {
const [photos, setPhotos] = useState([])
const [loading, setLoading] = useState(true)
const [loadingMore, setLoadingMore] = useState(false)
const [hasMore, setHasMore] = useState(true)

const getPage = useCallback(async (from, append = false) => {
const { data, error } = await supabase
.from('gallery_photos')
.select('*')
.order('created_at', { ascending: false })
.range(from, from + PHOTOS_PER_PAGE - 1)

if (error) {
  console.error('Gagal memuat galeri:', error.message)
  return false
}

const nextPhotos = data || []

setPhotos((previous) => {
  if (!append) return nextPhotos

  const existingIds = new Set(previous.map((photo) => photo.id))
  return [
    ...previous,
    ...nextPhotos.filter((photo) => !existingIds.has(photo.id)),
  ]
})

setHasMore(nextPhotos.length === PHOTOS_PER_PAGE)
return true

}, [])

useEffect(() => {
let active = true

const loadInitial = async () => {
  await getPage(0)
  if (active) setLoading(false)
}

loadInitial()

const channel = supabase
  .channel('gallery_photos_changes')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'gallery_photos' },
    (payload) => {
      setPhotos((previous) => [
        payload.new,
        ...previous.filter((photo) => photo.id !== payload.new.id),
      ])
    }
  )
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'gallery_photos' },
    (payload) => {
      setPhotos((previous) =>
        previous.map((photo) =>
          photo.id === payload.new.id ? payload.new : photo
        )
      )
    }
  )
  .on(
    'postgres_changes',
    { event: 'DELETE', schema: 'public', table: 'gallery_photos' },
    (payload) => {
      setPhotos((previous) =>
        previous.filter((photo) => photo.id !== payload.old.id)
      )
    }
  )
  .subscribe()

return () => {
  active = false
  supabase.removeChannel(channel)
}

}, [getPage])

const loadMore = async () => {
if (loadingMore || !hasMore) return

setLoadingMore(true)
await getPage(photos.length, true)
setLoadingMore(false)

}

return (
<section
   className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:px-8"
   data-page-anim
 >
<header className="rounded-2xl border border-pink-100 bg-white px-5 py-10 text-center sm:px-10 sm:py-14">
<div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-pink-600">
<Sparkles size={14} strokeWidth={1.7} />
Memory lane
</div>

    <h1 className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
      Galeri kenangan<span className="text-pink-500">.</span>
    </h1>

    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-500 sm:text-base">
      Beberapa potongan kecil dari cerita yang layak disimpan.
    </p>

    <div className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-xl border border-pink-100 px-4 py-2.5 text-sm text-neutral-600">
      <Camera size={16} className="text-pink-500" />
      <span>{photos.length} foto ditampilkan</span>
    </div>
  </header>

  <div className="rounded-2xl border border-pink-100 bg-white p-4 sm:p-6 lg:p-8">
    <div className="mb-6 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">
          Semua kenangan
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Koleksi foto yang tersimpan.
        </p>
      </div>

      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
        <Heart size={19} />
      </div>
    </div>

    <div className="mb-6 border-t border-pink-100" />

    {loading ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-pink-100"
          >
            <div className="aspect-[4/3] animate-pulse bg-pink-50" />
            <div className="space-y-3 p-4">
              <div className="h-3 w-1/3 animate-pulse rounded bg-pink-50" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-pink-50" />
              <div className="h-3 w-full animate-pulse rounded bg-pink-50" />
            </div>
          </div>
        ))}
      </div>
    ) : photos.length > 0 ? (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => onOpenPhoto?.(photo.slug)}
              className="group min-w-0 overflow-hidden rounded-xl border border-pink-100 bg-white text-left transition-colors hover:border-pink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-pink-50">
                <img
                  src={photo.public_url || photo.image}
                  alt={photo.caption || photo.title || 'Foto kenangan'}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.style.visibility = 'hidden'
                  }}
                />

                <span className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-lg bg-white/90 text-pink-500">
                  <Camera size={16} strokeWidth={1.8} />
                </span>
              </div>

              <div className="p-4">
                {photo.created_at && (
                  <p className="text-xs text-neutral-400">
                    {new Date(photo.created_at).toLocaleDateString(
                      'id-ID',
                      {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </p>
                )}

                <h3 className="mt-2 break-words text-base font-semibold text-neutral-900 transition-colors group-hover:text-pink-600">
                  {photo.title || 'Kenangan'}
                </h3>

                {photo.caption && (
                  <p className="mt-1 line-clamp-2 break-words text-sm leading-6 text-neutral-500">
                    {photo.caption}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center border-t border-pink-100 pt-6">
            <Button
              variant="secondary"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? 'Memuat...' : 'Lihat Lebih Banyak'}
            </Button>
          </div>
        )}
      </>
    ) : (
      <div className="flex flex-col items-center rounded-xl border border-dashed border-pink-200 px-5 py-14 text-center">
        <div className="flex size-14 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
          <Camera size={24} />
        </div>

        <h3 className="mt-4 font-semibold text-neutral-900">
          Belum ada kenangan di sini
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
          Foto yang tersimpan akan muncul di sini dan menjadi bagian dari
          cerita kamu.
        </p>
      </div>
    )}
  </div>

  <div className="rounded-2xl border border-pink-100 bg-white px-5 py-9 text-center sm:px-8 sm:py-10">
    <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
      <Heart size={22} strokeWidth={1.5} />
    </div>

    <h2 className="mt-5 text-lg font-semibold tracking-tight text-neutral-950 sm:text-xl">
      Ada kejutan ulang tahun untukmu.
    </h2>

    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
      Masih ada satu hal spesial yang menunggumu.
    </p>

    <Button onClick={onStartBirthday} className="group mt-6">
      Mulai Birthday Surprise
      <ArrowRight
        size={18}
        className="transition-transform group-hover:translate-x-1"
      />
    </Button>
  </div>
</section>

)
}