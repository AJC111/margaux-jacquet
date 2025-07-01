'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/imageBuilder'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PhotoStackCarouselProps {
  images: Array<{
    asset: any
    alt?: string
    caption?: string
  }>
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function PhotoStackCarousel({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
}: PhotoStackCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const nextImage = useCallback(() => {
    if (isAnimating || images.length <= 1) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsAnimating(false), 800)
  }, [images.length, isAnimating])

  const prevImage = useCallback(() => {
    if (isAnimating || images.length <= 1) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsAnimating(false), 800)
  }, [images.length, isAnimating])

  // Gestion taille écran
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // AutoPlay mobile/desktop
  useEffect(() => {
  if (!autoPlay) return
  const interval = setInterval(nextImage, autoPlayInterval)
  return () => clearInterval(interval)
}, [autoPlay, autoPlayInterval, nextImage])


  // Touch swipe (mobile)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) nextImage()
    else if (distance < -minSwipeDistance) prevImage()
  }

  // Gestion clic mobile (tap sur zone gauche/droite)
  const handleMobileClick = (e: React.MouseEvent) => {
    if (!isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const middle = rect.width / 2
    if (x < middle) prevImage()
    else nextImage()
  }

  const getStackIndices = () => {
    const indices = []
    for (let i = 0; i < Math.min(images.length, 5); i++) {
      indices.push((currentIndex + i) % images.length)
    }
    return indices.reverse()
  }

  const stackIndices = getStackIndices()

  return (
    <section className="relative w-full h-screen bg-[#F4F1E8] overflow-hidden mb-8 pb-8 md:pb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-bleu mb-8 mt-8">Mon univers 🌟</h2>
      <div
        className="relative w-full h-full flex items-center justify-center px-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={handleMobileClick}
      >
        <div className="relative w-full h-[80vh] max-w-4xl mx-auto flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {stackIndices.map((imageIndex, stackPosition) => {
              const isTop = stackPosition === stackIndices.length - 1
              const zIndex = stackPosition + 1
              const seed = imageIndex * 12345
              const rotation = ((seed % 15) - 7) * (isTop ? 0.4 : 1)
              const offsetX = ((seed * 7) % 31) - 15
              const offsetY = ((seed * 11) % 21) - 10

              return (
                <motion.div
                  key={`${imageIndex}-${currentIndex}`}
                  className="absolute"
                  style={{ zIndex }}
                  initial={isTop ? {
                    scale: 0.9,
                    rotateZ: rotation * 2,
                    opacity: 0,
                    x: offsetX * 3,
                    y: offsetY * 3,
                  } : {}}
                  animate={{
                    scale: isTop ? 1 : 0.92 - (stackIndices.length - stackPosition - 1) * 0.03,
                    rotateZ: rotation,
                    opacity: isTop ? 1 : 0.7,
                    x: isTop ? 0 : offsetX,
                    y: isTop ? 0 : offsetY,
                  }}
                  exit={isTop ? {
                    scale: 0.9,
                    rotateZ: rotation * 2,
                    opacity: 0,
                    x: offsetX * 3,
                    y: offsetY * 3,
                  } : {}}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="relative max-w-[90vw] max-h-[75vh] overflow-hidden bg-white p-2 rounded shadow-xl">
                    <Image
                      src={urlFor(images[imageIndex].asset).url()}
                      alt={images[imageIndex].alt || ''}
                      width={800}
                      height={600}
                      className="w-auto h-auto max-w-[75vw] max-h-[65vh] object-contain"
                      priority={isTop}
                    />
                    {images[imageIndex].caption && isTop && (
                      <p className="text-sm text-bleu text-center mt-4">{images[imageIndex].caption}</p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Flèches (desktop) */}
        {!isMobile && images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              disabled={isAnimating}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-bleu p-3 rounded-full shadow-lg hover:scale-110 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              disabled={isAnimating}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-bleu p-3 rounded-full shadow-lg hover:scale-110 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </section>
  )
}
