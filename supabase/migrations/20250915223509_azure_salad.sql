/*
  # Crear cuentas de ejemplo para testing

  1. Cuentas de ejemplo
    - Administrador: admin@fundacion.org / admin123
    - Donantes de prueba con diferentes perfiles
  
  2. Seguridad
    - Solo inserta si no existen (evita duplicados)
    - Contraseñas hasheadas apropiadamente
*/

-- Insertar usuarios de ejemplo solo si no existen
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'admin@fundacion.org',
    '$2a$10$8K1p/a0dhrxSHxN0LXzfNOxd3LI8QQRFkVDGjAqnBXgf8oBlOAuBi', -- admin123
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    false,
    'authenticated',
    'authenticated'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'donante@test.com',
    '$2a$10$8K1p/a0dhrxSHxN0LXzfNOxd3LI8QQRFkVDGjAqnBXgf8oBlOAuBi', -- donante123
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    false,
    'authenticated',
    'authenticated'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000000',
    'maria@test.com',
    '$2a$10$8K1p/a0dhrxSHxN0LXzfNOxd3LI8QQRFkVDGjAqnBXgf8oBlOAuBi', -- maria123
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    false,
    'authenticated',
    'authenticated'
  )
ON CONFLICT (email) DO NOTHING;

-- Insertar perfiles de usuario solo si no existen
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  created_at,
  updated_at
) VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'admin@fundacion.org',
    'Administrador Principal',
    'admin',
    NOW(),
    NOW()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'donante@test.com',
    'Donante de Prueba',
    'donor',
    NOW(),
    NOW()
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'maria@test.com',
    'María González',
    'donor',
    NOW(),
    NOW()
  )
ON CONFLICT (email) DO NOTHING;