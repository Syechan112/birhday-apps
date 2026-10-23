import { useState, useEffect, useRef, useCallback } from 'react'

export function useMusic(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!src) return undefined

    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'metadata'
    audioRef.current = audio

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      setError(audio.error?.message || 'File musik tidak dapat diputar.')
      setIsPlaying(false)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)

    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src])

  const startMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false

    try {
      await audio.play()
      setError(null)
      return true
    } catch (playError) {
      setError(playError?.message || 'Browser menolak pemutaran musik.')
      setIsPlaying(false)
      return false
    }
  }, [])

  const stopMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
  }, [])

  const toggleMusic = useCallback(async () => {
    if (isPlaying) {
      audioRef.current?.pause()
      return false
    }

    return startMusic()
  }, [isPlaying, startMusic])

  return { isPlaying, error, startMusic, stopMusic, toggleMusic }
}
