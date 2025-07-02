'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  selectedDate: string
}

const formatDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

export default function FormulaireReservation({ selectedDate }: Props) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: '',
  })

  const [envoye, setEnvoye] = useState(false)
  const [popupVisible, setPopupVisible] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Masquer automatiquement la pop-up après 5 secondes
  useEffect(() => {
    if (envoye) {
      const timeout = setTimeout(() => {
        setPopupVisible(false)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [envoye])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setError(null)

    const payload = { ...formData, date: selectedDate }

    try {
      const response = await fetch('/api/rendezvous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        playSound()
        triggerParticles()
        setEnvoye(true)
        setPopupVisible(true)
        setFormData({ nom: '', email: '', telephone: '', message: '' })
      } else {
        setError(result.message || 'Une erreur est survenue.')
      }
    } catch (err) {
      setError('Impossible d’envoyer la demande. Veuillez réessayer.')
    } finally {
      setIsSending(false)
    }
  }

  const playSound = () => {
    const audio = new Audio('/confirmation.mp3')
    audio.play().catch(() => {})
  }

  const triggerParticles = () => {
    const container = document.getElementById('particles-container')
    if (!container) return

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = '50%'
      particle.style.top = '50%'
      particle.style.setProperty('--x', `${Math.random() * 600 - 300}px`)
      particle.style.setProperty('--y', `${Math.random() * 600 - 300}px`)
      container.appendChild(particle)
      setTimeout(() => particle.remove(), 1200)
    }
  }

  const closePopup = () => {
    setPopupVisible(false)
  }

  return (
    <>
      <div id="particles-container" className="absolute inset-0 pointer-events-none z-40" />

      {/* POP-UP de confirmation */}
      <AnimatePresence>
        {envoye && popupVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-bleu px-6 py-5 rounded-2xl shadow-xl border border-[#DDD6C9] max-w-md text-center relative"
            >
              <p className="text-lg font-medium">
                ✨ Merci pour votre demande, je vous reconfirme ça rapidement par mail!
              </p>
              <button
                onClick={closePopup}
                className="mt-4 text-sm text-[#555] underline hover:text-bleu transition"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORMULAIRE */}
      <AnimatePresence>
        {selectedDate && !envoye && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full px-4 sm:px-6 md:px-8 max-w-4xl mx-auto mt-10 mb-20"
          >
            {/* En-tête */}
            <div className="text-center mb-10">
              <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-bleu">
                Et maintenant, le formulaire de réservation !
              </h1>
              <p className="text-sm md:text-base text-gray-700">
                Plus que quelques petites infos pour finaliser et m’envoyer votre demande ✍️
              </p>
              <p className="text-sm md:text-base text-gray-700">
                À la validation de ce formulaire, vous recevrez un email de confirmation. Je reviendrai vers vous rapidement.
              </p>
            </div>

            {/* Formulaire */}
            <motion.form
              onSubmit={handleSubmit}
              className="p-0 sm:p-6 md:p-8 bg-transparent sm:bg-white sm:rounded-2xl sm:shadow-xl space-y-5 w-full relative z-10"
            >
              <h2 className="text-lg md:text-xl font-semibold text-bleu mb-4">
                Demande de rendez-vous le <span className="font-bold">{formatDate(selectedDate)}</span>
              </h2>

              {error && <p className="text-red-600 font-semibold">{error}</p>}

              <Champ label="Nom complet" name="nom" value={formData.nom} onChange={handleChange} required />
              <Champ label="Adresse email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <Champ label="Téléphone" name="telephone" type="tel" pattern="[0-9]{10}" value={formData.telephone} onChange={handleChange} required />
              <Champ label="Message" name="message" textarea value={formData.message} onChange={handleChange} />

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSending}
                  className="bg-bleu text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition duration-200 disabled:opacity-60"
                >
                  {isSending ? 'Envoi en cours...' : 'Envoyer la demande ✨'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Champ({
  label,
  name,
  type = 'text',
  textarea = false,
  required = false,
  pattern,
  value,
  onChange,
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
  required?: boolean
  pattern?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-bleu">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          value={value}
          onChange={onChange}
          className="rounded-2xl border border-[#DDD6C9] bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200 resize-none shadow-sm hover:shadow-md"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          pattern={pattern}
          required={required}
          value={value}
          onChange={onChange}
          className="rounded-2xl border border-[#DDD6C9] bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
        />
      )}
    </div>
  )
}
