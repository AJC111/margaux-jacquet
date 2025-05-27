'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/imageBuilder'

type Props = {
  title: string
  description: string
  slug?: string
  image?: any
}

export default function PrestationCard({ title, description, slug, image }: Props) {
  // Log dev si slug manquant
  if (!slug) {
    console.warn(`[PrestationCard] Aucun slug fourni pour la prestation "${title}"`)
  }

  return (
    <a
      href={slug ? `/prestations#${slug}` : '#'}
      data-cursor="hover"
      className="group block w-full bg-[#FAF9F3] rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_0px_rgba(255,215,0,0)] hover:shadow-[0_0_24px_rgba(255,215,0,0.15)]"
    >
      <div className="flex flex-col md:flex-row">
        {image && (
          <div className="relative w-full md:w-64 h-56 md:h-auto">
            <Image
              src={urlFor(image).width(500).height(350).url()}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6 flex flex-col justify-center gap-2">
          <h2 className="text-2xl font-semibold text-bleu">{title}</h2>
          <p className="text-md text-bleu/80 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </a>
  )
}

