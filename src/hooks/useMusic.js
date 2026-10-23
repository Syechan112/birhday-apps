import { useState, useEffect, useRef, useCallback } from 'react'

export function useMusic(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audioRef.current = audio

    const playOnInteraction = () => {
      if (audioRef.current && !hasStarted) {
        setHasStarted(true)
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          setError(null)
        }).catch((e) => {
          setError(e)
          setIsPlaying(false)
        })
      }
    }

    document.addEventListener('click', playOnInteraction, { once: true })
    document.addEventListener('keydown', playOnInteraction, { once: true })

    return () => {
      document.removeEventListener('click', playOnInteraction)
      document.removeEventListener('keydown', playOnInteraction)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [src, hasStarted])

  const startMusic = useCallback(() => {
    if (audioRef.current && !hasStarted) {
      setHasStarted(true)
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        setError(null)
      }).catch((e) => {
        setError(e)
        setIsPlaying(false)
      })
    }
  }, [hasStarted])

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(setError)
    }
  }, [isPlaying])

  return { isPlaying, hasStarted, error, startMusic, toggleMusic }
}