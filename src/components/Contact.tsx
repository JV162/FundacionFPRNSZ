import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado correctamente. Te responderemos pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes preguntas sobre nuestros proyectos? ¿Quieres colaborar? 
            ¡Nos encantaría escucharte!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Información de Contacto</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Dirección</h4>
                  <p className="text-gray-600">
                    C. Luis Reyes Acosta 311<br />
                    Santo Domingo, Republica Domincana 10301
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                  <p className="text-gray-600">+52 (55) 1234-5678</p>
                  <p className="text-gray-600">+52 (55) 8765-4321</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Correo Electrónico</h4>
                  <p className="text-gray-600">info@fundacionramona.org</p>
                  <p className="text-gray-600">donaciones@fundacionramona.org</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Horarios de Atención</h4>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sábados: 9:00 AM - 2:00 PM</p>
                  <p className="text-gray-600">Domingos: Cerrado</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Síguenos en Redes Sociales</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-pink-600 p-3 rounded-lg text-white hover:bg-pink-700 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-sky-500 p-3 rounded-lg text-white hover:bg-sky-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                type="text"
                name="subject"
                placeholder="Asunto"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <textarea
                name="message"
                placeholder="Tu mensaje"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Enviar Mensaje</span>
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>¿Necesitas ayuda urgente?</strong> Llámanos directamente al +52 (55) 1234-5678 
                o envía un WhatsApp para una respuesta más rápida.
              </p>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16">
          <div className="text-center p-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md mx-auto">
              <MapPin className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nuestra Ubicación</h3>
              <p className="text-gray-700 mb-4 font-semibold">
                C. Luis Reyes Acosta 311<br />
                Santo Domingo, República Dominicana 10301
              </p>
              <div className="space-y-3">
                <a
                  href="https://maps.google.com/?q=C.+Luis+Reyes+Acosta+311,+Santo+Domingo,+República+Dominicana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  📍 Ver en Google Maps
                </a>
                <a
                  href="https://www.waze.com/ul?q=C.%20Luis%20Reyes%20Acosta%20311%20Santo%20Domingo%20República%20Dominicana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  🚗 Abrir en Waze
                </a>
                <a
                  href="https://maps.apple.com/?q=C.+Luis+Reyes+Acosta+311,+Santo+Domingo,+República+Dominicana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
                >
                  🍎 Abrir en Apple Maps
                </a>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;