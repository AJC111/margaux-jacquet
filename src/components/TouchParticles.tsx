'use client'

import { useEffect, useRef, useState } from 'react'

export default function TouchParticles() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const container = containerRef.current
    if (!container) return

    const colors = ['#E9D5A1', '#B87333', '#FFD700', '#FBEEC1', '#ECC440', '#FFFA8A']

    const createExplosion = (x: number, y: number) => {
      for (let i = 0; i < 48; i++) {
        const particle = document.createElement('div')
        particle.className = 'touch-particle'

        // Couleur aléatoire
        const color = colors[Math.floor(Math.random() * colors.length)]
        particle.style.backgroundColor = color

        // Taille aléatoire (1 à 3 px)
        const size = 1 + Math.random() * 3
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Direction aléatoire
        const angle = Math.random() * Math.PI * 2
        const speed = 40 + Math.random() * 40
        const offsetX = Math.cos(angle) * speed
        const offsetY = Math.sin(angle) * speed

        particle.style.left = `${x}px`
        particle.style.top = `${y}px`
        particle.style.setProperty('--x', `${offsetX}px`)
        particle.style.setProperty('--y', `${offsetY}px`)

        container.appendChild(particle)
        setTimeout(() => container.removeChild(particle), 800)
      }
    }

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0]
      createExplosion(touch.clientX, touch.clientY)
    }

    window.addEventListener('touchstart', handleTouch)
    return () => {
      window.removeEventListener('touchstart', handleTouch)
    }
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  )
}
