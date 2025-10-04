/*
  # Crear tabla de donaciones

  1. New Tables
    - `donations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `project_id` (uuid, foreign key to projects, nullable)
      - `amount` (numeric)
      - `payment_method` (text)
      - `status` (text, default 'pending')
      - `stripe_payment_id` (text, nullable)
      - `donor_name` (text)
      - `donor_email` (text)
      - `message` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `donations` table
    - Add policies for users and admins
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL CHECK (amount > 0),
  payment_method text NOT NULL CHECK (payment_method IN ('card', 'transfer', 'cash')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_payment_id text,
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Users can read their own donations
CREATE POLICY "Users can read own donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can read all donations
CREATE POLICY "Admins can read all donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Anyone can insert donations (for public donation form)
CREATE POLICY "Anyone can insert donations"
  ON donations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can update donations
CREATE POLICY "Admins can update donations"
  ON donations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Trigger to automatically update updated_at
CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();