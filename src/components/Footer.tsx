import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  const displayYear = year > 2025 ? `2025 - ${year}` : `${year}`

  return (
    <footer className="bg-[#F4F1E8] text-bleu text-sm py-10 px-6 border-t border-bleu/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Zone gauche : logo Instagram */}
        <div className="flex-shrink-0">
          <a
            href="https://www.instagram.com/margaux.jacquet.bleuet"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            data-cursor="hover"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo-instagram.png" 
              alt="Instagram"
              width={54}
              height={54}
              className="object-contain"
            />
          </a>
        </div>

        {/* Zone droite : liens CGV, contact, auteur */}
        <p className="text-center md:text-right">
          <Link href="/cgv" data-cursor="hover" className="underline underline-offset-4 hover:text-bleu">
            Conditions Générales de Vente
          </Link>{' '}·{' '}
          <Link href="/contact" data-cursor="hover" className="underline underline-offset-4 hover:text-bleu">
            Contact
          </Link>{' '}· Réalisé par{' '}
          {/*
          <a
            href="http://aimery.fr"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="underline underline-offset-4 hover:text-bleu"
          >
            Aimery Javoy-Corbin
          </a>
          */}
          Aimery Javoy-Corbin
        </p>

        {/* Zone centrale : Copyright */}
        <p className="text-center md:text-left">
          © {displayYear} Margaux Jacquet — Tous droits réservés.
        </p>

      </div>
    </footer>
  )
}
