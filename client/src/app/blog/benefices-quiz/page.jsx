import ClientAccordion from '../../components/ClientAccordion'
import FeatureCard from '../../components/FeatureCard'

// Add metadata for SEO
export const metadata = {
  title: "Les quiz : un outil efficace pour progresser en s'amusant | Quiz en Ligne",
  description: "Découvrez comment les quiz peuvent améliorer votre mémoire, vos connaissances et votre apprentissage tout en vous divertissant. Guide complet sur les bénéfices des jeux de quiz.",
  keywords: "quiz en ligne, apprentissage ludique, mémoire, connaissances, jeux éducatifs, quiz multijoueur",
}

export default function QuizBenefitsArticle() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Les quiz : un outil efficace pour progresser en s&apos;amusant 🎯
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Apprenez comment les quiz peuvent améliorer votre mémoire et vos connaissances 
            tout en vous divertissant. Une approche ludique de l&apos;apprentissage !
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">
              Pourquoi les quiz sont-ils si efficaces pour apprendre ? 🤔
            </h2>
            <p className="text-gray-700 mb-4">
              Les quiz représentent bien plus qu&apos;un simple divertissement. Ils constituent 
              un outil pédagogique puissant qui combine apprentissage et plaisir. Dans cet 
              article, découvrons ensemble les nombreux avantages des quiz pour votre 
              développement personnel et intellectuel.
            </p>
          </section>

          {/* Benefits Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-indigo-600 mb-8">
              Les principaux bénéfices des quiz 🌟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard 
                icon="🧠"
                title="Stimulation cognitive"
                description="Les quiz activent différentes zones du cerveau et renforcent les connexions neuronales"
              />
              <FeatureCard 
                icon="📚"
                title="Apprentissage actif"
                description="L&apos;interaction et le feedback immédiat favorisent une meilleure rétention des informations"
              />
              <FeatureCard 
                icon="🤝"
                title="Socialisation"
                description="Les quiz multijoueurs encouragent l&apos;interaction et l&apos;apprentissage collaboratif"
              />
              <FeatureCard 
                icon="🎮"
                title="Motivation"
                description="L&apos;aspect ludique et compétitif maintient l&apos;engagement et la motivation"
              />
            </div>
          </section>

          {/* Detailed Benefits */}
          <section className="space-y-6 mb-12">
            <ClientAccordion 
              title="Impact sur la mémoire et l&apos;apprentissage"
              defaultOpen={true}
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Les quiz utilisent le principe de la récupération active, une technique 
                  qui consiste à se remémorer activement des informations. Cette méthode est 
                  plus efficace que la simple relecture pour :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Renforcer la mémoire à long terme</li>
                  <li>Identifier les lacunes dans ses connaissances</li>
                  <li>Développer des connexions entre les concepts</li>
                  <li>Améliorer la capacité de concentration</li>
                </ul>
              </div>
            </ClientAccordion>

            <ClientAccordion 
              title="Aspects sociaux et motivationnels"
              defaultOpen={false}
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Le format multijoueur des quiz en ligne apporte une dimension sociale 
                  enrichissante à l&apos;apprentissage :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Création d&apos;une émulation positive entre les participants</li>
                  <li>Développement de l&apos;esprit d&apos;équipe</li>
                  <li>Renforcement des liens sociaux</li>
                  <li>Motivation accrue grâce à la compétition amicale</li>
                </ul>
              </div>
            </ClientAccordion>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">
              Prêt à améliorer vos connaissances en jouant ? 🚀
            </h2>
            <form action="/categories">
              <button 
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                COMMENCER UN QUIZ 🎯
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}