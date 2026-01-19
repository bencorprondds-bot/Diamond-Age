import { createClient } from '@supabase/supabase-js';

// Database types
export type Character = {
  id: number;
  name: string;
  gender: string;
  loves_to_do: string;
  wants_to_learn: string;
  special_trait: string;
  hobbies: string;
  first_image?: string; // Store first image for reference
  created_at: string;
  updated_at: string;
};

export type Story = {
  id: number;
  character_id: number;
  title: string | null;              // Auto-generated on first save
  story_type: string;                 // 'educational' or 'creative' (renamed from story_focus)
  genre: string | null;               // 'fantasy', 'mystery', 'solarpunk', 'scifi', 'historical'
  educational_topic: string | null;   // If educational: "photosynthesis", "fractions", etc.
  summary: string | null;             // 1-2 sentence auto-generated summary
  first_image_url: string | null;     // Thumbnail for adventure cards
  total_sessions: number;             // Count of sessions for this story
  segments: StorySegment[];           // Legacy: for backward compatibility
  images: string[];                   // Legacy: for backward compatibility
  created_at: string;
  updated_at: string;
};

export type StorySegment = {
  type: 'ai' | 'user';
  text: string;
  timestamp: string;
};

export type StorySession = {
  id: number;
  story_id: number;
  session_number: number;             // 1, 2, 3, etc.
  segments: StorySegment[];           // Story content for this session
  images: string[];                   // Images generated during this session
  started_at: string;
  ended_at: string | null;

  // Typing metrics
  total_words_typed: number;
  total_time_seconds: number;
  average_wpm: number;
  accuracy_percentage: number;
  corrections_count: number;
};

export type EducationalProgress = {
  id: number;
  character_id: number;
  topic: string;                      // "photosynthesis", "fractions", etc.
  summary: string;                    // What was learned
  quiz_score: number | null;          // Retention quiz results (future)
  learned_at: string;
};

// Client for use in client components
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server client for use in API routes (with service role key)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
