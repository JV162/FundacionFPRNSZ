/*
  # Restricción para creación de administradores

  1. Seguridad
    - Solo administradores existentes pueden crear nuevos administradores
    - Los donantes solo pueden registrarse como 'donor'
    - Política de inserción restrictiva para rol 'admin'

  2. Políticas
    - Política para permitir auto-registro de donantes
    - Política para que solo admins puedan crear otros admins
*/

-- Eliminar la política existente de inserción si existe
DROP POLICY IF EXISTS "Anyone can insert donations" ON users;

-- Crear política para que cualquiera pueda registrarse como donante
CREATE POLICY "Anyone can register as donor"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (role = 'donor');

-- Crear política para que solo admins puedan crear otros admins
CREATE POLICY "Only admins can create admins"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    role = 'admin' AND 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insertar un usuario administrador por defecto si no existe
INSERT INTO users (email, name, role) 
VALUES ('admin@fundacion.org', 'Administrador Principal', 'admin')
ON CONFLICT (email) DO NOTHING;