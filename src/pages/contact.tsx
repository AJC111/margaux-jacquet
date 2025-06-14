'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PageContact() {
  const [envoye, setEnvoye] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        sujet: formData.get('sujet'),
        message: formData.get('message'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      setEnvoye(true)
      setTimeout(() => setEnvoye(false), 4000)
      e.currentTarget.reset()
    } else {
      alert('Une erreur est survenue, veuillez réessayer.')
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F3] text-bleu px-6 pt-14 pb-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl space-y-12"
      >
        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-tanpearl text-center"
        >
          Me contacter
        </motion.h1>

        {envoye ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-bleu text-xl bg-white/70 backdrop-blur-md border border-[#DDD6C9] py-6 px-4 rounded-xl shadow-sm"
          >
            ✅ Merci pour votre message, je vous répondrai rapidement !
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Champ label="Nom" name="nom" required />
              <Champ label="Prénom" name="prenom" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Champ label="Email" name="email" type="email" required />
              <Champ
                label="Téléphone"
                name="telephone"
                type="tel"
                pattern="\d{10}"
                placeholder="0612345678"
                required
              />
            </div>

            <Champ label="Sujet" name="sujet" placeholder="(optionnel)" />

            <Champ label="Message" name="message" textarea required />

            <div className="pt-6 text-center">
              <button
                type="submit"
                className="bg-[#101F44] text-white px-8 py-3 rounded-full hover:bg-[#1c2a61] transition-all duration-300 text-lg tracking-wide"
              >
                Envoyer
              </button>
            </div>
          </form>
        )}
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
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
  required?: boolean
  pattern?: string
  placeholder?: string
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
          className="rounded-2xl border border-[#DDD6C9] bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
        />
      )}
    </div>
  )
}
