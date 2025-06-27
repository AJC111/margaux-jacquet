'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/imageBuilder'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HeroMargaux({ photo }: { photo: any }) {
  const [radiusOffset, setRadiusOffset] = useState(20) // valeur par défaut desktop

  // Réduire l'éloignement des points orbitaux sur mobile
  useEffect(() => {
    const updateRadius = () => {
      setRadiusOffset(window.innerWidth < 768 ? 1 : 20)
    }
    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [])

  const dotCount = 82
  const imageSize = 290
  const minRadius = imageSize / 2 + radiusOffset

  return (
    <div className="relative w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] lg:w-[280px] lg:h-[280px]">
      {/* Points orbitaux */}
      {Array.from({ length: dotCount }).map((_, i) => {
        const layer = i % 3
        const radius = minRadius + layer * 24
        const angle = (i * 360) / dotCount
        const rad = (angle * Math.PI) / 180
        const x = Math.cos(rad) * radius
        const y = Math.sin(rad) * radius
        const size = 3 + Math.random() * 3
        const opacity = 0.4 + Math.random() * 0.4
        const delay = Math.random() * 2

        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              backgroundColor: '#FFD700',
              opacity,
              zIndex: 1,
            }}
            animate={{
              scale: [1, 1.5, 1],
              backgroundColor: ['#FFD700', '#B87333', '#FFD700'],
              opacity: [opacity, opacity - 0.1, opacity],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          />
        )
      })}

      {/* Photo introduction */}
      <div className="relative w-full h-full rounded-full overflow-hidden z-10">
        <Image
          src={urlFor(photo).width(800).height(800).url()}
          alt="Portrait de Margaux"
          fill
          className="object-cover grayscale"
        />
      </div>
    </div>
  )
}
