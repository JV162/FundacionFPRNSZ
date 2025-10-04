import React from 'react';
import { ArrowRight, Heart, Users, Target } from 'lucide-react';

const Hero = () => {
  const scrollToDonar = () => {
    document.getElementById('donar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="pt-32 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transformamos
              <span className="text-red-600"> vidas </span>
              a través de la
              <span className="text-green-600"> solidaridad</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              La Fundación Ramona Neris Sosa de Zabala trabaja incansablemente para crear oportunidades 
              y brindar esperanza a las comunidades más vulnerables.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={scrollToDonar}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                Donar Ahora
                <Heart className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold text-lg flex items-center justify-center"
              >
                Ver Proyectos
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <p className="font-bold text-2xl text-gray-900">500+</p>
                <p className="text-gray-600">Familias Ayudadas</p>
              </div>
              <div className="group">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-bold text-2xl text-gray-900">12</p>
                <p className="text-gray-600">Proyectos Activos</p>
              </div>
              <div className="group">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <p className="font-bold text-2xl text-gray-900">$250K</p>
                <p className="text-gray-600">Recaudado</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Voluntarios ayudando en la comunidad"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;