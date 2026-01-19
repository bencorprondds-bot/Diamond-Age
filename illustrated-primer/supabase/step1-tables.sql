-- STEP 1: Clean up and create tables only
-- Run this first

-- Drop existing objects if they exist
DROP TRIGGER IF EXISTS update_stories_updated_at ON stories;
DROP TRIGGER IF EXISTS update_characters_updated_at ON characters;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP POLICY IF EXISTS "Allow all operations on characters" ON characters;
DROP POLICY IF EXISTS "Allow all operations on stories" ON stories;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS characters CASCADE;

-- Create characters table
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  gender TEXT NOT NULL,
  loves_to_do TEXT,
  wants_to_learn TEXT,
  special_trait TEXT,
  hobbies TEXT,
  first_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stories table
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  story_focus TEXT NOT NULL,
  segments JSONB NOT NULL DEFAULT '[]'::jsonb,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_stories_character_id ON stories(character_id);
CREATE INDEX idx_stories_created_at ON stories(created_at DESC);
CREATE INDEX idx_characters_created_at ON characters(created_at DESC);
