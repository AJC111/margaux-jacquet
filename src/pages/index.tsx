import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/imageBuilder'
import Image from 'next/image'
import PrestationCard from '@/components/PrestationCard'
import SplitTextBlock from '@/components/SplitTextBlock'

interface PageAccueil {
  prenom?: string
  nom?: string
  photo?: any
  description: string
  prestations: {
    titre: string
    description: string
    image?: any
    slug?: { current: string }
  }[]
  citation?: {
    texte: string
    auteur?: string
  }
}

export default function Home({ page }: { page: PageAccueil }) {
  return (
    <main className="min-h-screen bg-beige text-bleu font-sans">

      {/* Présentation */}
      <section className="w-full bg-[#F4F1E8] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {page.photo && (
              <div className="relative w-[280px] h-[280px] flex-shrink-0 rounded-full overflow-hidden shadow-xl ring-4 ring-bleu">
                <Image
                  src={urlFor(page.photo).width(300).height(300).url()}
                  alt="Portrait de Margaux"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="text-left">
              <SplitTextBlock
                text={page.description}
                as="p"
                className="text-lg leading-relaxed whitespace-pre-line"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Citation */}
      {page.citation?.texte && (
        <section className="bg-[#FAF9F3] py-12 text-center">
          <SplitTextBlock
            text={`“${page.citation.texte}”`}
            as="blockquote"
            className="text-2xl italic text-bleu max-w-2xl mx-auto pl-6"
          />
          {page.citation.auteur && (
            <footer className="mt-4 text-sm text-bleu/70">— {page.citation.auteur}</footer>
          )}
        </section>
      )}

      {/* Prestations */}
      <section className="bg-[#F4F1E8] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14">Prestations disponibles</h2>

          <div className="space-y-14">
            {page.prestations?.map((presta, idx) => (
              <PrestationCard
                key={idx}
                title={presta.titre}
                description={presta.description}
                image={presta.image}
                slug={presta.slug?.current}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export async function getStaticProps() {
  const page = await client.fetch(`*[_type == "pageAccueil"][0]{
    prenom,
    nom,
    photo,
    description,
    citation,
    prestations[]{
      titre,
      description,
      slug,
      image
    }
  }`)

  return {
    props: { page },
    revalidate: 60,
  }
}
