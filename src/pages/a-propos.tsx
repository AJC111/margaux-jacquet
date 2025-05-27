'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/imageBuilder'
import PortableTextBlock from '@/components/PortableTextBlock'
import HeroMargaux from '@/components/HeroMargaux'

type DonneesAPropos = {
  titre: string
  photo: any
  intro: string
  parcours: any[]
  motivation: any[]
  valeurs: any[]
  citation?: {
    texte: string
    auteur?: string
  }
}

export default function AProposPage({ data }: { data: DonneesAPropos }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-beige text-bleu font-sans">

      {/* SECTION : MON PARCOURS */}
        <section id="parcours" className="w-full px-6 py-24 bg-[#FAF9F3]">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-12">
    {/* Colonne gauche : Hero bien centré verticalement */}
    <div className="w-full md:w-[40%] flex justify-center md:justify-start md:items-center">
      <div className="py-6 md:py-8 flex items-center">
        <HeroMargaux photo={data.photo} />
      </div>
    </div>

    {/* Colonne droite : texte */}
    <div className="w-full md:w-[60%] space-y-6">
      <h2 className="text-2xl font-semibold text-bleu text-center md:text-left">
        Mon parcours
      </h2>
      <PortableTextBlock value={data.parcours} />
    </div>
  </div>
</section>

      {/* SECTION : MOTIVATION */}
      <section className="w-full py-20 px-6 bg-[#F4F1E8]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-center">Pourquoi ce métier ?</h2>
          <PortableTextBlock value={data.motivation} />
        </div>
      </section>

      {/* SECTION : VALEURS */}
      <section className="w-full py-20 px-6 bg-[#FAF9F3]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-center">Mes valeurs et mon approche</h2>
          <PortableTextBlock value={data.valeurs} />
        </div>
      </section>

      {/* SECTION : CITATION */}
      {data.citation?.texte && (
        <section className="w-full bg-[#F4F1E8] py-20 px-6 text-center relative">
          <blockquote className="max-w-3xl mx-auto text-xl italic text-bleu/80">
            “{data.citation.texte}”
            <span className="block mt-4 text-base not-italic text-bleu/50">
              — {data.citation.auteur || 'Margaux Jacquet'}
            </span>

            {/* Ornement décoratif */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <svg width="40" height="40" viewBox="0 0 100 100" className="opacity-30">
                <circle cx="50" cy="50" r="2" fill="#FFD700" />
                <circle cx="50" cy="30" r="1" fill="#B87333" />
                <circle cx="50" cy="70" r="1" fill="#B87333" />
                <circle cx="30" cy="50" r="1" fill="#E9D5A1" />
                <circle cx="70" cy="50" r="1" fill="#E9D5A1" />
              </svg>
            </div>
          </blockquote>
        </section>
      )}
    </main>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(`*[_type == "aPropos"][0]{
    titre,
    photo,
    intro,
    parcours,
    motivation,
    valeurs,
    citation { texte, auteur }
  }`)

  return {
    props: { data },
    revalidate: 60,
  }
}
