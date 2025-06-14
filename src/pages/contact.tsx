'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'

export default function PageContact() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  })

  const [envoye, setEnvoye] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      playSound()
      triggerParticles()
      setEnvoye(true)
      setFormData({ nom: '', prenom: '', email: '', telephone: '', sujet: '', message: '' })
      timeoutRef.current = setTimeout(() => setEnvoye(false), 6000)
    } else {
      alert('Une erreur est survenue, veuillez réessayer.')
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
    setEnvoye(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  return (
    <main className="min-h-screen bg-[#FAF9F3] text-bleu px-6 pt-14 pb-16 flex items-center justify-center relative">
      <div id="particles-container" className="absolute inset-0 pointer-events-none z-40" />

      <AnimatePresence>
        {envoye && (
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
                ✨ Merci pour votre message, je vous répondrai rapidement !
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

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl space-y-12 relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-tanpearl text-center"
        >
          Me contacter
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Champ label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
            <Champ label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Champ label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <Champ
              label="Téléphone"
              name="telephone"
              type="tel"
              pattern="\d{10}"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <Champ label="Sujet" name="sujet" placeholder="(optionnel)" value={formData.sujet} onChange={handleChange} />
          <Champ
            label="Message"
            name="message"
            textarea
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="pt-6 text-center">
            <button
              type="submit"
              className="bg-[#101F44] text-white px-8 py-3 rounded-full hover:bg-[#1c2a61] transition-all duration-300 text-lg tracking-wide"
            >
              Envoyer
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  )
}

// Composant générique pour chaque champ
function Champ({
  label,
  name,
  type = 'text',
  textarea = false,
  required = false,
  pattern,
  placeholder,
  value,
  onChange,
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
  required?: boolean
  pattern?: string
  placeholder?: string
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
          rows={5}
          placeholder={placeholder}
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
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="rounded-2xl border border-[#DDD6C9] bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
        />
      )}
    </div>
  )
}
