export default function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-indigo-600">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    )
  }