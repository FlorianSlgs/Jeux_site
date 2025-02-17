import FeatureCard from './components/FeatureCard'
import ClientAccordion from './components/ClientAccordion'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Quiz à plusieurs en Ligne 🎮
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Défie tes amis dans des quiz interactifs en temps réel ! 
            Le meilleur jeu de quiz en ligne pour des soirées entre amis, 
            en famille ou entre collègues.
          </p>
          <form action="/categories">
            <button 
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              JOUER MAINTENANT 🎯
            </button>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">
          Pourquoi choisir notre quiz en ligne ? 🏆
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="⚡"
            title="Quiz rapide multijoueur"
            description="Parties rapides et dynamiques, parfaites pour jouer sur mobile ou ordinateur"
          />
          <FeatureCard 
            icon="📊"
            title="Classement en direct"
            description="Suivez votre progression et celle de vos adversaires en temps réel"
          />
          <FeatureCard 
            icon="🎯"
            title="Quiz personnalisable"
            description="Choisissez parmi différentes catégories pour des défis sur mesure"
          />
        </div>
        
        {/* Social Media Links */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          <a href="https://www.youtube.com/channel/UCSO2GEdXb4WqvLpjSUCkagw" target="_blank" rel="noopener noreferrer" 
             className="text-red-600 hover:text-red-700 transform hover:scale-110 transition-all duration-300">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/quizmultijoueurfr/" target="_blank" rel="noopener noreferrer" 
             className="text-pink-600 hover:text-pink-700 transform hover:scale-110 transition-all duration-300">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.tiktok.com/@quizmultijoueurfr" target="_blank" rel="noopener noreferrer" 
             className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-all duration-300">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* How to Play Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
            Comment jouer à un quiz multijoueur en ligne avec tes amis ou ta famille ? 🤔
          </h2>
          <div className="max-w-3xl mx-auto">
            <ClientAccordion 
              title="Guide rapide pour commencer"
              defaultOpen={false}
            >
              <ol className="list-decimal pl-5 space-y-2">
                <li>Cliquez sur "JOUER"</li>
                <li>Choisissez une catégorie</li>
                <li>Partagez le code de la partie avec vos amis ou votre famille</li>
                <li>Commencez à jouer ensemble !</li>
              </ol>
            </ClientAccordion>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Questions fréquentes sur nos jeux éducatifs en ligne 📚
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <ClientAccordion 
            title="Combien de joueurs peuvent participer ?"
            defaultOpen={false}
          >
            <p>Notre quiz interactif en temps réel permet de jouer à plusieurs simultanément, 
            idéal pour les soirées entre amis ou les jeux en ligne entre collègues. Que ce soit un quiz à 2 joueurs, 3 joueurs, 4 joueurs ou plus, ce quiz est fait pour vous.</p>
          </ClientAccordion>
        </div>
      </div>

      {/* Features Details */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
            Fonctionnalités du quiz 🚀
          </h2>
          <div className="max-w-3xl mx-auto">
            <ClientAccordion 
              title="Découvrez toutes nos fonctionnalités"
              defaultOpen={false}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Quiz sur mobile optimisé</li>
                <li>Classement en temps réel</li>
                <li>Différentes catégories de questions</li>
                <li>Mode multijoueur instantané</li>
                <li>Interface intuitive</li>
              </ul>
            </ClientAccordion>
          </div>
        </div>
      </div>

      {/* Navigation Buttons Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <a
              href="/faq"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              <span className="mr-2">FAQ</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
            <a
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full border-2 border-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              <span className="mr-2">Blog</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}