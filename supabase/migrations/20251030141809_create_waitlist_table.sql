/*
  # Waitlist Submissions Table

  1. New Tables
    - `waitlist_submissions`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required, unique)
      - `current_status` (text, optional)
      - `institution` (text, optional)
      - `created_at` (timestamptz, auto-generated)
      - `synced_to_sheets` (boolean, default false)

  2. Security
    - Enable RLS on `waitlist_submissions` table
    - Add policy for anonymous users to insert their own data
    - Add policy for service role to read all data for syncing
*/

CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  current_status text DEFAULT '',
  institution text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  synced_to_sheets boolean DEFAULT false
);

ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit to waitlist"
  ON waitlist_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read all submissions"
  ON waitlist_submissions
  FOR SELECT
  TO service_role
  USING (true);