-- Phase 1B Migration: Character Persistence Architecture
-- Run this in your Supabase SQL Editor
-- Date: 2026-01-19

-- ============================================================
-- STEP 1: Update stories table with new fields
-- ============================================================

-- Rename story_focus to story_type for clarity
ALTER TABLE stories
  RENAME COLUMN story_focus TO story_type;

-- Add new fields to stories table
ALTER TABLE stories
  ADD COLUMN IF NOT EXISTS genre VARCHAR(50),
  ADD COLUMN IF NOT EXISTS educational_topic TEXT,
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS first_image_url TEXT,
  ADD COLUMN IF NOT EXISTS total_sessions INTEGER DEFAULT 0;

-- Update existing stories to have at least 1 session
UPDATE stories SET total_sessions = 1 WHERE total_sessions = 0;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stories_character_id ON stories(character_id);
CREATE INDEX IF NOT EXISTS idx_stories_genre ON stories(genre);
CREATE INDEX IF NOT EXISTS idx_stories_story_type ON stories(story_type);

-- ============================================================
-- STEP 2: Create story_sessions table
-- ============================================================

CREATE TABLE IF NOT EXISTS story_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  session_number INTEGER NOT NULL,

  -- Story content for this session
  segments JSONB NOT NULL DEFAULT '[]',
  images TEXT[] DEFAULT '{}',

  -- Session timing
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,

  -- Typing metrics
  total_words_typed INTEGER DEFAULT 0,
  total_time_seconds INTEGER DEFAULT 0,
  average_wpm NUMERIC(5,2) DEFAULT 0,
  accuracy_percentage NUMERIC(5,2) DEFAULT 100,
  corrections_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_story_session UNIQUE(story_id, session_number)
);

-- Add indexes for story_sessions
CREATE INDEX IF NOT EXISTS idx_story_sessions_story_id ON story_sessions(story_id);
CREATE INDEX IF NOT EXISTS idx_story_sessions_started_at ON story_sessions(started_at);

-- Enable Row Level Security (RLS)
ALTER TABLE story_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policy (allow all for now - update when auth is added)
CREATE POLICY "Enable all access for story_sessions" ON story_sessions
  FOR ALL USING (true);

-- ============================================================
-- STEP 3: Create educational_progress table
-- ============================================================

CREATE TABLE IF NOT EXISTS educational_progress (
  id BIGSERIAL PRIMARY KEY,
  character_id BIGINT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,

  topic VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  quiz_score NUMERIC(5,2),

  learned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for educational_progress
CREATE INDEX IF NOT EXISTS idx_educational_progress_character_id ON educational_progress(character_id);
CREATE INDEX IF NOT EXISTS idx_educational_progress_topic ON educational_progress(topic);
CREATE INDEX IF NOT EXISTS idx_educational_progress_learned_at ON educational_progress(learned_at);

-- Enable Row Level Security (RLS)
ALTER TABLE educational_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policy (allow all for now - update when auth is added)
CREATE POLICY "Enable all access for educational_progress" ON educational_progress
  FOR ALL USING (true);

-- ============================================================
-- STEP 4: Migrate existing story data to sessions (if needed)
-- ============================================================

-- For each existing story, create a session with its current content
-- This preserves backward compatibility
INSERT INTO story_sessions (story_id, session_number, segments, images, started_at, ended_at)
SELECT
  id as story_id,
  1 as session_number,
  segments,
  images,
  created_at as started_at,
  updated_at as ended_at
FROM stories
WHERE NOT EXISTS (
  SELECT 1 FROM story_sessions WHERE story_sessions.story_id = stories.id
);

-- ============================================================
-- STEP 5: Create updated_at trigger function (if not exists)
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to stories table
DROP TRIGGER IF EXISTS update_stories_updated_at ON stories;
CREATE TRIGGER update_stories_updated_at
  BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to story_sessions table
DROP TRIGGER IF EXISTS update_story_sessions_updated_at ON story_sessions;
CREATE TRIGGER update_story_sessions_updated_at
  BEFORE UPDATE ON story_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to educational_progress table
DROP TRIGGER IF EXISTS update_educational_progress_updated_at ON educational_progress;
CREATE TRIGGER update_educational_progress_updated_at
  BEFORE UPDATE ON educational_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================

-- Verify tables exist
SELECT
  'stories' as table_name, COUNT(*) as record_count FROM stories
UNION ALL
SELECT 'story_sessions', COUNT(*) FROM story_sessions
UNION ALL
SELECT 'educational_progress', COUNT(*) FROM educational_progress
UNION ALL
SELECT 'characters', COUNT(*) FROM characters;
