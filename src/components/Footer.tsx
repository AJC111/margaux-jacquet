import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  const displayYear = year > 2025 ? `2025 - ${year}` : `${year}`

  return (
    <footer className="bg-[#F4F1E8] text-bleu text-sm py-10 px-6 border-t border-bleu/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Texte gauche */}
        <p className="text-center md:text-left">
          © {displayYear} Margaux Jacquet — Tous droits réservés.
        </p>

        {/* Lien contact + auteur */}
        <p className="text-center md:text-right">
          <Link href="/cgv" data-cursor="hover" className="underline underline-offset-4 hover:text-bleu">
          Conditions Générales de Vente
          </Link>{' '}·{' '}
          
          <Link href="/contact" data-cursor="hover" className="underline underline-offset-4 hover:text-bleu">
            Contact
          </Link>{' '}
          · Réalisé par{' '}
          <a
            href="http://aimery.fr"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="underline underline-offset-4 hover:text-bleu"
          >
            Aimery Javoy-Corbin
          </a>
        </p>
      </div>
    </footer>
  )
}
