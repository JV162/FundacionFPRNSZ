import React, { useState } from 'react';
import { CreditCard, Building, Heart, Shield, Check } from 'lucide-react';

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || parseFloat(customAmount) || 0;
    alert(`¡Gracias por tu donación de $${amount}! En una implementación real, esto procesaría el pago.`);
  };

  const currentAmount = selectedAmount || parseFloat(customAmount) || 0;

  return (
    <section id="donar" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Haz una Donación
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu contribución hace la diferencia. Cada donación nos acerca más a nuestro objetivo 
            de transformar vidas y fortalecer comunidades.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Selecciona el monto de tu donación
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                          selectedAmount === amount
                            ? 'border-red-600 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Monto personalizado"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="absolute left-4 top-4 text-gray-500">$</span>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono (opcional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Payment Method */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Método de pago
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-red-600 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Tarjeta</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-4 border-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                        paymentMethod === 'transfer'
                          ? 'border-red-600 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <Building className="h-5 w-5" />
                      <span>Transferencia</span>
                    </button>
                  </div>
                </div>

                {/* Message */}
                <textarea
                  name="message"
                  placeholder="Mensaje (opcional)"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={currentAmount === 0}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Donar ${currentAmount.toLocaleString()}</span>
                </button>
              </form>
            </div>

            {/* Right Side - Security & Info */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-8 lg:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Tu donación es segura</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Transacciones Seguras</h4>
                    <p className="text-blue-100">Utilizamos encriptación de nivel bancario para proteger tu información</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">100% Transparente</h4>
                    <p className="text-blue-100">Recibirás reportes detallados del uso de tu donación</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Impacto Directo</h4>
                    <p className="text-blue-100">Tu contribución llega directamente a quienes más lo necesitan</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold text-lg mb-4">Información Bancaria</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Banco:</span> Banco Nacional</p>
                  <p><span className="font-semibold">Cuenta:</span> 123-456789-0</p>
                  <p><span className="font-semibold">CLABE:</span> 123456789012345678</p>
                  <p><span className="font-semibold">Beneficiario:</span> Fundación Ramona Neris Sosa de Zabala</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-blue-100">
                  Al donar, aceptas nuestros términos y condiciones. Tu donación es deducible de impuestos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;