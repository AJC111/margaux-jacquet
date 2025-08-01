import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/imageBuilder'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

type Prestation = {
  titre: string
  slug: { current: string }
  description: string
  prix: string
  image: any
}

const backgrounds = ['#F4F1E8', '#FAF9F3']

export default function PrestationsPage({ prestations }: { prestations: Prestation[] }) {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) {
        const yOffset = -80
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 200)
  }, [])

  return (
    <>
      <Head>
        <title>Prestations proposées – Margaux Jacquet</title>
        <meta
          name="description"
          content="Découvrez toutes mes prestations énergétiques proposées pour humains et animaux. Consultations à distance possibles."
        />
        <meta property="og:title" content="Prestations proposées – Margaux Jacquet" />
        <meta
          property="og:description"
          content="Découvrez toutes mes prestations énergétiques proposées pour humains et animaux. À distance ou en présentiel."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://margaux-jacquet.com/prestations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-bleu font-sans">
        <header className="py-24 bg-[#F4F1E8] text-center px-6">
          <h1 className="text-5xl font-bold mb-4">Prestations proposées</h1>
          <p className="text-md text-bleu/70 max-w-2xl mx-auto">
            Retrouvez ici toutes les prestations disponibles à distance, pour humains comme pour animaux.
          </p>
        </header>

        {prestations.map((presta, idx) => (
          <section
            key={presta.slug.current || idx}
            id={presta.slug.current}
            className="w-full py-20 px-6 relative"
            style={{ backgroundColor: backgrounds[idx % backgrounds.length] }}
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">
              {presta.image && (
                <div className="w-full md:w-[40%] flex-shrink-0">
                  <div className="relative w-full overflow-hidden rounded-[8px] shadow-lg">
                    <Image
                      src={urlFor(presta.image).url()}
                      alt={presta.titre}
                      width={800}
                      height={1000}
                      className="w-full h-auto object-contain rounded-[8px]"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-4 text-justify">
                <h2 className="text-3xl font-bold">{presta.titre}</h2>
                <p className="text-md font-medium text-bleu/70">Prix : {presta.prix} €</p>
                <p className="text-md leading-relaxed whitespace-pre-line">{presta.description}</p>
              </div>
            </div>

            {idx < prestations.length - 1 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <svg width="40" height="40" viewBox="0 0 100 100" className="opacity-40">
                  <circle cx="50" cy="50" r="2" fill="#FFD700" />
                  <circle cx="50" cy="30" r="1" fill="#B87333" />
                  <circle cx="50" cy="70" r="1" fill="#B87333" />
                  <circle cx="30" cy="50" r="1" fill="#E9D5A1" />
                  <circle cx="70" cy="50" r="1" fill="#E9D5A1" />
                </svg>
              </div>
            )}
          </section>
        ))}
      </main>
    </>
  )
}

export async function getStaticProps() {
  const prestations = await client.fetch(`*[_type == "prestation"] | order(_createdAt asc){
    titre,
    slug,
    description,
    prix,
    image
  }`)

  return {
    props: {
      prestations,
    },
    revalidate: 60,
  }
}
