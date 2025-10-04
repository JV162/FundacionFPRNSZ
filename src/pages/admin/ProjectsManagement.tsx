import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit, Trash2, Eye, Upload, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  goal_amount: number;
  raised_amount: number;
  status: 'active' | 'completed' | 'paused';
  image_url?: string;
  beneficiaries: number;
  created_at: string;
}

const ProjectsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    goal_amount: '',
    image_url: '',
    beneficiaries: '',
    status: 'active' as 'active' | 'completed' | 'paused'
  });

  // Mock data - en producción vendría de Supabase
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Educación para Todos',
      description: 'Becas y útiles escolares para niños de familias de bajos recursos',
      category: 'Educación',
      goal_amount: 60000,
      raised_amount: 45000,
      status: 'active',
      image_url: 'https://images.pexels.com/photos/289740/pexels-photo-289740.jpeg?auto=compress&cs=tinysrgb&w=600',
      beneficiaries: 150,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      title: 'Comedores Comunitarios',
      description: 'Alimentación nutritiva para familias en situación vulnerable',
      category: 'Alimentación',
      goal_amount: 50000,
      raised_amount: 32000,
      status: 'active',
      image_url: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600',
      beneficiaries: 200,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      title: 'Viviendas Dignas',
      description: 'Construcción y reparación de hogares para familias necesitadas',
      category: 'Vivienda',
      goal_amount: 120000,
      raised_amount: 78000,
      status: 'active',
      image_url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600',
      beneficiaries: 50,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      title: 'Centro de Salud Móvil',
      description: 'Atención médica gratuita en comunidades rurales',
      category: 'Salud',
      goal_amount: 80000,
      raised_amount: 15000,
      status: 'active',
      image_url: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
      beneficiaries: 300,
      created_at: '2024-01-01T00:00:00Z'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      goal_amount: '',
      image_url: '',
      beneficiaries: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      goal_amount: project.goal_amount.toString(),
      image_url: project.image_url || '',
      beneficiaries: project.beneficiaries.toString(),
      status: project.status
    });
    setShowModal(true);
  };

  const handleSaveProject = () => {
    if (editingProject) {
      // Actualizar proyecto existente
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? {
              ...p,
              title: formData.title,
              description: formData.description,
              category: formData.category,
              goal_amount: parseFloat(formData.goal_amount),
              image_url: formData.image_url,
              beneficiaries: parseInt(formData.beneficiaries),
              status: formData.status
            }
          : p
      ));
    } else {
      // Crear nuevo proyecto
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        goal_amount: parseFloat(formData.goal_amount),
        raised_amount: 0,
        image_url: formData.image_url,
        beneficiaries: parseInt(formData.beneficiaries),
        status: formData.status,
        created_at: new Date().toISOString()
      };
      setProjects([...projects, newProject]);
    }
    setShowModal(false);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const totalGoal = projects.reduce((sum, project) => sum + project.goal_amount, 0);
  const totalRaised = projects.reduce((sum, project) => sum + project.raised_amount, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Volver al Panel</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Proyectos</h1>
            </div>
            <button
              onClick={handleNewProject}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo Proyecto</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                <p className="text-gray-600">Total Proyectos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Plus className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
                <p className="text-gray-600">Activos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Upload className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalGoal.toLocaleString()}</p>
                <p className="text-gray-600">Meta Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Save className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalRaised.toLocaleString()}</p>
                <p className="text-gray-600">Recaudado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar proyectos por título, categoría o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const progressPercentage = getProgressPercentage(project.raised_amount, project.goal_amount);
            
            return (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                      {project.status === 'active' && 'Activo'}
                      {project.status === 'completed' && 'Completado'}
                      {project.status === 'paused' && 'Pausado'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progreso</span>
                      <span className="text-sm font-semibold text-green-600">{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-600">
                        ${project.raised_amount.toLocaleString()}
                      </span>
                      <span className="text-gray-600">
                        ${project.goal_amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">
                      {project.beneficiaries} beneficiarios
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(project.created_at).toLocaleDateString('es-ES')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para crear/editar proyecto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Educación">Educación</option>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Vivienda">Vivienda</option>
                    <option value="Salud">Salud</option>
                    <option value="Desarrollo">Desarrollo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Activo</option>
                    <option value="paused">Pausado</option>
                    <option value="completed">Completado</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta ($)</label>
                  <input
                    type="number"
                    name="goal_amount"
                    value={formData.goal_amount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiarios</label>
                  <input
                    type="number"
                    name="beneficiaries"
                    value={formData.beneficiaries}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </form>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProject}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingProject ? 'Actualizar' : 'Crear'} Proyecto</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;