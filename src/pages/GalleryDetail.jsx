import { ArrowLeft, CalendarDays, Heart, Image as ImageIcon, Pencil, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export function GalleryDetail({ slug, session, onBack }) {
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editCaption, setEditCaption] = useState('')
  const [isSaving, setIsSaving] = useState(false)

          const isOwner =
    !!(session?.user && photo && photo.owner_id === session.user.id) ||
    !!(session?.user && photo && photo.owner_email === session.user.email)

  useEffect(() => {
    if (!slug) {
      setError('Slug foto tidak tersedia.')
      setLoading(false)
      return
    }

    const loadPhoto = async () => {
      const { data, error: fetchError } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

      if (fetchError) {
        setError(fetchError.message || 'Query gagal.')
      } else if (data) {
        setPhoto(data)
      } else {
        setError('Foto tidak ditemukan atau slug tidak valid.')
      }
      setLoading(false)
    }

    loadPhoto()
  }, [slug])

  useEffect(() => {
    if (photo) {
      setEditTitle(photo.title || '')
      setEditCaption(photo.caption || '')
    }
  }, [photo])

  const startEditing = () => {
    setEditTitle(photo?.title || '')
    setEditCaption(photo?.caption || '')
    setIsEditing(true)
  }

  const saveEdit = async () => {
    if (!photo || !session) return
    setIsSaving(true)
    const { error: updateError } = await supabase
      .from('gallery_photos')
      .update({
        title: editTitle.trim() || 'Kenangan',
        caption: editCaption.trim(),
      })
      .eq('id', photo.id)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setPhoto((prev) => ({ ...prev, title: editTitle.trim() || 'Kenangan', caption: editCaption.trim() }))
    setIsEditing(false)
    setIsSaving(false)
  }

  const deletePhoto = async () => {
    if (!session || !photo) return
    const confirmed = window.confirm('Hapus foto ini secara permanen?')
    if (!confirmed) return

    const { error: deleteError } = await supabase
      .from('gallery_photos')
      .delete()
      .eq('id', photo.id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }
    onBack()
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-pink-50 hover:text-pink-600 sm:px-4 sm:py-2.5"
          >
            <ArrowLeft size={16} /> Kembali
          </button>
        </div>

        <section className="relative overflow-hidden rounded-2xl border border-pink-100 bg-white">
          <button
            type="button"
            onClick={onBack}
            className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-neutral-500 shadow-md transition-colors hover:bg-pink-50 hover:text-pink-600 sm:right-4 sm:top-4 sm:size-10"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>

          {loading ? (
            <div className="p-5 sm:p-8">
              <div className="aspect-[4/3] w-full animate-pulse rounded-xl bg-pink-50" />
              <div className="mt-5 space-y-3">
                <div className="h-6 w-2/3 animate-pulse rounded bg-pink-50" />
                <div className="h-4 w-full animate-pulse rounded bg-pink-50" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-pink-50" />
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center px-6 py-14 text-center sm:py-18">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                <ImageIcon size={24} />
              </div>
              <h1 className="text-base font-semibold text-neutral-900">Foto tidak tersedia</h1>
              <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">{error}</p>
              <button
                type="button"
                onClick={onBack}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600"
              >
                <ArrowLeft size={15} /> Kembali
              </button>
            </div>
          ) : photo ? (
            <article>
              <div className="relative flex min-h-64 items-center justify-center bg-neutral-50 p-3 sm:p-6">
                <img
                  src={photo.public_url || photo.image}
                  alt={photo.title || 'Foto Galeri'}
                  className="max-h-[70vh] w-full rounded-xl object-contain"
                />
                <div className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-pink-500 sm:right-5 sm:top-5">
                  <Heart size={16} />
                </div>
              </div>

              <div className="p-4 sm:p-8">
                {isOwner && !isEditing && (
                  <div className="mb-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={startEditing}
                      className="inline-flex items-center gap-2 rounded-xl border border-pink-200 px-4 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-pink-50 hover:text-pink-600"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={deletePhoto}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={13} /> Hapus
                    </button>
                  </div>
                )}

                {isEditing && isOwner ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="edit-title" className="mb-1 block text-xs font-medium text-neutral-500">Judul</label>
                      <input
                        id="edit-title"
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        maxLength={120}
                        disabled={isSaving}
                        className="w-full rounded-xl border border-pink-100 px-4 py-2.5 text-base text-neutral-900 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-caption" className="mb-1 block text-xs font-medium text-neutral-500">Caption</label>
                      <textarea
                        id="edit-caption"
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        rows={3}
                        maxLength={1000}
                        disabled={isSaving}
                        className="w-full resize-y rounded-xl border border-pink-100 px-4 py-3 text-base text-neutral-900 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 disabled:opacity-50"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={saveEdit}
                        disabled={isSaving}
                        className="rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pink-600 disabled:opacity-50"
                      >
                        {isSaving ? 'Simpan...' : 'Simpan Perubahan'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="rounded-xl border border-pink-100 px-5 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-pink-50"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-5 flex items-center gap-2 text-sm font-medium text-pink-500">
                      <Heart size={16} />
                      <span>Our Memories</span>
                    </div>
                    <h1 className="break-words text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                      {photo.title || 'Kenangan'}
                    </h1>
                    {photo.created_at && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-pink-50 px-3 py-2 text-xs text-neutral-500 sm:text-sm">
                        <CalendarDays size={15} className="text-pink-500" />
                        <time dateTime={photo.created_at}>
                          {new Date(photo.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    )}
                    {photo.caption && (
                      <p className="mt-6 break-words text-sm leading-7 whitespace-pre-line text-neutral-600 sm:text-base">
                        {photo.caption}
                      </p>
                    )}
                  </>
                )}
              </div>
            </article>
          ) : null}
        </section>
      </div>
    </main>
  )
}
