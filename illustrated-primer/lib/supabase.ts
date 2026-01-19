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
  title: string;
  story_focus: string; // 'educational' or 'creative'
  segments: StorySegment[];
  images: string[];
  created_at: string;
  updated_at: string;
};

export type StorySegment = {
  type: 'ai' | 'user';
  text: string;
  timestamp: string;
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
