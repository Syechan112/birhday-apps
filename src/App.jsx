import { useEffect, useState } from 'react'
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation'
import { Navbar } from './components/common/Navbar'
import { Gallery } from './pages/Gallery'
import { GalleryDetail } from './pages/GalleryDetail'
import { BirthdayPage } from './pages/BirthdayPage'
import { UploadPage } from './pages/UploadPage'
import { AuthPage } from './pages/AuthPage'
import { supabase } from './utils/supabaseClient'

export default function App() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [page, setPage] = useState('gallery')
  const [selectedPhotoSlug, setSelectedPhotoSlug] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthReady(true)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setAuthReady(true)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleUploadSuccess = () => {
    setPage('gallery')
  }

  const handleUploadBefore = () => {
    if (!session) {
      setPage('auth')
      return
    }

    setPage('upload')
  }

  const renderPage = () => {
    if (!authReady) return null

    if (page === 'auth') {
      return (
        <AuthPage
          onLoginSuccess={() => setPage(session ? 'upload' : 'gallery')}
          onCancel={() => setPage('gallery')}
        />
      )
    }

    if (page === 'upload') {
      if (!session) {
        return (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-12 text-center">
            <p className="text-sm text-neutral-600">
              Kamu perlu login dulu untuk mengunggah foto.
            </p>
            <button
              type="button"
              onClick={() => setPage('auth')}
              className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-600"
            >
              Login
            </button>
          </div>
        )
      }

      return (
        <UploadPage
          onSuccess={handleUploadSuccess}
          onClose={() => setPage('gallery')}
        />
      )
    }

    if (page === 'birthday') {
      return <BirthdayPage onBackToGallery={() => setPage('gallery')} />
    }

    if (page === 'gallery-detail') {
      return (
        <GalleryDetail
          slug={selectedPhotoSlug}
          session={session}
          onBack={() => setPage('gallery')}
        />
      )
    }

    return (
      <Gallery
        onStartBirthday={() => setPage('birthday')}
        onOpenPhoto={(slug) => {
          setSelectedPhotoSlug(slug)
          setPage('gallery-detail')
        }}
      />
    )
  }

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(255, 255, 255)"
      gradientBackgroundEnd="rgb(255, 245, 249)"
      firstColor="255, 182, 193"
      secondColor="255, 220, 232"
      blendingValue="normal"
      className="text-neutral-800"
    >
      <Navbar
        activePage={page}
        onNavigate={setPage}
        session={session}
        onNavigateAuth={() => setPage('auth')}
      />
      {renderPage()}
    </BackgroundGradientAnimation>
  )
}