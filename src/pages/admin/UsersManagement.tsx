import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Plus, Edit, Trash2, Eye, Shield, UserCheck, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'admin';
  created_at: string;
  last_login?: string;
  total_donated?: number;
  donations_count?: number;
  status: 'active' | 'inactive';
}

const UsersManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - en producción vendría de Supabase
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'María González',
      email: 'maria@email.com',
      role: 'donor',
      created_at: '2024-01-15T10:30:00Z',
      last_login: '2024-01-20T14:20:00Z',
      total_donated: 350,
      donations_count: 3,
      status: 'active'
    },
    {
      id: '2',
      name: 'Carlos Mendoza',
      email: 'carlos@email.com',
      role: 'donor',
      created_at: '2024-01-10T09:15:00Z',
      last_login: '2024-01-19T16:45:00Z',
      total_donated: 500,
      donations_count: 2,
      status: 'active'
    },
    {
      id: '3',
      name: 'Ana Rodríguez',
      email: 'ana@email.com',
      role: 'donor',
      created_at: '2024-01-05T11:20:00Z',
      last_login: '2024-01-18T10:30:00Z',
      total_donated: 150,
      donations_count: 1,
      status: 'active'
    },
    {
      id: '4',
      name: 'Luis Martínez',
      email: 'luis@email.com',
      role: 'donor',
      created_at: '2023-12-20T15:45:00Z',
      last_login: '2024-01-15T12:00:00Z',
      total_donated: 75,
      donations_count: 1,
      status: 'inactive'
    },
    {
      id: '5',
      name: 'Administrador Principal',
      email: 'admin@fundacion.org',
      role: 'admin',
      created_at: '2023-01-01T00:00:00Z',
      last_login: '2024-01-20T18:30:00Z',
      status: 'active'
    },
    {
      id: '6',
      name: 'Elena Vásquez',
      email: 'elena@email.com',
      role: 'donor',
      created_at: '2024-01-12T13:25:00Z',
      last_login: '2024-01-17T09:15:00Z',
      total_donated: 200,
      donations_count: 2,
      status: 'active'
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'donor': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalDonors = users.filter(u => u.role === 'donor').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nuevo Usuario</span>
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
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-gray-600">Total Usuarios</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                <p className="text-gray-600">Usuarios Activos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <UserCheck className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalDonors}</p>
                <p className="text-gray-600">Donantes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalAdmins}</p>
                <p className="text-gray-600">Administradores</p>
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
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todos los roles</option>
                  <option value="donor">Donantes</option>
                  <option value="admin">Administradores</option>
                </select>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Usuario</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Rol</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Estado</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Donaciones</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Último Acceso</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Registro</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                        {user.role === 'admin' ? 'Administrador' : 'Donante'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {user.role === 'donor' ? (
                        <div>
                          <p className="font-semibold text-green-600">
                            ${user.total_donated?.toLocaleString() || '0'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.donations_count || 0} donaciones
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {user.last_login ? 
                        new Date(user.last_login).toLocaleDateString('es-ES') : 
                        'Nunca'
                      }
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(user.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(user)}
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
                        {user.role !== 'admin' && (
                          <button
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Desactivar"
                          >
                            <UserX className="h-4 w-4" />
                          </button>
                        )}
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
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detalles del Usuario</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <p className="text-gray-900">{selectedUser.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(selectedUser.role)}`}>
                  {selectedUser.role === 'admin' ? 'Administrador' : 'Donante'}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedUser.status)}`}>
                  {selectedUser.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              
              {selectedUser.role === 'donor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Donado</label>
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedUser.total_donated?.toLocaleString() || '0'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Donaciones</label>
                    <p className="text-gray-900">{selectedUser.donations_count || 0}</p>
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Registro</label>
                <p className="text-gray-900">{new Date(selectedUser.created_at).toLocaleDateString('es-ES')}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Último Acceso</label>
                <p className="text-gray-900">
                  {selectedUser.last_login ? 
                    new Date(selectedUser.last_login).toLocaleDateString('es-ES') : 
                    'Nunca'
                  }
                </p>
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
                Editar Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;