import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AudioPlayer from './AudioPlayer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handlePanelClick = () => {
    console.log('🔥 Panel click triggered!');
    console.log('User state:', user);
    
    if (user) {
      // Si está logueado, ir a su panel correspondiente
      console.log('User is logged in, navigating to:', user.role === 'admin' ? '/admin' : '/donor');
      navigate(user.role === 'admin' ? '/admin' : '/donor');
    } else {
      // Si no está logueado, ir a login
      console.log('User not logged in, navigating to /login');
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  const handleDonarClick = () => {
    console.log('🎯 Donar click triggered!');
    scrollToSection('donar');
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Audio Bar */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-white text-sm font-medium">🎵 Himno de la Fundación</span>
            <AudioPlayer />
          </div>
          <div className="text-white text-xs">
            El himno de la escuela Ramona Neris, ahora himno de nuestra fundación
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                Fundación Ramona Neris
              </h1>
              <p className="text-xs text-gray-600">Sosa de Zabala</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-red-600 transition-colors">
              Inicio
            </button>
            <button onClick={() => scrollToSection('nosotros')} className="text-gray-700 hover:text-red-600 transition-colors">
              Nosotros
            </button>
            <button onClick={() => scrollToSection('proyectos')} className="text-gray-700 hover:text-red-600 transition-colors">
              Proyectos
            </button>
            <button onClick={() => scrollToSection('donar')} className="text-gray-700 hover:text-red-600 transition-colors">
              Donar
            </button>
            <button onClick={() => scrollToSection('contacto')} className="text-gray-700 hover:text-red-600 transition-colors">
              Contacto
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleDonarClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-semibold"
            >
              Donar Ahora
            </button>
            <button
              onClick={handlePanelClick}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-semibold cursor-pointer"
              type="button"
            >
              {user ? 'Mi Panel' : 'Iniciar Sesión'}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">
                Inicio
              </button>
              <button onClick={() => scrollToSection('nosotros')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">
                Nosotros
              </button>
              <button onClick={() => scrollToSection('proyectos')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">
                Proyectos
              </button>
              <button onClick={() => scrollToSection('donar')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">
                Donar
              </button>
              <button onClick={() => scrollToSection('contacto')} className="text-gray-700 hover:text-blue-600 transition-colors text-left">
                Contacto
              </button>
              <button
                onClick={handleDonarClick}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-semibold w-fit"
              >
                Donar Ahora
              </button>
              <button
                onClick={handlePanelClick}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-semibold w-fit cursor-pointer"
                type="button"
              >
                {user ? 'Mi Panel' : 'Iniciar Sesión'}
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </header>
  );
};

export default Header;