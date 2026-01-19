import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Get all stories for a specific character
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const characterId = searchParams.get('characterId');

    let query = supabaseAdmin
      .from('stories')
      .select(`
        *,
        character:characters(*)
      `)
      .order('created_at', { ascending: false });

    // Filter by character if provided
    if (characterId) {
      query = query.eq('character_id', characterId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to load stories' }, { status: 500 });
    }

    return NextResponse.json({ stories: data });
  } catch (error) {
    console.error('Error loading stories:', error);
    return NextResponse.json({ error: 'Failed to load stories' }, { status: 500 });
  }
}
