import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/imageBuilder'
import Head from 'next/head'
import Image from 'next/image'
import PrestationCard from '@/components/PrestationCard'
import SplitTextBlock from '@/components/SplitTextBlock'
import AvisCarousel from '@/components/AvisCarousel'
import PhotoStackCarousel from '@/components/PhotoStackCarousel'

interface AvisClient {
  nom: string
  profession?: string
  photo?: any
  commentaire: string
  note?: number
  date: string
}

interface CarouselImage {
  asset: any
  alt?: string
  caption?: string
}

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

interface HomeProps {
  page: PageAccueil
  avisClients: AvisClient[]
  carouselImages: CarouselImage[]
}

export default function Home({ page, avisClients, carouselImages }: HomeProps) {
  return (
    <>
      <Head>
        <title>Accueil - Margaux Jacquet</title>
        <meta name="description" content="Bienvenue sur le site de Margaux Jacquet, découvrez mes prestations, avis clients et plus encore." />
        <meta property="og:title" content="Accueil - Margaux Jacquet" />
        <meta property="og:description" content="Bienvenue sur le site de Margaux Jacquet, découvrez mes prestations, avis clients et plus encore." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.margaux-jacquet.com/" />
      </Head>

      <main className="min-h-screen bg-beige text-bleu font-sans">

        {/* Présentation */}
        <section className="w-full bg-[#FAF9F3] py-24">
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
                  className="text-lg leading-relaxed whitespace-pre-line text-justify"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Carrousel d’images */}
        {carouselImages && carouselImages.length > 0 && (
          <PhotoStackCarousel images={carouselImages} />
        )}

        {/* Citation */}
        {page.citation?.texte && (
          <section className="bg-[#FAF9F3] py-12 text-center">
            <SplitTextBlock
              text={`"${page.citation.texte}"`}
              as="blockquote"
              className="text-2xl italic text-bleu max-w-2xl mx-auto pl-6"
            />
            {page.citation.auteur && (
              <footer className="mt-4 text-sm text-bleu/70">— {page.citation.auteur}</footer>
            )}
          </section>
        )}

        {/* Avis Clients */}
        {avisClients && avisClients.length > 0 && (
          <AvisCarousel avis={avisClients} />
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
    </>
  )
}

export async function getStaticProps() {
  const [page, avisClients, carouselImages] = await Promise.all([
    // Page d'accueil
    client.fetch(`*[_type == "pageAccueil"][0]{
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
    }`),

    // Avis clients visibles
    client.fetch(`*[_type == "avisClient" && visible == true] | order(ordre asc, date desc) {
      nom,
      profession,
      photo,
      commentaire,
      note,
      date
    }`),

    // Images du carrousel
    client.fetch(`*[_type == "carouselImage"] | order(_createdAt asc) {
      asset,
      alt,
      caption
    }`)
  ])

  return {
    props: {
      page: page || {},
      avisClients: avisClients || [],
      carouselImages: carouselImages || [],
    },
    revalidate: 60,
  }
}
