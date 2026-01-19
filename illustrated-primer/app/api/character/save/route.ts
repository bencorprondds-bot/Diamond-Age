import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, gender, lovesToDo, wantsToLearn, specialTrait, hobbies, firstImage } = await request.json();

    if (!name || !gender) {
      return NextResponse.json({ error: 'Name and gender are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('characters')
      .insert({
        name,
        gender,
        loves_to_do: lovesToDo || '',
        wants_to_learn: wantsToLearn || '',
        special_trait: specialTrait || '',
        hobbies: hobbies || '',
        first_image: firstImage || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save character' }, { status: 500 });
    }

    return NextResponse.json({ character: data });
  } catch (error) {
    console.error('Error saving character:', error);
    return NextResponse.json({ error: 'Failed to save character' }, { status: 500 });
  }
}

// Update an existing character
export async function PUT(request: Request) {
  try {
    const { id, name, gender, lovesToDo, wantsToLearn, specialTrait, hobbies, firstImage } = await request.json();

    if (!id || !name || !gender) {
      return NextResponse.json({ error: 'ID, name, and gender are required' }, { status: 400 });
    }

    const updateData: any = {
      name,
      gender,
      loves_to_do: lovesToDo || '',
      wants_to_learn: wantsToLearn || '',
      special_trait: specialTrait || '',
      hobbies: hobbies || '',
    };

    // Only update first_image if provided
    if (firstImage) {
      updateData.first_image = firstImage;
    }

    const { data, error } = await supabaseAdmin
      .from('characters')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update character' }, { status: 500 });
    }

    return NextResponse.json({ character: data });
  } catch (error) {
    console.error('Error updating character:', error);
    return NextResponse.json({ error: 'Failed to update character' }, { status: 500 });
  }
}
