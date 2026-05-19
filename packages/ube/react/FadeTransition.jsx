import { useState, useEffect, useRef, forwardRef } from 'react'
import '@ulam/ube/core'

const DURATION_MS = 200

/**
 * React adapter for <ube-fade-transition>
 * Cross-fades between children when watchKey changes.
 *
 * Props match the original FadeTransition component API:
 *   children: ReactNode (content to display)
 *   watchKey: string | number (changing this triggers the transition)
 *   className: string (extra class on wrapper)
 *   prefersReducedMotion: function (optional, returns true if motion reduced)
 *   direction: 'ltr' | 'rtl' (optional, for slide transitions)
 *
 * Usage (same as before):
 *   <FadeTransition watchKey={pageId}>
 *     <PageComponent />
 *   </FadeTransition>
 */
const FadeTransition = forwardRef(function FadeTransition(
  {
    children,
    watchKey,
    className,
    prefersReducedMotion = () => false,
    direction,
    ...rest
  },
  ref
) {
  const [outgoing, setOutgoing] = useState(null)
  const [phase, setPhase] = useState('idle')
  const [activeDirection, setActiveDirection] = useState(null)
  const prevKeyRef = useRef(watchKey)
  const timerRef = useRef(null)

  useEffect(() => {
    if (prevKeyRef.current === watchKey) return
    prevKeyRef.current = watchKey

    if (prefersReducedMotion()) return

    setActiveDirection(direction ?? null)
    setOutgoing(children)
    setPhase('out')

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setOutgoing(null)
      setPhase('in')
      timerRef.current = setTimeout(() => setPhase('idle'), DURATION_MS)
    }, DURATION_MS)

    return () => clearTimeout(timerRef.current)
  }, [watchKey, direction, prefersReducedMotion])

  const dirMod = activeDirection ? ` fade-transition--${activeDirection}` : ''

  const cls = [
    'fade-transition',
    phase === 'in' ? `fade-transition--in${dirMod}` : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  if (phase === 'out' && outgoing) {
    return (
      <ube-fade-transition
        ref={ref}
        watch-key={String(watchKey)}
        direction={direction}
        className={`fade-transition fade-transition--out${dirMod}${className ? ` ${className}` : ''}`}
        {...rest}
      >
        {outgoing}
      </ube-fade-transition>
    )
  }

  return (
    <ube-fade-transition
      ref={ref}
      watch-key={String(watchKey)}
      direction={direction}
      className={cls}
      {...rest}
    >
      {children}
    </ube-fade-transition>
  )
})

FadeTransition.displayName = 'FadeTransition'
export default FadeTransition
