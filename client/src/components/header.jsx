import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo et nom du site */}
          <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="script-java.png"
              alt="Site Logo" 
              className="h-10 w-10 object-cover" 
            />
            <span className="text-2xl font-bold text-indigo-600">Jeux en ligne</span>
          </Link>  
          </div>

          {/* Liste déroulante */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 hover:text-indigo-600 font-medium focus:outline-none"
            >
              Jeux ▼
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <ul className="py-2">
                  <li>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600">
                      Quiz
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600">
                      Morpion
                    </Link>  
                  </li>
                  <li>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600">
                      Snake
                    </Link>  
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;