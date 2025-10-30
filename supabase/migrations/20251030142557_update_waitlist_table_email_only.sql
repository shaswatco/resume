/*
  # Update Waitlist Table - Email Only

  1. Changes
    - Make full_name, current_status, and institution columns nullable
    - These fields are now optional for backward compatibility
    - New submissions will only use email field
  
  2. Notes
    - Email remains required and unique
    - Existing data is preserved
    - RLS policies remain unchanged
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'waitlist_submissions' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE waitlist_submissions ALTER COLUMN full_name DROP NOT NULL;
  END IF;
END $$;