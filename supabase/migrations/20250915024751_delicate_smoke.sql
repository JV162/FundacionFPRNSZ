/*
  # Fix infinite recursion in users table RLS policies

  1. Problem
    - The "Admins can read all users" policy causes infinite recursion
    - It queries the users table to check if current user is admin
    - This creates a circular dependency when trying to read user profiles

  2. Solution
    - Drop the problematic admin policy that causes recursion
    - Keep the simple "Users can read own data" policy using auth.uid()
    - This allows users to read their own profile without recursion
    - Admins can be handled through application logic if needed

  3. Security
    - Users can only read their own profile data
    - No infinite recursion issues
    - Clean and simple policy structure
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can read all users" ON users;

-- Keep the simple policy that allows users to read their own data
-- This policy already exists and works correctly: "Users can read own data"
-- USING expression: (uid() = id)

-- Ensure the working policy exists (recreate if needed)
DO $$
BEGIN
  -- Check if the policy exists, if not create it
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data"
      ON users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;