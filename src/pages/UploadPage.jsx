import { ImagePlus, Loader2, Upload, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { supabase } from '../utils/supabaseClient'

export function UploadPage({ onSuccess, onClose }) {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview) }
  }, [preview])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return
    if (!selectedFile.type.startsWith('image/')) {
      setError('File harus berupa gambar.')
      return
    }
    setFile(selectedFile)
    setError('')
    setPreview(URL.createObjectURL(selectedFile))
  }

  const handleUploadSubmit = async (event) => {
    event.preventDefault()
    if (!file) {
      setError('Pilih foto terlebih dahulu.')
      return
    }

    const fileToUpload = file
    const titleToUpload = title.trim() || 'Tanpa Judul'
    const captionToUpload = caption.trim()

    // Langsung balik ke gallery (Background upload)
    onSuccess?.()
    setIsUploading(true)

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default'
      if (!cloudName) throw new Error('Cloudinary cloud name (VITE_CLOUDINARY_CLOUD_NAME) not configured.')

      const formData = new FormData()
      formData.append('file', fileToUpload)
      formData.append('upload_preset', uploadPreset)

      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })

      const uploadData = await uploadResponse.json()
      if (!uploadResponse.ok || !uploadData.secure_url) throw new Error('Upload Cloudinary gagal.')

      const { data: userData } = await supabase.auth.getUser()
      if (!userData?.user) throw new Error('Login diperlukan.')

      const { error: insertError } = await supabase.from('gallery_photos').insert({
        owner_id: userData.user.id,
        owner_email: userData.user.email,
        public_url: uploadData.secure_url,
        title: titleToUpload,
        caption: captionToUpload,
      })

      if (insertError) throw insertError
    } catch (err) {
      console.error('Background upload failed:', err)
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl">
        <section className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-pink-100 px-5 py-5 sm:px-7">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-pink-500"><ImagePlus size={17} /><span>Our Memories</span></div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Upload Foto</h1>
              <p className="mt-1 text-sm text-neutral-500">Tambahkan foto untuk menyimpan kenangan.</p>
            </div>
            {onClose && (
              <button type="button" onClick={onClose} disabled={isUploading} className="flex size-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-pink-50 hover:text-pink-600 disabled:opacity-50">
                <X size={20} />
              </button>
            )}
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-6 p-5 sm:p-7">
            <div>
              <label htmlFor="photo-file" className="mb-2 block text-sm font-medium text-neutral-700">Pilih Foto</label>
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-pink-100 bg-pink-50/30 transition-colors hover:bg-pink-50 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {preview ? (
                  <img src={preview} alt="Pratinjau" className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2"><Upload size={24} className="text-pink-400" /><span className="text-xs text-neutral-500">Klik untuk pilih gambar</span></div>
                )}
                <input ref={fileInputRef} id="photo-file" type="file" accept="image/*" onChange={handleFileChange} disabled={isUploading} className="hidden" />
              </div>
            </div>

            <div className="space-y-4">
              <div><label htmlFor="photo-title" className="mb-2 block text-sm font-medium text-neutral-700">Judul Kenangan</label><Input id="photo-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tulis judul yang berkesan..." disabled={isUploading} required /></div>
              <div><label htmlFor="photo-caption" className="mb-2 block text-sm font-medium text-neutral-700">Cerita Singkat</label><textarea id="photo-caption" value={caption} onChange={(e) => setCaption(e.target.value)} rows={3} placeholder="Apa yang terjadi di foto ini?" disabled={isUploading} className="w-full resize-none rounded-xl border border-pink-100 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 disabled:opacity-50" /></div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <Button type="submit" disabled={isUploading} className="w-full h-11">
              {isUploading ? <Loader2 className="animate-spin" /> : <><Upload size={18} /> Simpan Kenangan</>}
            </Button>
          </form>
        </section>
      </div>
    </main>
  )
}
