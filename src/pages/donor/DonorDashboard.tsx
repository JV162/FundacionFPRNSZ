import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, Gift, TrendingUp, Calendar, LogOut, User } from 'lucide-react';

const DonorDashboard = () => {
  const { user, logout } = useAuth();

  const mockDonations = [
    {
      id: 1,
      amount: 100,
      date: '2024-01-15',
      project: 'Educación para Todos',
      status: 'Completada'
    },
    {
      id: 2,
      amount: 50,
      date: '2024-01-01',
      project: 'Comedores Comunitarios',
      status: 'Completada'
    }
  ];

  const totalDonated = mockDonations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Panel de Donante
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
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">¡Bienvenido, {user?.name}!</h2>
          <p className="text-blue-100">
            Gracias por ser parte de nuestra misión. Aquí puedes ver el impacto de tus donaciones.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Gift className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalDonated}</p>
                <p className="text-gray-600">Total Donado</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{mockDonations.length}</p>
                <p className="text-gray-600">Donaciones Realizadas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">15</p>
                <p className="text-gray-600">Vidas Impactadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Historial de Donaciones
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Proyecto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Monto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {mockDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(donation.date).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{donation.project}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      ${donation.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tu Impacto</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Educación</h4>
              <p className="text-gray-600 text-sm">
                Tus donaciones han ayudado a educar a <strong>8 niños</strong> este año.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Alimentación</h4>
              <p className="text-gray-600 text-sm">
                Has contribuido a servir <strong>120 comidas</strong> nutritivas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;