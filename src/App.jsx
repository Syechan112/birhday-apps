import { useState } from 'react'
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation'
import { Gallery } from './pages/Gallery'
import { BirthdayPage } from './pages/BirthdayPage'

export default function App() {
  const [page, setPage] = useState('gallery')

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(255, 255, 255)"
      gradientBackgroundEnd="rgb(248, 252, 255)"
      firstColor="145, 180, 200"
      secondColor="49, 153, 223"
      blendingValue="normal"
      className="text-neutral-800"
    >
      {page === 'gallery' && <Gallery onStartBirthday={() => setPage('birthday')} />}
      {page === 'birthday' && <BirthdayPage onBackToGallery={() => setPage('gallery')} />}
    </BackgroundGradientAnimation>
  )
}
