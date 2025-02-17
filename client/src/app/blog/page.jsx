import Link from 'next/link'
import FeatureCard from '../components/FeatureCard'

// Métadonnées pour le SEO
export const metadata = {
  title: 'Articles sur le Quiz Multijoueur en Ligne | Le Meilleur Quiz Interactif',
  description: 'Découvrez nos articles sur le jeu de quiz multijoueur en temps réel. Des conseils pour vos soirées entre amis, en famille ou entre collègues. Le quiz à plusieurs le plus interactif !',
  keywords: 'quiz, multijoueur, en ligne, jeu de quiz, soirées entre amis, famille, collègues, interactif, temps réel, à plusieurs, meilleur quiz',
}

const articles = [
  {
    title: "La culture générale : un atout majeur dans notre société",
    description: "Découvrez pourquoi la culture générale est essentielle pour votre développement personnel et professionnel.",
    icon: "🎓",
    link: "/blog/importance-culture-generale"
  },
  {
    title: "Les quiz : un outil efficace pour progresser en s'amusant",
    description: "Apprenez comment les quiz peuvent améliorer votre mémoire et vos connaissances tout en vous divertissant.",
    icon: "🎯",
    link: "/blog/benefices-quiz"
  },
  {
    title: "Pourquoi les activités entre amis sont essentielles ?",
    description: "L'importance des moments partagés entre amis pour maintenir une vie sociale épanouie et enrichissante.",
    icon: "🤝",
    link: "/blog/activites-entre-amis"
  }
]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Articles & Guides Quiz Multijoueur 📚
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tout savoir sur les quiz en ligne interactifs pour vos soirées 
            entre amis, moments en famille ou événements entre collègues.
          </p>
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">
          Nos articles du quiz en ligne 🏆
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link href={article.link} key={index}>
              <FeatureCard 
                icon={article.icon}
                title={article.title}
                description={article.description}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-indigo-600">
            Prêt à tester vos connaissances ? 🚀
          </h2>
          <form action="/categories">
            <button 
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              COMMENCER UN QUIZ 🎯
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}