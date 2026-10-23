import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { animate } from 'animejs'
import { Check } from 'lucide-react'

import { GachaHeader } from './gacha/GachaHeader'
import { GiftResult } from './gacha/GiftResult'
import { RouletteTrack } from './gacha/RouletteTrack'
import { DrawButton, ResetButton } from './gacha/DrawButton'
import { getUniqueGifts, getRouletteItems } from '../../utils/gachaUtils'

export function GachaGift({ gift, isOpened = false, onOpen, gifts = [], openedGiftIds = [] }) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [isStopping, setIsStopping] = useState(false)
  const [selectedGift, setSelectedGift] = useState(null)

  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const animationRef = useRef(null)
  const positionRef = useRef({ x: 0 })
  const winnerRef = useRef(null)
  const drawingRef = useRef(false)
  const stoppingRef = useRef(false)

  const giftList = useMemo(() => getUniqueGifts(gifts, gift), [gift, gifts])
  const availableGifts = useMemo(() => {
    return giftList.filter((item) => {
      if (item.isOpened || item.opened || openedGiftIds.includes(item.id)) return false
      if (isOpened && !gifts.length && item.id === gift?.id) return false
      return true
    })
  }, [giftList, gifts.length, isOpened, gift?.id, openedGiftIds])

  const itemWidth = 100
  const itemGap = 8
  const itemStep = itemWidth + itemGap
  const cycleWidth = availableGifts.length * itemStep
  const rouletteItems = useMemo(() => getRouletteItems(availableGifts), [availableGifts])

  const stopAnimation = useCallback(() => {
    animationRef.current?.pause()
    animationRef.current = null
  }, [])

  useEffect(() => () => stopAnimation(), [stopAnimation])

  const startDraw = () => {
    if (drawingRef.current || !availableGifts.length || !viewportRef.current || !trackRef.current) return

    const winner = availableGifts[Math.floor(Math.random() * availableGifts.length)]
    winnerRef.current = winner
    setSelectedGift(null)
    setIsStopping(false)
    stoppingRef.current = false
    drawingRef.current = true
    setIsDrawing(true)
    stopAnimation()

    positionRef.current.x = 0
    trackRef.current.style.transform = 'translateX(0px)'

    const totalDistance = cycleWidth * 4

    animationRef.current = animate(positionRef.current, {
      x: -totalDistance,
      duration: 7000,
      ease: 'linear',
      onUpdate: () => {
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${positionRef.current.x}px)`
        }
      },
    })
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
    const targetCycle = Math.min(currentCycle + 1, 5)
    const targetIndex = targetCycle * availableGifts.length + winnerIndex
    const targetX = -(targetIndex * itemStep + itemWidth / 2 - viewportWidth / 2)
    const destination = Math.min(targetX, currentX - cycleWidth)

    animationRef.current = animate(positionRef.current, {
      x: destination,
      duration: 1600,
      ease: 'out(4)',
      onUpdate: () => {
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${positionRef.current.x}px)`
        }
      },
      onComplete: () => {
        drawingRef.current = false
        stoppingRef.current = false
        setIsDrawing(false)
        setIsStopping(false)
        setSelectedGift(winner)
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
    <section className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-[#F0F7FA] shadow-[0_3px_18px_rgba(67,112,140,0.08)]">
      <GachaHeader selectedGift={selectedGift} isDrawing={isDrawing} isStopping={isStopping} />
      <div className="px-4 pb-5 sm:px-5">
        {selectedGift ? (
          <GiftResult gift={selectedGift} />
        ) : availableGifts.length ? (
          <RouletteTrack viewportRef={viewportRef} trackRef={trackRef} rouletteItems={rouletteItems} isDrawing={isDrawing} />
        ) : (
          <div className="flex flex-col items-center rounded-xl bg-white px-5 py-8 text-center"><Check size={30} className="text-[#3199DF]" /><p className="mt-3 font-semibold text-neutral-800">All gifts have been opened</p><p className="mt-1 text-sm text-neutral-500">Thank you for enjoying every surprise ♡</p></div>
        )}
        {!selectedGift && availableGifts.length > 0 && (<DrawButton onClick={isDrawing ? stopDraw : startDraw} isDrawing={isDrawing} isStopping={isStopping} />)}
        {selectedGift && availableGifts.length > 0 && (<ResetButton onClick={resetDraw} />)}
      </div>
    </section>
  )
}

