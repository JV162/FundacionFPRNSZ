import React from 'react';
import { BookOpen, Utensils, Home, Heart, Calendar, Users } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Educación para Todos",
      description: "Becas y útiles escolares para niños de familias de bajos recursos",
      raised: 45000,
      goal: 60000,
      category: "Educación",
      icon: BookOpen,
      image: "https://images.pexels.com/photos/289740/pexels-photo-289740.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Activo",
      beneficiaries: 150
    },
    {
      id: 2,
      title: "Comedores Comunitarios",
      description: "Alimentación nutritiva para familias en situación vulnerable",
      raised: 32000,
      goal: 50000,
      category: "Alimentación",
      icon: Utensils,
      image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Activo",
      beneficiaries: 200
    },
    {
      id: 3,
      title: "Viviendas Dignas",
      description: "Construcción y reparación de hogares para familias necesitadas",
      raised: 78000,
      goal: 120000,
      category: "Vivienda",
      icon: Home,
      image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "En Progreso",
      beneficiaries: 50
    },
    {
      id: 4,
      title: "Centro de Salud Móvil",
      description: "Atención médica gratuita en comunidades rurales",
      raised: 15000,
      goal: 80000,
      category: "Salud",
      icon: Heart,
      image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Nuevo",
      beneficiaries: 300
    }
  ];

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Nuevo': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const scrollToDonar = () => {
    document.getElementById('donar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="proyectos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada proyecto representa vidas transformadas. Con tu ayuda, podemos llegar a más 
            familias y crear un impacto duradero en nuestras comunidades.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const IconComponent = project.icon;
            const progressPercentage = getProgressPercentage(project.raised, project.goal);
            
            return (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <IconComponent className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.beneficiaries} beneficiarios</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>2024</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progreso de Recaudación</span>
                      <span className="text-sm font-semibold text-red-600">{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-600">
                        Recaudado: <span className="font-semibold text-gray-900">${project.raised.toLocaleString()}</span>
                      </span>
                      <span className="text-gray-600">
                        Meta: <span className="font-semibold text-gray-900">${project.goal.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={scrollToDonar}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Donar a este proyecto</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Tienes una idea para un nuevo proyecto?</h3>
            <p className="text-gray-600 mb-6">Estamos siempre abiertos a nuevas iniciativas que puedan beneficiar a nuestra comunidad.</p>
            <button
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Proponer Proyecto
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;