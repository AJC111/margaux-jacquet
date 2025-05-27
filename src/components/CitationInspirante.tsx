'use client'

import { motion } from 'framer-motion'

export default function CitationInspirante({ texte, auteur }: { texte: string; auteur?: string }) {
  return (
    <section className="relative w-full py-24 px-6 bg-[#F4F1E8] overflow-hidden">
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/20 via-[#F4F1E8] to-[#F4F1E8] opacity-60 pointer-events-none" />

      {/* Citation */}
      <motion.blockquote
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center text-xl italic text-bleu relative z-10"
      >
        <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 24 24" fill="#FFD700">
          <path d="M5 13h4v-2H7c0-1.1.9-2 2-2h2V7H9C6.79 7 5 8.79 5 11v2zm10 0h4v-2h-2c0-1.1.9-2 2-2h2V7h-2c-2.21 0-4 1.79-4 4v2z" />
        </svg>
        “{texte}”
        <span className="block mt-4 text-base not-italic text-bleu/50">— {auteur}</span>
      </motion.blockquote>

      {/* Ornement bas */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          className="opacity-40"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <circle cx="50" cy="50" r="2" fill="#FFD700" />
          <circle cx="50" cy="30" r="1" fill="#B87333" />
          <circle cx="50" cy="70" r="1" fill="#B87333" />
          <circle cx="30" cy="50" r="1" fill="#E9D5A1" />
          <circle cx="70" cy="50" r="1" fill="#E9D5A1" />
        </motion.svg>
      </div>
    </section>
  )
}
