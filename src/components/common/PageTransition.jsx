import { useRef, useEffect } from 'react'
import { animate, createScope } from 'animejs'

export function PageTransition({ children }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const scope = createScope({ root: rootRef.current }).add((self) => {
      animate('[data-page-anim]', {
        opacity: [0, 1],
        translateY: ['24px', '0px'],
        duration: 600,
        ease: 'out(2)',
      })
    })

    return () => scope.revert()
  }, [])

  return (
    <div ref={rootRef} className="w-full min-h-screen">
      {children}
    </div>
  )
}