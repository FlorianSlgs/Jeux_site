import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
    const navigate = useNavigate();
    return (
    <button
        onClick={() => navigate('/')} // Navigue vers la page d'accueil
        className="fixed top-4 left-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-md transition-all duration-300 ease-in-out"
        title="Retour à l'accueil"
        >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-gray-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
        </svg>
    </button>
  );
};

export default HomeButton;