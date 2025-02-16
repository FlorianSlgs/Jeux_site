import ClientAccordion from '../../components/ClientAccordion'
import FeatureCard from '../../components/FeatureCard'
import Head from 'next/head'

export default function ArticleActivitesAmis() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* SEO Metadata */}
      <Head>
        <title>Pourquoi les activités entre amis sont essentielles ? | Jeux Quiz En Ligne</title>
        <meta 
          name="description" 
          content="Découvrez l'importance des moments partagés entre amis pour maintenir une vie sociale épanouie et enrichissante. Conseils et activités pour renforcer vos liens d'amitié." 
        />
        <meta 
          name="keywords" 
          content="activités entre amis, vie sociale, amitié, liens sociaux, bien-être social, jeux entre amis, quiz entre amis" 
        />
        <meta property="og:title" content="Pourquoi les activités entre amis sont essentielles ?" />
        <meta property="og:type" content="article" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Pourquoi les activités entre amis sont essentielles ? 🤝
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            L'importance des moments partagés entre amis pour maintenir une vie sociale épanouie et enrichissante.
            Découvrez comment renforcer vos liens d'amitié grâce aux activités de groupe.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">
          Les bienfaits des moments entre amis 🌟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🧠"
            title="Santé mentale"
            description="Réduction du stress et de l'anxiété grâce aux interactions sociales positives"
          />
          <FeatureCard 
            icon="💪"
            title="Soutien émotionnel"
            description="Un réseau social solide pour traverser les moments difficiles"
          />
          <FeatureCard 
            icon="🎉"
            title="Souvenirs mémorables"
            description="Création de moments inoubliables qui renforcent les liens d'amitié"
          />
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
            Comment entretenir ses amitiés au quotidien ? 💡
          </h2>
          <div className="max-w-3xl mx-auto">
            <ClientAccordion 
              title="Les clés d'une amitié durable"
              defaultOpen={true}
            >
              <ol className="list-decimal pl-5 space-y-4">
                <li>Maintenir un contact régulier, même à distance</li>
                <li>Organiser des activités de groupe régulières</li>
                <li>Être présent dans les moments importants</li>
                <li>Partager des expériences nouvelles ensemble</li>
              </ol>
            </ClientAccordion>
          </div>
        </div>
      </div>

      {/* Activities Suggestions */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Les meilleures activités à faire entre amis 🎯
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <ClientAccordion 
            title="Activités en ligne"
            defaultOpen={false}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>Quiz en ligne multijoueur</li>
              <li>Jeux de société virtuels</li>
              <li>Soirées visio thématiques</li>
              <li>Tournois de jeux en ligne</li>
            </ul>
          </ClientAccordion>
          
          <ClientAccordion 
            title="Activités en présentiel"
            defaultOpen={false}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>Sorties culturelles</li>
              <li>Activités sportives en groupe</li>
              <li>Soirées jeux de société</li>
              <li>Ateliers cuisine entre amis</li>
            </ul>
          </ClientAccordion>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
            L'impact des activités sociales sur notre bien-être 🌈
          </h2>
          <div className="max-w-3xl mx-auto">
            <ClientAccordion 
              title="Les bénéfices scientifiquement prouvés"
              defaultOpen={false}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Augmentation de la production d'endorphines</li>
                <li>Renforcement du système immunitaire</li>
                <li>Amélioration de la confiance en soi</li>
                <li>Développement des compétences sociales</li>
                <li>Réduction des risques de dépression</li>
              </ul>
            </ClientAccordion>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-b from-indigo-800 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Prêt à renforcer vos liens d'amitié ?
          </h2>
          <form action="/categories">
            <button 
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              JOUER AVEC VOS AMIS 🎮
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}