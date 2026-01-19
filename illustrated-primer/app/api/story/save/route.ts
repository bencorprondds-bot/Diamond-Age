import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { characterId, title, storyFocus, genre, segments, images } = await request.json();

    if (!characterId || !title || !storyFocus || !segments) {
      return NextResponse.json(
        { error: 'Character ID, title, story focus, and segments are required' },
        { status: 400 }
      );
    }

    const content = Array.isArray(segments)
      ? segments.map((seg: any) => seg?.text).filter(Boolean).join('\n\n')
      : '';

    const { data, error } = await supabaseAdmin
      .from('stories')
      .insert({
        character_id: characterId,
        title,
        story_type: storyFocus,
        genre: genre || 'fantasy',
        segments: segments,
        images: images || [],
        content,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json({ 
        error: 'Failed to save story', 
        details: error.message,
        hint: error.hint 
      }, { status: 500 });
    }

    return NextResponse.json({ story: data });
  } catch (error) {
    console.error('Error saving story:', error);
    return NextResponse.json({ error: 'Failed to save story' }, { status: 500 });
  }
}

// Update an existing story
export async function PUT(request: Request) {
  try {
    const { id, title, segments, images } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (title) updateData.title = title;
    if (segments) updateData.segments = segments;
    if (images) updateData.images = images;
    if (segments) {
      updateData.content = Array.isArray(segments)
        ? segments.map((seg: any) => seg?.text).filter(Boolean).join('\n\n')
        : '';
    }

    const { data, error } = await supabaseAdmin
      .from('stories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update story' }, { status: 500 });
    }

    return NextResponse.json({ story: data });
  } catch (error) {
    console.error('Error updating story:', error);
    return NextResponse.json({ error: 'Failed to update story' }, { status: 500 });
  }
}
