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
  if (!slug) {
    console.warn(`[PrestationCard] Aucun slug fourni pour la prestation "${title}"`)
  }

  return (
    <a
      href={slug ? `/prestations#${slug}` : '#'}
      data-cursor="hover"
      className="group block w-full bg-[#FAF9F3] rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_0px_rgba(255,215,0,0)] hover:shadow-[0_0_24px_rgba(255,215,0,0.15)]"
    >
      <div className="flex flex-col md:flex-row min-h-[220px] md:min-h-[240px]">
        {image && (
          <div className="w-full md:w-64 flex items-center justify-center py-6 px-4">
            <Image
              src={urlFor(image).width(400).height(400).url()}
              alt={title}
              width={160}
              height={160}
              className="object-contain max-h-[160px] w-auto h-auto"
            />
          </div>
        )}

        <div className="p-6 flex flex-col justify-center items-start gap-3 flex-1 max-w-[700px] md:max-w-[800px]">
          <h2 className="text-2xl font-semibold text-bleu">{title}</h2>
          <p className="text-md text-bleu/80 leading-relaxed whitespace-pre-line text-justify">
            {description}
          </p>
        </div>
      </div>
    </a>
  )
}
