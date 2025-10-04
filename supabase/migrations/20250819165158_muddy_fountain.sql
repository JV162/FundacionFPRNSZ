/*
  # Crear tabla de proyectos

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `goal_amount` (numeric)
      - `raised_amount` (numeric, default 0)
      - `status` (text, default 'active')
      - `image_url` (text)
      - `beneficiaries` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access
    - Add policy for admins to manage projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  goal_amount numeric(10,2) NOT NULL CHECK (goal_amount > 0),
  raised_amount numeric(10,2) DEFAULT 0 CHECK (raised_amount >= 0),
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  image_url text,
  beneficiaries integer DEFAULT 0 CHECK (beneficiaries >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Anyone can read projects (public access)
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admins can insert projects
CREATE POLICY "Admins can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can update projects
CREATE POLICY "Admins can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can delete projects
CREATE POLICY "Admins can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();