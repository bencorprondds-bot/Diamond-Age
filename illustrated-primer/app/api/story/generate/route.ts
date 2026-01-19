import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Genre-specific story guidance
function getGenreGuidance(genre: string): string {
  const genrePrompts: Record<string, string> = {
    fantasy: 'FANTASY GENRE: Include magic systems, mythical creatures, enchanted objects, and epic quests. Think wizards, dragons, magical forests, and ancient prophecies.',
    mystery: 'MYSTERY GENRE: Focus on clues, investigation, puzzles to solve, and secrets to uncover. Include red herrings, detective work, and plot twists.',
    solarpunk: 'SOLARPUNK GENRE: Feature sustainable technology, hopeful green futures, harmony between nature and innovation. Include solar panels, vertical gardens, community cooperation, and environmental solutions.',
    scifi: 'SCI-FI GENRE: Emphasize advanced technology, space exploration, futuristic science, robots, and scientific concepts. Make it plausible and grounded in real science when possible.',
    historical: 'HISTORICAL GENRE: Set the story in a real historical period with authentic details, real events, and period-appropriate language. Research-based and educational about the era.'
  };

  return genrePrompts[genre] || genrePrompts.fantasy;
}

export async function POST(request: Request) {
  try {
    const { heroName, gender, storyFocus, genre, lovesToDo, wantsToLearn, specialTrait, hobbies, previousStory, userContribution } = await request.json();

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    let promptContent;

    if (previousStory && userContribution) {
      // Story continuation
      const focusGuidance = storyFocus === 'educational'
        ? 'This is an EDUCATIONAL story, so weave in science concepts, problem-solving, or learning moments naturally. Teach through adventure!'
        : 'This is a CREATIVE ADVENTURE story focused on imagination, excitement, and wonder. Keep it fun and fantastical!';

      const genreGuidance = getGenreGuidance(genre || 'fantasy');

      promptContent = `You are continuing an interactive adventure story for a 10-year-old reader who loves science, art, and learning.

${focusGuidance}

${genreGuidance}

Here's the story so far:
${previousStory}

The reader just added this to the story:
"${userContribution}"

Continue the story (45-60 words - keep it tight!) building on what the reader wrote. Make their contribution meaningful and exciting. Keep the tone engaging and age-appropriate. End with another opportunity for them to respond.

CRITICAL: Keep response SHORT (45-60 words max). Less reading, more typing for the reader!

IMPORTANT: The hero's name is ${heroName} and uses ${gender} pronouns. Always use the correct pronouns throughout the story.`;
    } else {
      // Initial story creation
      const focusGuidance = storyFocus === 'educational'
        ? 'This is an EDUCATIONAL story. Incorporate science, math, engineering, or real-world problem-solving into the adventure. Make learning exciting and natural within the story!'
        : 'This is a CREATIVE ADVENTURE story. Focus on imagination, wonder, magic, and fantastical elements. Make it thrilling and fun!';

      const genreGuidance = getGenreGuidance(genre || 'fantasy');

      promptContent = `You are a creative storyteller for a 10-year-old reader who loves science, art, and learning.

${focusGuidance}

${genreGuidance}

Create the opening of an engaging adventure story (45-60 words - keep it concise!) featuring a hero with these traits:
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
