import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState({
    faq: false,
    howTo: false,
    features: false
  });

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Quiz à plusieurs En Ligne 🎮
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Défie tes amis dans des quiz interactifs en temps réel ! 
            Le meilleur jeu de quiz en ligne pour des soirées entre amis, 
            en famille ou entre collègues.
          </p>
          <button 
            onClick={() => navigate('/categories')}
            className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            JOUER MAINTENANT 🎯
          </button>
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
            <Accordion 
              title="Guide rapide pour commencer"
              isOpen={isOpen.howTo}
              onClick={() => setIsOpen({...isOpen, howTo: !isOpen.howTo})}
            >
              <ol className="list-decimal pl-5 space-y-2">
                <li>Cliquez sur "JOUER"</li>
                <li>Choisissez une catégorie</li>
                <li>Partagez le code de partie avec vos amis ou votre famille</li>
                <li>Commencez à jouer ensemble !</li>
              </ol>
            </Accordion>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Questions fréquentes sur nos jeux éducatifs en ligne 📚
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <Accordion 
            title="Combien de joueurs peuvent participer ?"
            isOpen={isOpen.faq}
            onClick={() => setIsOpen({...isOpen, faq: !isOpen.faq})}
          >
            <p>Notre quiz interactif en temps réel permet de jouer à plusieurs simultanément, 
            idéal pour les soirées entre amis ou les jeux en ligne entre collègues. Que ce soit un quiz à 4 joueurs, 6 joueurs, 2 joueurs, ou plus ou moins, ce quiz est fait pour vous.  </p>
          </Accordion>
        </div>
      </div>

      {/* Features Details */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
            Fonctionnalités du quiz 🚀
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion 
              title="Découvrez toutes nos fonctionnalités"
              isOpen={isOpen.features}
              onClick={() => setIsOpen({...isOpen, features: !isOpen.features})}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Quiz sur mobile optimisé</li>
                <li>Classement en temps réel</li>
                <li>Différentes catégories de questions</li>
                <li>Mode multijoueur instantané</li>
                <li>Interface intuitive</li>
              </ul>
            </Accordion>
          </div>
        </div>
      </div>

    </div>
  );
}

// Composant FeatureCard
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-indigo-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Composant Accordion
function Accordion({ title, children, isOpen, onClick }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button 
        className="w-full px-4 py-3 text-left font-semibold bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
        onClick={onClick}
      >
        {title}
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div className={`transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
        <div className="p-4 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Home;