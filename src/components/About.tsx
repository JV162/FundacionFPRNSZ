import React from 'react';
import { Heart, Award, Globe, Users, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Quiénes Somos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un legado de amor por la educación que trasciende generaciones y transforma comunidades.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              El Legado de la Maestra Ramona
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              La Fundación Zabala Sosa nace del corazón de un legado imborrable: el de la maestra 
              Ramona Neris Sosa de Zabala. Una mujer que, junto a los vecinos de Sabana Perdida, 
              no solo levantó las paredes de una escuela, sino que construyó un faro de esperanza 
              para su comunidad.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Hoy, esa escuela lleva su nombre y su espíritu vive en nosotros. Impulsados por su 
              ejemplo, su familia, y en especial sus hijas, hemos asumido la misión de continuar 
              su obra. Somos la continuación de un sueño: el sueño de que la educación tiene el 
              poder de transformar vidas.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900">Educación</p>
                <p className="text-sm text-gray-600">Nuestro corazón y pasión</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-semibold text-gray-900">Comunidad</p>
                <p className="text-sm text-gray-600">Sabana Perdida y más allá</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Niños estudiando en la escuela"
              className="rounded-2xl shadow-lg w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Desde 1985</p>
                  <p className="text-sm text-gray-600">transformando vidas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nuestra Misión Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p className="text-gray-600">Los agricultores del mañana</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              Creemos firmemente en el poder de la educación como motor de cambio. Nuestra misión 
              es ser los agricultores del mañana en comunidades donde sembramos futuro a través de 
              programas educativos integrales.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              No solo nos enfocamos en los estudiantes, sino que fortalecemos todo el ecosistema 
              educativo: capacitamos a padres y maestros, y fomentamos el aprendizaje continuo en 
              jóvenes y adultos. Aunque nuestra ayuda no tiene límites, nuestro corazón está en 
              la educación, la herramienta más poderosa para construir un porvenir digno y próspero.
            </p>
          </div>
        </div>

        {/* Valores Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h3>
            <p className="text-gray-600">Los principios que guían cada una de nuestras acciones</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Amor</h4>
              <p className="text-sm text-gray-600">Por la educación y el servicio a la comunidad</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Educación</h4>
              <p className="text-sm text-gray-600">Como herramienta fundamental de transformación</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Comunidad</h4>
              <p className="text-sm text-gray-600">Trabajamos junto a las familias y vecinos</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Legado</h4>
              <p className="text-sm text-gray-600">Continuamos la obra de la maestra Ramona</p>
            </div>
          </div>
        </div>

        {/* Sabana Perdida Section */}
        <div className="mt-20 bg-white border-2 border-gray-100 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Sabana Perdida: Nuestro Hogar
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Todo comenzó en Sabana Perdida, donde la maestra Ramona junto a los vecinos 
                construyó no solo una escuela, sino una comunidad unida por el sueño de la educación.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Desde allí, extendemos nuestras enseñanzas a cada una de las comunidades de gran 
                potencial que nos abren sus puertas, llevando oportunidades donde más se necesitan.
              </p>
              <div className="flex items-center space-x-3">
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Una escuela con su nombre</p>
                  <p className="text-sm text-gray-600">El legado vivo de la maestra Ramona</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8613066/pexels-photo-8613066.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Comunidad de Sabana Perdida"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;