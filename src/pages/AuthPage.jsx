import { useState } from 'react'
import { Heart, Loader2, LogIn, X } from 'lucide-react'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { supabase } from '../utils/supabaseClient'

export function AuthPage({ onLoginSuccess, onCancel }) {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')

const handleSubmit = async (event) => {
event.preventDefault()

if (!email.trim() || !password) {
  setError('Email dan password wajib diisi.')
  return
}

setLoading(true)
setError('')

try {
  const { data, error: signInError } =
    await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

  if (signInError) throw signInError

  onLoginSuccess?.(data?.user)
} catch (loginError) {
  setError(loginError.message || 'Login gagal. Silakan coba lagi.')
} finally {
  setLoading(false)
}

}

return (
<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4 py-10 sm:px-6">
<section className="relative w-full max-w-md overflow-hidden rounded-2xl border border-pink-100 bg-white">
<div className="p-6 sm:p-8">
{onCancel && (
<button
           type="button"
           onClick={onCancel}
           aria-label="Tutup login"
           disabled={loading}
           className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-pink-50 hover:text-pink-600 disabled:opacity-50"
         >
<X size={19} />
</button>
)}

      <div className="mb-8 text-center">
        <div className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
          <Heart size={25} strokeWidth={1.7} />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">
          Our Memories
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Selamat Datang
        </h1>

        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-neutral-500">
          Masuk ke akun kamu untuk melanjutkan dan menyimpan kenangan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="auth-email"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Email
          </label>

          <Input
            id="auth-email"
            type="email"
            placeholder="nama@contoh.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label
            htmlFor="auth-password"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Password
          </label>

          <Input
            id="auth-password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            disabled={loading}
            required
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-100 bg-red-50 px-4 py-3"
          >
            <p className="text-sm leading-5 text-red-600">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Login
            </>
          )}
        </Button>
      </form>
    </div>

    <div className="border-t border-pink-100 bg-pink-50/50 px-6 py-4 text-center sm:px-8">
      <p className="text-xs leading-5 text-neutral-500">
        Masuk kembali dan lanjutkan menyimpan momen berharga.
      </p>
    </div>
  </section>
</main>

)
}