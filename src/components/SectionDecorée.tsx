'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import OrnementFloral from './ornements/OrnementFloral'
import OrnementVague from './ornements/OrnementVague'
import OrnementEtoiles from './ornements/OrnementEtoiles'

type Props = {
  id?: string
  titre?: string
  fond?: 'beige' | 'crème' | 'bleu'
  ornement?: 'floral' | 'vague' | 'étoiles'
  children: ReactNode
}

export default function SectionDecorée({ id, titre, fond = 'beige', ornement, children }: Props) {
  const bgColor =
    fond === 'crème' ? '#F4F1E8' : fond === 'bleu' ? '#101F44' : '#FAF9F3'

  const Ornement =
    ornement === 'floral'
      ? OrnementFloral
      : ornement === 'vague'
      ? OrnementVague
      : ornement === 'étoiles'
      ? OrnementEtoiles
      : null

  return (
    <section
      id={id}
      className="w-full py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {Ornement && <Ornement className="absolute inset-0 opacity-10 z-0" />}

      <div className="max-w-6xl mx-auto relative z-10 space-y-6">
        {titre && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-semibold text-center text-bleu"
          >
            {titre}
          </motion.h2>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
