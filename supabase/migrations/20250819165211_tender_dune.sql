/*
  # Insertar datos de ejemplo

  1. Sample Data
    - Usuarios de ejemplo (admin y donante)
    - Proyectos de ejemplo
    - Donaciones de ejemplo

  2. Notes
    - Los usuarios tendrán IDs específicos para facilitar las pruebas
    - Las contraseñas se manejarán a través de Supabase Auth
*/

-- Insertar proyectos de ejemplo
INSERT INTO projects (title, description, category, goal_amount, raised_amount, status, image_url, beneficiaries) VALUES
(
  'Educación para Todos',
  'Becas y útiles escolares para niños de familias de bajos recursos',
  'Educación',
  60000.00,
  45000.00,
  'active',
  'https://images.pexels.com/photos/289740/pexels-photo-289740.jpeg?auto=compress&cs=tinysrgb&w=600',
  150
),
(
  'Comedores Comunitarios',
  'Alimentación nutritiva para familias en situación vulnerable',
  'Alimentación',
  50000.00,
  32000.00,
  'active',
  'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600',
  200
),
(
  'Viviendas Dignas',
  'Construcción y reparación de hogares para familias necesitadas',
  'Vivienda',
  120000.00,
  78000.00,
  'active',
  'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600',
  50
),
(
  'Centro de Salud Móvil',
  'Atención médica gratuita en comunidades rurales',
  'Salud',
  80000.00,
  15000.00,
  'active',
  'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
  300
);

-- Insertar algunas donaciones de ejemplo (sin user_id por ahora, hasta que tengamos auth real)
INSERT INTO donations (project_id, amount, payment_method, status, donor_name, donor_email, message) VALUES
(
  (SELECT id FROM projects WHERE title = 'Educación para Todos' LIMIT 1),
  100.00,
  'card',
  'completed',
  'María González',
  'maria@email.com',
  'Espero que esto ayude a los niños a tener un mejor futuro'
),
(
  (SELECT id FROM projects WHERE title = 'Comedores Comunitarios' LIMIT 1),
  250.00,
  'transfer',
  'completed',
  'Carlos Mendoza',
  'carlos@email.com',
  'Gracias por el trabajo que hacen'
),
(
  (SELECT id FROM projects WHERE title = 'Viviendas Dignas' LIMIT 1),
  50.00,
  'card',
  'completed',
  'Ana Rodríguez',
  'ana@email.com',
  NULL
);