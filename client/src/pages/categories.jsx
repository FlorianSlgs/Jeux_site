import React from 'react';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const navigate = useNavigate();

  // Liste des catégories avec leurs icônes et couleurs
  const categories = [
    {
      name: "Culture Générale",
      icon: "🎓",
      color: "from-blue-500 to-blue-700",
      description: "Questions variées sur divers sujets"
    },
    {
      name: "Sciences",
      icon: "🔬",
      color: "from-green-500 to-green-700",
      description: "Physique, chimie, biologie et plus"
    },
    {
      name: "Histoire",
      icon: "📜",
      color: "from-yellow-500 to-yellow-700",
      description: "Événements et personnages historiques"
    },
    {
      name: "Géographie",
      icon: "🌍",
      color: "from-indigo-500 to-indigo-700",
      description: "Pays, capitales et découvertes"
    },
    {
      name: "Sport",
      icon: "⚽",
      color: "from-red-500 to-red-700",
      description: "Tous types de sports et compétitions"
    },
    {
      name: "Divertissement",
      icon: "🎮",
      color: "from-purple-500 to-purple-700",
      description: "Films, séries, jeux vidéo"
    }
  ];

  const handleCategorySelect = (category) => {
    navigate(`/quiz?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            Choisissez une catégorie
          </h1>
          <p className="text-gray-600">
            Sélectionnez un thème pour commencer le quiz
          </p>
        </div>

        {/* Grille de catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(category)}
              className={`
                bg-gradient-to-r ${category.color}
                p-6 rounded-lg shadow-lg
                transform hover:scale-105 transition-all duration-300
                text-white
                flex flex-col items-center
                group
              `}
            >
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <h3 className="text-xl font-bold mb-2">
                {category.name}
              </h3>
              <p className="text-sm opacity-90 text-center">
                {category.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;