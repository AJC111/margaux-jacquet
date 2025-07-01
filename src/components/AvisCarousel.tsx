'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/imageBuilder'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

interface AvisClient {
  nom: string
  profession?: string
  photo?: any
  commentaire: string
  note?: number
  date: string
}

interface AvisCarouselProps {
  avis: AvisClient[]
}

export default function AvisCarousel({ avis }: AvisCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && avis.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % avis.length)
      }, 5000) // Change slide every 5 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, avis.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10s
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? avis.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % avis.length
    goToSlide(newIndex)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    })
  }

  if (!avis || avis.length === 0) {
    return null
  }

  return (
    <section className="bg-gradient-to-br from-[#FAF9F3] to-[#F4F1E8] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-bleu mb-4">
            Témoignages clients
          </h2>
          <p className="text-lg text-bleu/70 max-w-2xl mx-auto">
            Découvrez ce que pensent mes clients de leur expérience
          </p>
        </div>

        <div className="relative">
          {/* Main carousel container */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl flex items-center justify-center min-h-[420px]">
            <div 
              className="flex transition-transform duration-700 ease-in-out w-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {avis.map((avis, index) => (
                <div key={index} className="w-full flex-shrink-0 flex items-center justify-center">
                  <div className="p-12 md:p-16 w-full">
                    <div className="max-w-4xl mx-auto flex flex-col justify-center items-center h-full">
                      {/* Quote icon */}
                      <div className="flex justify-center mb-8">
                        <Quote className="w-12 h-12 text-bleu/20" />
                      </div>

                      {/* Testimonial text */}
                      <blockquote className="text-base md:text-lg text-center text-bleu leading-relaxed mb-8 italic">
                        {avis.commentaire}
                      </blockquote>

                      {/* Rating - Only show if note exists */}
                      {avis.note && (
                        <div className="flex justify-center mb-8">
                          <div className="flex space-x-1">
                            {renderStars(avis.note)}
                          </div>
                        </div>
                      )}

                      {/* Client info */}
                      <div className="flex items-center justify-center space-x-6">
                        {avis.photo && (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-bleu/10">
                            <Image
                              src={urlFor(avis.photo).width(100).height(100).url()}
                              alt={`Photo de ${avis.nom}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="text-center">
                          <p className="font-semibold text-bleu text-lg">
                            {avis.nom}
                          </p>
                          {avis.profession && (
                            <p className="text-bleu/60 text-sm">
                              {avis.profession}
                            </p>
                          )}
                          <p className="text-bleu/40 text-xs mt-1">
                            {formatDate(avis.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          {avis.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 group"
                aria-label="Avis précédent"
              >
                <ChevronLeft className="w-6 h-6 text-bleu group-hover:text-bleu/80" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 group"
                aria-label="Avis suivant"
              >
                <ChevronRight className="w-6 h-6 text-bleu group-hover:text-bleu/80" />
              </button>
            </>
          )}

          {/* Dots navigation */}
          {avis.length > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {avis.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-bleu scale-125'
                      : 'bg-bleu/30 hover:bg-bleu/50'
                  }`}
                  aria-label={`Aller à l'avis ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Auto-play indicator */}
          {avis.length > 1 && (
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  isAutoPlaying 
                    ? 'bg-bleu/10 text-bleu' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isAutoPlaying ? 'Auto' : 'Pause'}
              </button>
            </div>
          )}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-bleu/60 text-sm">
            {avis.length} client{avis.length > 1 ? 's' : ''} satisfait{avis.length > 1 ? 's' : ''} partagent leur expérience, et vous ?
          </p>
        </div>
      </div>
    </section>
  )
}