import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Download, Eye, Edit, Trash2, DollarSign, Calendar, User, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  project_title: string;
  amount: number;
  payment_method: 'card' | 'transfer' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  message?: string;
  created_at: string;
}

const DonationsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - en producción vendría de Supabase
  const [donations] = useState<Donation[]>([
    {
      id: '1',
      donor_name: 'María González',
      donor_email: 'maria@email.com',
      project_title: 'Educación para Todos',
      amount: 100,
      payment_method: 'card',
      status: 'completed',
      message: 'Espero que ayude a muchos niños',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      donor_name: 'Carlos Mendoza',
      donor_email: 'carlos@email.com',
      project_title: 'Comedores Comunitarios',
      amount: 250,
      payment_method: 'transfer',
      status: 'completed',
      created_at: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      donor_name: 'Ana Rodríguez',
      donor_email: 'ana@email.com',
      project_title: 'Viviendas Dignas',
      amount: 50,
      payment_method: 'card',
      status: 'pending',
      message: 'Gracias por su labor',
      created_at: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      donor_name: 'Luis Martínez',
      donor_email: 'luis@email.com',
      project_title: 'Centro de Salud Móvil',
      amount: 75,
      payment_method: 'cash',
      status: 'completed',
      created_at: '2024-01-12T14:20:00Z'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'transfer': return <DollarSign className="h-4 w-4" />;
      case 'cash': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donor_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.project_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const completedAmount = donations
    .filter(d => d.status === 'completed')
    .reduce((sum, donation) => sum + donation.amount, 0);

  const handleViewDetails = (donation: Donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Donaciones</h1>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
                <p className="text-gray-600">Total Donaciones</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${completedAmount.toLocaleString()}</p>
                <p className="text-gray-600">Completadas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <User className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
                <p className="text-gray-600">Total Registros</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {donations.filter(d => d.status === 'pending').length}
                </p>
                <p className="text-gray-600">Pendientes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por donante, email o proyecto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="completed">Completadas</option>
                <option value="pending">Pendientes</option>
                <option value="failed">Fallidas</option>
                <option value="refunded">Reembolsadas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Donante</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Proyecto</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Monto</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Método</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Estado</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">{donation.donor_name}</p>
                        <p className="text-sm text-gray-600">{donation.donor_email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{donation.project_title}</td>
                    <td className="py-4 px-6 font-semibold text-green-600">
                      ${donation.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {getPaymentMethodIcon(donation.payment_method)}
                        <span className="capitalize">{donation.payment_method}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(donation.status)}`}>
                        {donation.status === 'completed' && 'Completada'}
                        {donation.status === 'pending' && 'Pendiente'}
                        {donation.status === 'failed' && 'Fallida'}
                        {donation.status === 'refunded' && 'Reembolsada'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(donation.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(donation)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detalles de la Donación</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donante</label>
                <p className="text-gray-900">{selectedDonation.donor_name}</p>
                <p className="text-sm text-gray-600">{selectedDonation.donor_email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
                <p className="text-gray-900">{selectedDonation.project_title}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                <p className="text-2xl font-bold text-green-600">${selectedDonation.amount.toLocaleString()}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                <p className="text-gray-900 capitalize">{selectedDonation.payment_method}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedDonation.status)}`}>
                  {selectedDonation.status === 'completed' && 'Completada'}
                  {selectedDonation.status === 'pending' && 'Pendiente'}
                  {selectedDonation.status === 'failed' && 'Fallida'}
                  {selectedDonation.status === 'refunded' && 'Reembolsada'}
                </span>
              </div>
              
              {selectedDonation.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedDonation.message}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <p className="text-gray-900">{new Date(selectedDonation.created_at).toLocaleString('es-ES')}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cerrar
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Editar Estado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsManagement;