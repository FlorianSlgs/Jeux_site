import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-4">
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
        </div>
      </div>
    </header>
  );
};

export default Header;