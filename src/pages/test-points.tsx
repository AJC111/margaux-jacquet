'use client'

import { motion } from 'framer-motion'

export default function TestOrbite() {
  const dotCount = 12
  const radius = 100

  return (
    <main className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-[400px] h-[400px]">
        {/* Orbit container */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: dotCount }).map((_, i) => {
            const angle = (i * 360) / dotCount
            const rad = (angle * Math.PI) / 180
            const x = Math.cos(rad) * radius
            const y = Math.sin(rad) * radius

            return (
              <motion.div
                key={i}
                className="absolute w-[10px] h-[10px] rounded-full"
                style={{
                  backgroundColor: '#FFD700',
                  top: `${y}px`,
                  left: `${x}px`,
                }}
                animate={{
                  scale: [1, 1.6, 1],
                  backgroundColor: ['#FFD700', '#B87333', '#FFD700'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
              />
            )
          })}
        </motion.div>

        {/* Point central visible */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </main>
  )
}
