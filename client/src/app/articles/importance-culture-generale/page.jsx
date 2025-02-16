import ClientAccordion from '../../components/ClientAccordion'
import FeatureCard from '../../components/FeatureCard'

export const metadata = {
    title: 'La culture générale : un atout majeur dans notre société | Quiz en ligne',
    description: 'Découvrez pourquoi la culture générale est essentielle pour votre développement personnel et professionnel. Conseils et méthodes pour améliorer vos connaissances.',
    keywords: 'culture générale, développement personnel, quiz culturel, apprentissage, connaissances, éducation',
    openGraph: {
      title: 'La culture générale : un atout majeur dans notre société',
      description: 'Découvrez pourquoi la culture générale est essentielle pour votre développement personnel et professionnel.',
      type: 'article',
      publishedTime: '2025-02-16T15:02:29Z',
      authors: ['FlorianSlgs'],
      images: [
        {
          url: '/images/culture-generale.jpg', // Assurez-vous d'avoir cette image dans votre dossier public
          width: 1200,
          height: 630,
          alt: 'La culture générale : un atout majeur',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'La culture générale : un atout majeur dans notre société',
      description: 'Découvrez pourquoi la culture générale est essentielle pour votre développement personnel et professionnel.',
    },
    alternates: {
      canonical: 'https://votre-domaine.com/articles/importance-culture-generale',
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'La culture générale : un atout majeur dans notre société',
      description: 'Découvrez pourquoi la culture générale est essentielle pour votre développement personnel et professionnel.',
      author: {
        '@type': 'Person',
        name: 'FlorianSlgs'
      },
      datePublished: '2025-02-16T15:02:29Z',
      image: '/images/culture-generale.jpg',
      publisher: {
        '@type': 'Organization',
        name: 'Quiz en ligne',
        logo: {
          '@type': 'ImageObject',
          url: '/logo.png' // Assurez-vous d'avoir ce logo dans votre dossier public
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://votre-domaine.com/articles/importance-culture-generale'
      }
    }
  }

export default function CultureGeneraleArticle() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            La Culture Générale : Un Atout Majeur 🎓
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez pourquoi la culture générale est essentielle pour votre 
            développement personnel et professionnel dans notre société moderne.
          </p>
        </div>
      </div>

      {/* Main Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">
          Les avantages d'une bonne culture générale 🌟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="💡"
            title="Meilleure compréhension"
            description="Comprendre les enjeux du monde actuel et faire des liens entre différents domaines"
          />
          <FeatureCard 
            icon="🗣️"
            title="Communication enrichie"
            description="Capacité à participer à des conversations variées et à argumenter efficacement"
          />
          <FeatureCard 
            icon="🚀"
            title="Opportunités professionnelles"
            description="Un atout reconnu par les recruteurs et un facteur de progression de carrière"
          />
        </div>
      </div>

      {/* Detailed Content Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
            Comment développer sa culture générale au quotidien ? 📚
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <ClientAccordion 
              title="Les sources d'apprentissage"
              defaultOpen={true}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Lecture régulière de livres et de journaux</li>
                <li>Documentaires et podcasts culturels</li>
                <li>Visites de musées et expositions</li>
                <li>Participation à des quiz et jeux de culture générale</li>
                <li>Échanges et discussions avec des personnes de différents horizons</li>
              </ul>
            </ClientAccordion>

            <ClientAccordion 
              title="Les domaines à explorer"
              defaultOpen={false}
            >
              <div className="space-y-4">
                <p>La culture générale couvre de nombreux domaines essentiels :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Histoire et géographie</li>
                  <li>Arts et littérature</li>
                  <li>Sciences et technologies</li>
                  <li>Actualités et politique</li>
                  <li>Philosophie et société</li>
                </ul>
              </div>
            </ClientAccordion>
          </div>
        </div>
      </div>

      {/* Practical Tips Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Conseils pratiques pour progresser 💪
        </h2>
        <div className="max-w-3xl mx-auto">
          <ClientAccordion 
            title="Méthodes efficaces d'apprentissage"
            defaultOpen={false}
          >
            <ol className="list-decimal pl-5 space-y-2">
              <li>Consacrez 15 minutes par jour à la lecture d'actualités</li>
              <li>Utilisez des applications de quiz culturels</li>
              <li>Notez les nouveaux concepts appris</li>
              <li>Partagez vos connaissances avec d'autres</li>
              <li>Établissez des connexions entre différents sujets</li>
            </ol>
          </ClientAccordion>
        </div>
      </div>

      {/* Benefits in Professional Life */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
            Impact professionnel 📈
          </h2>
          <div className="max-w-3xl mx-auto">
            <ClientAccordion 
              title="Avantages dans le monde professionnel"
              defaultOpen={false}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Meilleure adaptabilité aux changements</li>
                <li>Facilité à créer des liens professionnels</li>
                <li>Capacité accrue à innover et proposer des solutions</li>
                <li>Crédibilité renforcée auprès des collaborateurs</li>
                <li>Progression de carrière facilitée</li>
              </ul>
            </ClientAccordion>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-b from-indigo-800 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Prêt à tester vos connaissances ?
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