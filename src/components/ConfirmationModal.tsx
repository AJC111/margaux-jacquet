'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ConfirmationModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      const audio = new Audio('/confirmation.mp3')
      audio.play()
      const timer = setTimeout(() => onClose(), 6000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Poussières étoilées */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                backgroundImage: 'radial-gradient(white 1px, transparent 0)',
                backgroundSize: '10px 10px',
              }}
            />

            <h2 className="text-xl font-semibold text-center text-bleu mb-4">Message envoyé ✅</h2>
            <p className="text-center text-sm text-gray-600">Merci pour votre message ! Margaux vous répondra très vite ✨</p>

            <div className="mt-6 text-center">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-bleu text-white hover:bg-bleu/90 transition"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
