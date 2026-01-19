import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
  try {
    const { heroName, lovesToDo, wantsToLearn, specialTrait, hobbies } = await request.json();
    
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a creative storyteller for a 10-year-old girl named Harlow who loves science, art, and learning. 

Create the opening of an engaging adventure story (about 150 words) featuring a hero with these traits:
- Name: ${heroName}
- Loves to do: ${lovesToDo}
- Wants to learn about: ${wantsToLearn}
- Special trait: ${specialTrait}
- Hobbies: ${hobbies}

Write in an engaging, age-appropriate style. Make it exciting and leave it on a cliffhanger so the story can continue. Use vivid descriptions and make the hero feel special and capable.`
      }]
    });

    const storyText = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ story: storyText });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}
