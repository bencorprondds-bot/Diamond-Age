import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
  try {
    const { heroName, gender, lovesToDo, wantsToLearn, specialTrait, hobbies, previousStory, userContribution } = await request.json();

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    let promptContent;

    if (previousStory && userContribution) {
      // Story continuation
      promptContent = `You are continuing an interactive adventure story for a 10-year-old girl named Harlow who loves science, art, and learning.

Here's the story so far:
${previousStory}

The reader (Harlow) just added this to the story:
"${userContribution}"

Continue the story (about 100-150 words) building on what Harlow wrote. Make her contribution meaningful and exciting. Keep the tone engaging and age-appropriate. End with another opportunity for her to respond.

IMPORTANT: The hero's name is ${heroName} and uses ${gender} pronouns. Always use the correct pronouns throughout the story.`;
    } else {
      // Initial story creation
      promptContent = `You are a creative storyteller for a 10-year-old girl named Harlow who loves science, art, and learning.

Create the opening of an engaging adventure story (about 150 words) featuring a hero with these traits:
- Name: ${heroName}
- Pronouns: ${gender}
- Loves to do: ${lovesToDo}
- Wants to learn about: ${wantsToLearn}
- Special trait: ${specialTrait}
- Hobbies: ${hobbies}

IMPORTANT: Use ${gender} pronouns for ${heroName} throughout the entire story.

Write in an engaging, age-appropriate style. Make it exciting and leave it on a cliffhanger so the story can continue. Use vivid descriptions and make the hero feel special and capable.`;
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: promptContent
      }]
    });

    const storyText = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ story: storyText });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}
