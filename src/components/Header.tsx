import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-beige text-bleu shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" data-cursor="hover" className="flex items-center space-x-2">
        
          <div className="relative w-48 h-32">
          <Image
            src="/logo.png"
            alt="Logo Margaux Jacquet"
            fill
            className="object-contain"
            priority
          />
        </div>

        </Link>
        <nav className="space-x-14 font-semibold self-end mb-4">
          <Link href="/a-propos" data-cursor="hover">À propos de moi</Link>
          <Link href="/prestations" data-cursor="hover">Prestations proposées</Link>
          <Link href="/contact" data-cursor="hover">Demande de contact</Link>

        </nav>
      </div>
    </header>
  )
}
