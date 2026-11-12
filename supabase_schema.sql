-- ====================================================
-- MIGHTY NATION CHURCH - SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor if connecting Supabase
-- ====================================================

-- 1. PRAYER REQUESTS TABLE (Private & Secure)
CREATE TABLE IF NOT EXISTS prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT,
  email TEXT,
  prayer_request TEXT NOT NULL,
  permission_to_contact BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'prayed', 'archived')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a prayer request
CREATE POLICY "Public can insert prayer requests" 
  ON prayer_requests FOR INSERT 
  WITH CHECK (true);

-- Only authenticated users (admins) can view or modify requests
CREATE POLICY "Authenticated users can select prayer requests" 
  ON prayer_requests FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can update prayer requests" 
  ON prayer_requests FOR UPDATE 
  TO authenticated 
  USING (true);

-- 2. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to send messages
CREATE POLICY "Public can insert contact messages" 
  ON contact_messages FOR INSERT 
  WITH CHECK (true);

-- Only authenticated users (admins) can view or modify messages
CREATE POLICY "Authenticated users can select contact messages" 
  ON contact_messages FOR SELECT 
  TO authenticated 
  USING (true);

