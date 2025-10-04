import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Función para crear usuarios de prueba
  const createTestUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-test-users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      console.log('Test users creation result:', result);
      
      if (result.success) {
        alert('Usuarios de prueba creados exitosamente. Ahora puedes usar las credenciales mostradas.');
      }
    } catch (error) {
      console.error('Error creating test users:', error);
      alert('Error al crear usuarios de prueba. Revisa la consola para más detalles.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      // El AuthContext se encargará de la redirección automática
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToHome = () => {
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home Button */}
        <div className="text-left">
          <button
            onClick={goToHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a la web</span>
          </button>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-12 w-12 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                Fundación Ramona Neris
              </h1>
              <p className="text-sm text-gray-600">Sosa de Zabala</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-gray-600">
            Accede a tu panel personalizado
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-semibold flex items-center justify-center"
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                onClick={goToRegister}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Crear Cuenta de Donante
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <p className="text-sm text-amber-800 mb-3">
                  <strong>⚠️ Importante:</strong>
                </p>
                <p className="text-sm text-amber-700 mb-3">
                  Los usuarios de prueba mostrados abajo son solo ejemplos. Para probar el sistema, necesitas:
                </p>
                <ol className="text-sm text-amber-700 text-left list-decimal list-inside space-y-1">
                  <li>Crear una cuenta nueva usando el botón "Crear Cuenta de Donante"</li>
                  <li>Usar esas credenciales para iniciar sesión</li>
                </ol>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <p className="text-sm text-blue-800 mb-3">
                  <strong>¿Primera vez aquí?</strong>
                </p>
                <p className="text-sm text-blue-700 mb-3">
                  Para acceder al sistema, primero necesitas crear una cuenta.
                </p>
                <p className="text-sm text-blue-700">
                  <button
                    onClick={goToRegister}
                    className="text-blue-600 hover:text-blue-700 font-semibold underline"
                  >
                    Haz clic aquí para registrarte
                  </button>
                  {' '}y luego regresa para iniciar sesión.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 mb-3">
                  <strong>🔑 Cuentas de prueba disponibles:</strong>
                </p>
                <button
                  type="button"
                  onClick={createTestUsers}
                  className="mb-3 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  Crear Usuarios de Prueba
                </button>
                <div className="text-xs text-green-700 space-y-2">
                  <div>
                    <strong>Administrador:</strong> admin@fundacion.org
                  </div>
                  <div>
                    <strong>Contraseña:</strong> admin123
                  </div>
                  <hr className="my-2 border-green-300" />
                  <div>
                    <strong>Donante:</strong> donante@test.com
                  </div>
                  <div>
                    <strong>Contraseña:</strong> donante123
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">
                  Haz clic en "Crear Usuarios de Prueba" primero, luego usa estas credenciales
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;