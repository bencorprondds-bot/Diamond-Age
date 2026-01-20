import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
  try {
    const { segments, storyType, genre } = await request.json();

    if (!segments || segments.length === 0) {
      return NextResponse.json(
        { error: 'Story segments are required' },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Combine segments into full story text
    const storyText = segments
      .map((seg: any) => seg.text)
      .filter(Boolean)
      .join('\n\n');

    const promptContent = `You are analyzing a ${storyType || 'creative'} ${genre || ''} story for a 10-year-old.

Story content:
${storyText}

Generate TWO things:

1. A catchy, engaging title (3-6 words max) that captures the essence of this story
2. A brief summary (1-2 sentences, 20-30 words total) that describes what happens

Format your response EXACTLY like this:
TITLE: [your title here]
SUMMARY: [your summary here]

Keep it exciting and age-appropriate. The title should make a child want to read more!`;

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 256,
      messages: [{
        role: 'user',
        content: promptContent
      }]
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse the response
    const titleMatch = response.match(/TITLE:\s*(.+)/i);
    const summaryMatch = response.match(/SUMMARY:\s*(.+)/i);

    const title = titleMatch ? titleMatch[1].trim() : 'Untitled Adventure';
    const summary = summaryMatch ? summaryMatch[1].trim() : 'An exciting adventure awaits!';

    return NextResponse.json({ title, summary });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return NextResponse.json({ error: 'Failed to generate metadata' }, { status: 500 });
  }
}
