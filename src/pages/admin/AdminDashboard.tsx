import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  Gift, 
  FolderOpen, 
  LogOut, 
  User,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalDonations: 25000,
    totalDonors: 150,
    activeProjects: 4,
    thisMonth: 3500
  };

  const recentDonations = [
    {
      id: 1,
      donor: 'María González',
      amount: 100,
      project: 'Educación para Todos',
      date: '2024-01-15'
    },
    {
      id: 2,
      donor: 'Carlos Mendoza',
      amount: 250,
      project: 'Comedores Comunitarios',
      date: '2024-01-14'
    },
    {
      id: 3,
      donor: 'Ana Rodríguez',
      amount: 50,
      project: 'Viviendas Dignas',
      date: '2024-01-13'
    }
  ];

  const handleNavigateToModule = (module: string) => {
    navigate(`/admin/${module}`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Panel Administrativo
                </h1>
                <p className="text-xs text-gray-600">Fundación Ramona Neris</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Panel de Control</h2>
          <p className="text-blue-100">
            Gestiona las donaciones, proyectos y usuarios de la fundación.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${stats.totalDonations.toLocaleString()}</p>
                <p className="text-gray-600">Total Recaudado</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
                <p className="text-gray-600">Donantes Activos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FolderOpen className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
                <p className="text-gray-600">Proyectos Activos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${stats.thisMonth.toLocaleString()}</p>
                <p className="text-gray-600">Este Mes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button 
            onClick={() => handleNavigateToModule('donations')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left transform hover:-translate-y-1 hover:bg-blue-50"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Gift className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gestionar Donaciones</h3>
                <p className="text-gray-600 text-sm">Ver y administrar todas las donaciones</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => handleNavigateToModule('projects')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left transform hover:-translate-y-1 hover:bg-green-50"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FolderOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gestionar Proyectos</h3>
                <p className="text-gray-600 text-sm">Crear y editar proyectos</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => handleNavigateToModule('users')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left transform hover:-translate-y-1 hover:bg-orange-50"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gestionar Usuarios</h3>
                <p className="text-gray-600 text-sm">Administrar donantes y permisos</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Donations Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Donaciones Recientes
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Donante</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Proyecto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Monto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{donation.donor}</td>
                    <td className="py-3 px-4 text-gray-600">{donation.project}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      ${donation.amount}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(donation.date).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => handleNavigateToModule('donations')}
                        className="text-blue-600 hover:text-blue-800 text-sm hover:underline transition-colors"
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => handleNavigateToModule('donations')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Todas las Donaciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;