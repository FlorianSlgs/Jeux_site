// Remplacer Link de react-router-dom par Link de next/link
import Link from 'next/link'
import Image from 'next/image' // Pour optimiser les images dans Next.js

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-4">
          {/* Logo et nom du site */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/idees.png" // L'image doit être dans le dossier public
                alt="Quiz à plusieurs" 
                width={40}
                height={40}
                className="object-cover" 
              />
              <span className="text-2xl font-bold text-indigo-600">Quiz multijoueur</span>
            </Link>  
          </div>
        </div>
      </div>
    </header>
  )
}