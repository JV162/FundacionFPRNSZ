import React from 'react';
import { Users, BookOpen, Home, Heart, TrendingUp, Calendar } from 'lucide-react';

const Impact = () => {
  const impactStats = [
    {
      icon: Users,
      number: '2,450',
      label: 'Vidas Transformadas',
      description: 'Familias que han recibido apoyo directo',
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      number: '850',
      label: 'Niños Educados',
      description: 'Becas y programas educativos otorgados',
      color: 'bg-green-500'
    },
    {
      icon: Home,
      number: '125',
      label: 'Hogares Construidos',
      description: 'Viviendas dignas para familias necesitadas',
      color: 'bg-orange-500'
    },
    {
      icon: Heart,
      number: '15,000',
      label: 'Comidas Servidas',
      description: 'Alimentación nutritiva proporcionada',
      color: 'bg-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Madre beneficiaria',
      quote: 'Gracias a la fundación, mis tres hijos pueden ir a la escuela. No tengo palabras para expresar mi gratitud.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Beneficiario del programa de vivienda',
      quote: 'Después de años viviendo en condiciones precarias, ahora mi familia tiene un hogar digno y seguro.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Ana Rodríguez',
      role: 'Voluntaria',
      quote: 'Ser parte de esta fundación me ha permitido ver el impacto real que podemos hacer cuando trabajamos juntos.',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Impact Statistics */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestro Impacto en Números
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada número representa vidas reales transformadas gracias al apoyo de donantes como tú.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`${stat.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Growth Chart Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
              Nuestro Crecimiento y Proyección
            </h3>
            <p className="text-gray-600">Como fundación nueva, tenemos grandes planes para transformar vidas</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <Calendar className="h-8 w-8 text-gray-500 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-gray-900 mb-1">2024</h4>
                <p className="text-gray-600">Fundación establecida</p>
                <p className="text-sm text-gray-500">Inicio de operaciones</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-gray-900 mb-1">2025</h4>
                <p className="text-gray-600 font-semibold">500 beneficiarios</p>
                <p className="text-sm text-blue-600 font-semibold">RD$100,000 meta</p>
                <p className="text-xs text-blue-500 mt-1">¡Año actual!</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-gray-900 mb-1">2026</h4>
                <p className="text-gray-600">800 beneficiarios</p>
                <p className="text-sm text-green-600 font-semibold">RD$180,000 proyectado</p>
                <p className="text-xs text-green-500 mt-1">Proyección</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-gray-900 mb-1">2027</h4>
                <p className="text-gray-600">1,200 beneficiarios</p>
                <p className="text-sm text-purple-600 font-semibold">RD$300,000 visión</p>
                <p className="text-xs text-purple-500 mt-1">Visión a futuro</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
              <h4 className="text-xl font-bold text-gray-900 mb-4">🎯 Nuestros Objetivos 2025</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="font-bold text-2xl text-blue-600">500</p>
                  <p className="text-gray-600">Beneficiarios Meta</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="font-bold text-2xl text-green-600">RD$100,000</p>
                  <p className="text-gray-600">Meta de Recaudación</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Voces de Nuestra Comunidad
          </h3>
          <p className="text-gray-600">Historias reales de las personas que han sido parte de nuestra misión</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
              <blockquote className="text-gray-700 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex justify-center mt-6">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="h-4 w-4 text-red-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;