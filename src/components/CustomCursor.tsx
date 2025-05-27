'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SYMBOLS = [
  {
    id: 'sun',
    size: 17,
    color: '#FFD700',
    radius: 24,
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#FFD700]">
        <circle cx="12" cy="12" r="5" />
      </svg>
    ),
  },
  {
    id: 'moon',
    size: 15,
    color: '#1A1A1A',
    radius: 30,
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#1A1A1A]">
        <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1021 12.79z" />
      </svg>
    ),
  },
  {
    id: 'star1',
    size: 11,
    color: '#FBEEC1',
    radius: 36,
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#FBEEC1]">
        <polygon points="12,0 15,9 24,9 17,14 20,23 12,17 4,23 7,14 0,9 9,9" />
      </svg>
    ),
  },
  {
    id: 'star2',
    size: 10,
    color: '#B87333',
    radius: 42,
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#B87333]">
        <polygon points="12,0 14,8 22,8 15,13 18,22 12,17 6,22 9,13 2,8 10,8" />
      </svg>
    ),
  },
  {
    id: 'star3',
    size: 10,
    color: '#E9D5A1',
    radius: 48,
    svg: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E9D5A1]">
        <polygon points="12,0 14,8 22,8 15,13 18,22 12,17 6,22 9,13 2,8 10,8" />
      </svg>
    ),
  },
]

export default function CustomCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const x = useSpring(cursorX, { damping: 40, stiffness: 400 })
  const y = useSpring(cursorY, { damping: 40, stiffness: 400 })

  const [hovering, setHovering] = useState(false)
  const angleRef = useRef(0)
  const requestRef = useRef<number | null>(null)

  const springPositions = useRef(
    SYMBOLS.map(() => ({
      x: useSpring(0, { damping: 40, stiffness: 100 }),
      y: useSpring(0, { damping: 40, stiffness: 100 }),
    }))
  ).current

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const detectHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const isHover = el.closest('[data-cursor="hover"]') !== null
      setHovering(isHover)
    }

    window.addEventListener('mousemove', updateMouse)
    window.addEventListener('mouseover', detectHover)
    return () => {
      window.removeEventListener('mousemove', updateMouse)
      window.removeEventListener('mouseover', detectHover)
    }
  }, [])

  // 🌀 Animation orbitale
  useEffect(() => {
    const animate = () => {
      angleRef.current += 0.6

      SYMBOLS.forEach((symbol, i) => {
        const angle = (360 / SYMBOLS.length) * i + angleRef.current
        const rad = (angle * Math.PI) / 180

        const offsetX = Math.cos(rad) * symbol.radius
        const offsetY = Math.sin(rad) * symbol.radius

        const targetX = hovering
          ? cursorX.get() // absorption
          : cursorX.get() + offsetX

        const targetY = hovering
          ? cursorY.get()
          : cursorY.get() + offsetY

        springPositions[i].x.set(targetX)
        springPositions[i].y.set(targetY)
      })

      requestRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(requestRef.current!)
  }, [cursorX, cursorY, hovering])

  return (
    <>
      {/* Curseur central */}
      <motion.div
        className="fixed z-[9999] pointer-events-none"
        style={{ translateX: x, translateY: y, x: '-50%', y: '-50%' }}
      >
        <div
          className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
            hovering ? 'w-7 h-7' : 'w-2 h-2 bg-bleu'
          }`}
        >
          {hovering && (
            <>
              <div className="absolute w-full h-full rounded-full border-2 border-yellow-400" />
              <div className="absolute animate-spin-slow w-[150%] h-[150%]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {[...Array(10)].map((_, i) => {
                    const a = (i * 360) / 10
                    const rad = (a * Math.PI) / 180
                    const x = 50 + 38 * Math.cos(rad)
                    const y = 50 + 38 * Math.sin(rad)
                    const dx = 6 * Math.cos(rad)
                    const dy = 6 * Math.sin(rad)
                    return (
                      <line
                        key={i}
                        x1={x}
                        y1={y}
                        x2={x + dx}
                        y2={y + dy}
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    )
                  })}
                </svg>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Objets orbitaux */}
      {SYMBOLS.map((symbol, i) => (
        <motion.div
          key={symbol.id}
          className="fixed z-[9998] pointer-events-none"
          style={{
            translateX: springPositions[i].x,
            translateY: springPositions[i].y,
            width: symbol.size,
            height: symbol.size,
          }}
          animate={{
            opacity: hovering ? 0 : 1,
            scale: hovering ? 0.2 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {symbol.svg}
        </motion.div>
      ))}
    </>
  )
}
