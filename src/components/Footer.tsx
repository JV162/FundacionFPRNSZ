import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Foundation Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-red-400" />
              <div>
                <h3 className="text-xl font-bold leading-tight">
                  Fundación Ramona Neris
                </h3>
                <p className="text-sm text-gray-300">Sosa de Zabala</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformando vidas a través de la educación, la salud, la alimentación 
              y el desarrollo comunitario. Juntos construimos un futuro más justo y equitativo.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-lg hover:bg-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-sky-500 p-2 rounded-lg hover:bg-sky-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('inicio')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('nosotros')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('proyectos')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Proyectos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('donar')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Donar
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Av. Principal 123<br />
                  Ciudad, Estado 12345
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+52 (55) 1234-5678</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@fundacionramona.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Fundación Ramona Neris Sosa de Zabala. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Transparencia
              </a>
            </div>
          </div>
        </div>

        {/* Certification */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-900 px-4 py-2 rounded-full">
            <Heart className="h-4 w-4 text-green-400" />
            <span className="text-green-300 text-xs">Organización Registrada y Certificada #2709/2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;