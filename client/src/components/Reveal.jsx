import { useEffect, useRef, useState } from 'react'

function Reveal({ children, className = '', delay = 0, y = 24 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const element = ref.current
    if (!element || visible) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      className={`reveal-shell ${visible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={{
        '--reveal-delay': `${delay}s`,
        '--reveal-y': `${y}px`,
      }}
    >
      {children}
    </div>
  )
}

export default Reveal
