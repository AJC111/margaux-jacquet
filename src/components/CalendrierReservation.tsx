'use client'

import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type Props = {
  joursDisponibles: string[]
  placesMaxParJour: number
  reservationsExistantes: Record<string, number>
  onDateSelected: (date: string) => void
}

// Même fonction que dans Sanity pour corriger le bug UTC
const getLocalISODate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function CalendrierReservation({
  joursDisponibles,
  placesMaxParJour,
  reservationsExistantes,
  onDateSelected,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const isJourValide = (date: Date) => {
    const iso = getLocalISODate(date)
    const isDispo = joursDisponibles.includes(iso)
    const nbResas = reservationsExistantes[iso] || 0
    return isDispo && nbResas < placesMaxParJour
  }

  const handleClick = (date: Date) => {
    const iso = getLocalISODate(date)
    if (isJourValide(date)) {
      setSelected(iso)
      onDateSelected(iso)
    }
  }

  return (
    <div className="calendar-wrapper">
      <Calendar
        onClickDay={handleClick}
        tileDisabled={({ date }) => !isJourValide(date)}
        tileClassName={({ date }) => {
          const iso = getLocalISODate(date)
          const isSelected = selected === iso
          const isAvailable = isJourValide(date)
          return isAvailable
            ? isSelected
              ? 'selected-day'
              : 'available-day'
            : undefined
        }}
      />
    </div>
  )
}
