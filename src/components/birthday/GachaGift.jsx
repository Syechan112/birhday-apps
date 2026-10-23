import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { animate } from 'animejs'
import { CalendarClock, Check } from 'lucide-react'

import { GachaHeader } from './gacha/GachaHeader'
import { GiftResult } from './gacha/GiftResult'
import { RouletteTrack } from './gacha/RouletteTrack'
import { DrawButton, ResetButton } from './gacha/DrawButton'
import { getUniqueGifts, getRouletteItems } from '../../utils/gachaUtils'
import { birthdayConfig } from '../../data/birthdayConfig'
import { getTimeUntilBirthday } from '../../utils/birthdayCountdown'

const MAX_DRAWS = 3
const STORAGE_KEY = 'birthday-gacha-draws'

export function GachaGift({ gift, isOpened = false, onOpen, gifts = [], openedGiftIds = [] }) {
  const todayKey = new Date().toISOString().slice(0, 10)

  const [drawCount, setDrawCount] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      return saved.date === todayKey ? saved.count : 0
    } catch {
      return 0
    }
  })
  const [isDrawing, setIsDrawing] = useState(false)
  const [isStopping, setIsStopping] = useState(false)
  const [selectedGift, setSelectedGift] = useState(null)
  const [countdownDays, setCountdownDays] = useState(() =>
    getTimeUntilBirthday(birthdayConfig.birthdayDate).days,
  )

  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const animationRef = useRef(null)
  const positionRef = useRef({ x: 0 })
  const winnerRef = useRef(null)
  const drawingRef = useRef(false)
  const stoppingRef = useRef(false)

  const giftList = useMemo(() => getUniqueGifts(gifts, gift), [gift, gifts])
  const availableGifts = useMemo(() => giftList.filter((item) =>
    !item.isOpened && !item.opened && !openedGiftIds.includes(item.id) &&
    !(isOpened && !gifts.length && item.id === gift?.id),
  ), [giftList, gifts.length, isOpened, gift?.id, openedGiftIds])

  const itemWidth = 100
  const itemGap = 8
  const itemStep = itemWidth + itemGap
  const cycleWidth = availableGifts.length * itemStep
  const rouletteItems = useMemo(() => getRouletteItems(availableGifts), [availableGifts])
  const locked = drawCount >= MAX_DRAWS

  useEffect(() => {
    const timer = window.setInterval(() => {
      const today = new Date().toISOString().slice(0, 10)
      if (today !== todayKey) {
        setDrawCount(0)
        localStorage.removeItem(STORAGE_KEY)
      }
      setCountdownDays(getTimeUntilBirthday(birthdayConfig.birthdayDate).days)
    }, 60_000)
    return () => window.clearInterval(timer)
  }, [todayKey])

  const stopAnimation = useCallback(() => {
    animationRef.current?.pause()
    animationRef.current = null
  }, [])

  useEffect(() => () => stopAnimation(), [stopAnimation])

  const startDraw = () => {
    if (drawingRef.current || locked || !availableGifts.length || !viewportRef.current || !trackRef.current) return

    winnerRef.current = availableGifts[Math.floor(Math.random() * availableGifts.length)]
    setSelectedGift(null)
    setIsStopping(false)
    stoppingRef.current = false
    drawingRef.current = true
    setIsDrawing(true)
    stopAnimation()
    positionRef.current.x = 0
    trackRef.current.style.transform = 'translateX(0px)'

    const spin = () => {
      if (!drawingRef.current || !trackRef.current) return
      animationRef.current = animate(positionRef.current, {
        x: positionRef.current.x - cycleWidth,
        duration: 1800,
        ease: 'linear',
        onUpdate: () => {
          if (trackRef.current) trackRef.current.style.transform = `translateX(${positionRef.current.x}px)`
        },
        onComplete: spin,
      })
    }
    spin()
  }

  const stopDraw = () => {
    if (!drawingRef.current || stoppingRef.current || !winnerRef.current || !viewportRef.current || !trackRef.current) return

    stoppingRef.current = true
    setIsStopping(true)
    stopAnimation()

    const winner = winnerRef.current
    const winnerIndex = availableGifts.findIndex((item) => item.id === winner.id)
    if (winnerIndex < 0 || cycleWidth <= 0) {
      drawingRef.current = false
      stoppingRef.current = false
      setIsDrawing(false)
      setIsStopping(false)
      return
    }

    const viewportWidth = viewportRef.current.clientWidth
    const currentX = positionRef.current.x
    const currentCycle = Math.floor(Math.abs(currentX) / cycleWidth)
    const targetCycle = currentCycle + 1
    const targetIndex = targetCycle * availableGifts.length + winnerIndex
    const targetX = -(targetIndex * itemStep + itemWidth / 2 - viewportWidth / 2)
    const destination = Math.min(targetX, currentX - cycleWidth)

    animationRef.current = animate(positionRef.current, {
      x: destination,
      duration: 1600,
      ease: 'out(4)',
      onUpdate: () => {
        if (trackRef.current) trackRef.current.style.transform = `translateX(${positionRef.current.x}px)`
      },
      onComplete: () => {
        drawingRef.current = false
        stoppingRef.current = false
        setIsDrawing(false)
        setIsStopping(false)
        setSelectedGift(winner)
        setDrawCount((previous) => {
          const next = Math.min(previous + 1, MAX_DRAWS)
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, count: next }))
          return next
        })
        onOpen?.(winner.id)
      },
    })
  }

  const resetDraw = () => {
    if (drawingRef.current) return
    stopAnimation()
    winnerRef.current = null
    positionRef.current.x = 0
    setSelectedGift(null)
    setIsDrawing(false)
    setIsStopping(false)
    drawingRef.current = false
    stoppingRef.current = false
    if (trackRef.current) trackRef.current.style.transform = 'translateX(0px)'
  }

  return (
    <section className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
      <GachaHeader selectedGift={selectedGift} isDrawing={isDrawing} isStopping={isStopping} />
      <div className="px-4 pb-5 sm:px-5">
        {locked ? (
          <div className="flex flex-col items-center rounded-xl bg-pink-50 px-5 py-8 text-center">
            <CalendarClock size={28} className="text-pink-500" />
            <p className="mt-3 font-semibold text-neutral-900">Semua 3 hadiah sudah dibuka</p>
            <p className="mt-1 text-sm leading-6 text-neutral-600">
              Draw berikutnya tersedia dalam {countdownDays} hari, saat ulang tahun berikutnya.
            </p>
          </div>
        ) : selectedGift ? (
          <GiftResult gift={selectedGift} />
        ) : availableGifts.length ? (
          <RouletteTrack viewportRef={viewportRef} trackRef={trackRef} rouletteItems={rouletteItems} isDrawing={isDrawing} />
        ) : (
          <div className="flex flex-col items-center rounded-xl bg-neutral-50 px-5 py-8 text-center">
            <Check size={28} className="text-pink-500" />
            <p className="mt-3 font-semibold text-neutral-900">Semua hadiah sudah dibuka</p>
          </div>
        )}

        {!locked && !selectedGift && availableGifts.length > 0 && (
          <DrawButton onClick={isDrawing ? stopDraw : startDraw} isDrawing={isDrawing} isStopping={isStopping} drawCount={drawCount} maxDraws={MAX_DRAWS} />
        )}
        {!locked && selectedGift && <ResetButton onClick={resetDraw} />}
      </div>
    </section>
  )
}
