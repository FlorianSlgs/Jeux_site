import { Metadata } from 'next'
import ClientAccordion from '../components/ClientAccordion'

export const metadata = {
  title: 'FAQ - Quiz Multijoueur en Ligne | Questions sur notre Jeu de Quiz Interactif',
  description: 'Découvrez toutes les réponses à vos questions sur notre quiz multijoueur en ligne. Le meilleur jeu de quiz interactif pour vos soirées entre amis, en famille ou entre collègues.',
  keywords: 'quiz, multijoueur, en ligne, jeu de quiz, soirées entre amis, famille, collègues, interactif, temps réel, à plusieurs, meilleur quiz',
  openGraph: {
    title: 'FAQ - Quiz Multijoueur en Ligne | Questions sur notre Jeu de Quiz Interactif',
    description: 'Toutes les réponses sur notre quiz multijoueur en ligne pour vos soirées entre amis, en famille ou entre collègues.',
    type: 'website',
  },
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Foire Aux Questions 🤔
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur notre jeu de quiz multijoueur en ligne
          </p>
        </div>
      </div>

      {/* Main FAQ Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">
            Questions Fréquentes sur notre Quiz en Ligne 📚
          </h2>

          <ClientAccordion 
            title="Comment fonctionne le mode multijoueur ?"
            defaultOpen={true}
          >
            <div className="text-gray-700">
              <div>Notre quiz en temps réel permet de jouer instantanément avec plusieurs joueurs. Il suffit de :</div>
              <ol className="list-decimal pl-5 mt-3 space-y-2">
                <li>Choisir une catégorie</li>
                <li>Partager le code choisi avec vos amis</li>
                <li>Attendre que tous les joueurs rejoignent</li>
                <li>Lancer la partie et jouer ensemble en temps réel !</li>
              </ol>
            </div>
          </ClientAccordion>

          <ClientAccordion 
            title="Combien de personnes peuvent jouer simultanément ?"
            defaultOpen={false}
          >
            <div className="text-gray-700">
              <div>Notre plateforme est optimisée pour accueillir des groupes de joueurs simultanément, 
              ce qui en fait le choix parfait pour :</div>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Les soirées entre amis</li>
                <li>Les réunions familiales</li>
                <li>Les team buildings entre collègues</li>
                <li>Les animations de groupe</li>
              </ul>
            </div>
          </ClientAccordion>

          <ClientAccordion 
            title="Quelles sont les différentes catégories de quiz disponibles ?"
            defaultOpen={false}
          >
            <div className="text-gray-700">
              <div>Nous proposons une large variété de catégories pour satisfaire tous les joueurs :</div>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Culture générale</li>
                <li>Sport</li>
                <li>Divertissement</li>
                <li>Géographie</li>
                <li>Histoire</li>
                <li>Sciences</li>
              </ul>
            </div>
          </ClientAccordion>

          <ClientAccordion 
            title="Le quiz est-il gratuit ?"
            defaultOpen={false}
          >
            <div className="text-gray-700">
              Notre quiz interactif est entièrement gratuit. Vous pouvez jouer autant de fois que vous 
              le souhaitez avec vos amis, votre famille ou vos collègues sans aucun frais.
            </div>
          </ClientAccordion>

          <ClientAccordion 
            title="Comment fonctionne le système de points ?"
            defaultOpen={false}
          >
            <div className="text-gray-700">
              <div>Notre système de points est conçu pour être équitable et stimulant :</div>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Vous gagnez 1 point par bonne réponse</li>
                <li>Vous perdez 1 points par mauvaises réponses</li>
                <li>Vous ne gagnez pas et ne perdez pas pour les non-réponses</li>
                <li>Classement en temps réel</li>
                <li>Premier à 5 points gagne</li>
              </ul>
            </div>
          </ClientAccordion>

          <ClientAccordion 
            title="Peut-on jouer sur mobile ?"
            defaultOpen={false}
          >
            <div className="text-gray-700">
              <div>Absolument ! Notre quiz est entièrement responsive et optimisé pour :</div>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Smartphones</li>
                <li>Tablettes</li>
                <li>Ordinateurs portables</li>
                <li>Ordinateurs de bureau</li>
              </ul>
              <div className="mt-3">Aucune installation n&apos;est nécessaire, il suffit d&apos;avoir un navigateur web !</div>
            </div>
          </ClientAccordion>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-8">
            Prêt à jouer avec vos amis ? 🎮
          </h2>
          <form action="/categories">
            <button 
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              COMMENCER UNE PARTIE 🎯
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}