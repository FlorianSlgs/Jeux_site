export const metadata = {
  title: 'Quiz multijoueur en ligne à plusieurs',
  description: 'Quiz multijoueur en ligne : défie tes amis dans des quiz interactifs en temps réel. Idéal pour des soirées entre amis, en famille ou entre collègues.',
  keywords:
  "quiz, multijoueur, en ligne, jeu de quiz, soirées entre amis, famille, collègues, interactif, temps réel, à plusieurs, meilleur quiz",
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import "./globals.css";

import Header from './components/header'
import HomeButton from './components/HomeButton'
import Footer from './components/footer'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9866248372105915"
        crossorigin="anonymous"></script>
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <HomeButton />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
  