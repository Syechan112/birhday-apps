import { Gift, Images, LogIn, LogOut, Menu, Upload, X } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

export function Navbar({ activePage, onNavigate, session, onNavigateAuth }) {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { id: 'gallery', label: 'Galeri', Icon: Images },
    { id: 'birthday', label: 'Birthday', Icon: Gift },
    ...(session ? [{ id: 'upload', label: 'Upload Foto', Icon: Upload }] : []),
  ]

  const navigate = (page) => {
    onNavigate(page)
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
  }

  const navItemClass = (isActive) =>
    `inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
      isActive
        ? 'bg-pink-50 text-pink-600'
        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
    }`

  const mobileItemClass = (isActive) =>
    `flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors ${
      isActive
        ? 'bg-pink-50 text-pink-600'
        : 'text-neutral-600 hover:bg-neutral-50'
    }`

  return (
    <header className="fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2">
      <nav
        className="relative flex min-h-16 items-center justify-between rounded-2xl bg-white/95 px-4 backdrop-blur-xl sm:px-6"
        aria-label="Navigasi utama"
      >
        <button
          type="button"
          onClick={() => navigate('gallery')}
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2"
        >
          <span className="block text-sm font-bold tracking-tight text-neutral-950">
            Birthday Hilda<span className="text-pink-500">.</span>
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
            Memory lane
          </span>
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {navigation.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              aria-current={activePage === id ? 'page' : undefined}
              className={navItemClass(activePage === id)}
            >
              <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
              {label}
            </button>
          ))}

          {session ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
            >
              <LogOut size={16} strokeWidth={1.8} aria-hidden="true" />
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigateAuth?.()}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-pink-500 px-4 text-sm font-medium text-white transition-colors hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2"
            >
              <LogIn size={16} strokeWidth={1.8} aria-hidden="true" />
              Login
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={isOpen}
          className="inline-flex size-10 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 sm:hidden"
        >
          {isOpen ? (
            <X size={21} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-2xl bg-white p-3 shadow-lg shadow-neutral-950/5 sm:hidden">
          <div className="flex flex-col gap-1">
            {navigation.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => navigate(id)}
                aria-current={activePage === id ? 'page' : undefined}
                className={mobileItemClass(activePage === id)}
              >
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                {label}
              </button>
            ))}

            {session ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-pink-600"
              >
                <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  onNavigateAuth?.()
                }}
                className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-pink-600 transition-colors hover:bg-pink-50"
              >
                <LogIn size={17} strokeWidth={1.8} aria-hidden="true" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}