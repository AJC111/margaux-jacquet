'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PageContact() {
    
    // State pour le message d'envoi
    const [envoye, setEnvoye] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnvoye(true)
    setTimeout(() => setEnvoye(false), 4000)
  }

  return (
    <main className="min-h-screen bg-[#FAF9F3] text-bleu px-6 pt-16 pb-20 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-12">
        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Champ label="Nom" name="nom" />
            <Champ label="Prénom" name="prenom" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Champ label="Email" name="email" type="email" />
            <Champ label="Téléphone" name="telephone" />
          </div>

          <Champ label="Message" name="message" textarea />

          <div className="pt-6 text-center">
            <button
              type="submit"
              className="bg-[#101F44] text-white px-8 py-3 rounded-full hover:bg-[#1c2a61] transition-all duration-300 text-lg tracking-wide"
            >
              Envoyer
            </button>
          </div>
        </motion.form>
        )}
      </div>
    </main>
  )
}

// Composant champ formulaire
function Champ({
  label,
  name,
  type = 'text',
  textarea = false,
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-bleu">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          className="rounded-md border border-[#DDD6C9] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200 resize-none"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className="rounded-md border border-[#DDD6C9] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200"
        />
      )}
    </div>
  )
}
