import { useEffect, useRef, useState } from 'react'

function Reveal({ children, className = '', delay = 0, y = 24 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(true)
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
  }, [])

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
