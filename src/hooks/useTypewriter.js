import { useState, useEffect, useCallback } from 'react'

export function useTypewriter(text, speed = 40, enabled = true) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const skip = useCallback(() => {
    setDisplayed(text)
    setIsComplete(true)
  }, [text])

  useEffect(() => {
    if (!enabled) {
      setDisplayed('')
      setIsComplete(false)
      return
    }

    if (!text) {
      setDisplayed('')
      setIsComplete(false)
      return
    }

    let i = 0
    setIsComplete(false)
    setDisplayed('')

    const interval = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, enabled])

  return { displayed, isComplete, skip }
}