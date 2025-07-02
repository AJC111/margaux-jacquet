'use client'

import { GetServerSideProps } from 'next'
import CalendrierReservation from '@/components/CalendrierReservation'
import FormulaireReservation from '@/components/FormulaireReservation'
import { client } from '@/lib/sanity'
import { useState } from 'react'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  joursDisponibles: string[]
  placesMaxParJour: number
  reservationsExistantes: Record<string, number>
}

export default function ReservationPage({
  joursDisponibles,
  placesMaxParJour,
  reservationsExistantes,
}: Props) {
  const [dateSelectionnee, setDateSelectionnee] = useState<string | null>(null)

  return (
    <>
      <Head>
        <title>Prendre rendez-vous | Margaux Jacquet</title>
        <meta name="description" content="Prenez rendez-vous facilement avec Margaux Jacquet grâce à ce calendrier interactif." />
      </Head>

      <main className="min-h-screen py-16 px-4 md:px-12 bg-[#FAF9F3] text-bleu">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4">Prendre rendez-vous 🗓️</h1>
          <p className="text-base text-gray-700">Choisissez un jour disponible dans le calendrier ci-dessous 👇</p>
        </div>

        {/* Calendrier */}
        <div className="flex justify-center items-center mb-8">
          <CalendrierReservation
            joursDisponibles={joursDisponibles}
            placesMaxParJour={placesMaxParJour}
            reservationsExistantes={reservationsExistantes}
            onDateSelected={setDateSelectionnee}
          />
        </div>

        {/* Apparition dynamique du formulaire */}
        <AnimatePresence mode="wait">
          {dateSelectionnee && (
            <motion.div
              key={dateSelectionnee}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex justify-center"
            >
              <FormulaireReservation selectedDate={dateSelectionnee} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryPlanning = `*[_type == "planning"][0]{
    joursDisponibles,
    placesMaxParJour
  }`

  const queryReservations = `*[_type == "reservation"]{
    date
  }`

  const planning = await client.fetch(queryPlanning)
  const reservations: { date: string }[] = await client.fetch(queryReservations)

  const reservationsExistantes: Record<string, number> = {}
  for (const { date } of reservations) {
    reservationsExistantes[date] = (reservationsExistantes[date] || 0) + 1
  }

  return {
    props: {
      joursDisponibles: planning?.joursDisponibles || [],
      placesMaxParJour: planning?.placesMaxParJour || 3,
      reservationsExistantes,
    },
  }
}
