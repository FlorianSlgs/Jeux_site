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
    </div>
  )
}