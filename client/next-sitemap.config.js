/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://quiz-multijoueur.fr/', // Remplace par ton URL
    generateRobotsTxt: true, // Générer robots.txt automatiquement
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' }, // Autoriser tout le monde à indexer
      ],
    },
  };
  