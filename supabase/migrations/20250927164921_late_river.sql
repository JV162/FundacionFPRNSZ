/*
  # Remove duplicate users and call function to create real auth accounts

  1. Clean up
    - Remove any duplicate entries from users table
  
  2. Create real auth accounts
    - This will be handled by the edge function
*/

-- Remove any existing test users to avoid conflicts
DELETE FROM users WHERE email IN ('admin@fundacion.org', 'donante@test.com', 'maria@test.com');