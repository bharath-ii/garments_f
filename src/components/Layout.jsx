import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md py-3 sm:py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-red-600 text-center sm:text-left">
          🧵Sri Mahalakshmi Garments
        </h1>
        <nav className="text-center sm:text-right">
          <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-red-500 font-medium text-sm sm:text-base">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/collections">Explore Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/directions">Directions</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6">{children}</main>

      {/* Footer */}
      <footer className="mt-8 sm:mt-12 bg-white border-t border-red-200 px-4 py-4 text-center text-xs sm:text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Sri Mahalakshmi Garments | All Rights Reserved</p>
        <div className="mt-2 flex justify-center">
          <img src="/cursor.png" alt="Logo" className="h-6 sm:h-8" />
        </div>
      </footer>
    </div>
  );
};

export default Layout;
