import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('characters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to load characters' }, { status: 500 });
    }

    return NextResponse.json({ characters: data });
  } catch (error) {
    console.error('Error loading characters:', error);
    return NextResponse.json({ error: 'Failed to load characters' }, { status: 500 });
  }
}
