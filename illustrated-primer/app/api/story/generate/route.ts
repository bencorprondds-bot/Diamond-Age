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

    // EDUCATIONAL MODE - Socratic Method (completely different from creative)
    if (storyFocus === 'educational') {
      if (previousStory && userContribution) {
        // Educational continuation - evaluate answer and ask next question
        promptContent = `You are a Socratic tutor helping a 10-year-old learn through guided questions. DO NOT tell answers directly - guide discovery through questions.

CRITICAL APPROACH:
- Read what the learner wrote carefully
- Acknowledge what they got right: "Yes! That's a good observation about..."
- If they're on the right track, ask a deeper follow-up question
- If they're off track, gently redirect: "Interesting thinking. What if we consider..."
- Use their hobbies/interests to make connections: ${hobbies}
- Keep it conversational and encouraging
- 4-6th grade level vocabulary

LEARNING TOPIC: ${wantsToLearn}

Here's the conversation so far:
${previousStory}

The learner just responded:
"${userContribution}"

Respond in 45-60 words:
1. Acknowledge their thinking (what's right or interesting)
2. Ask a follow-up question that guides them toward the answer
3. If they solved it, celebrate and present the next challenge

Remember: Questions, not answers! Guide them to discover it themselves.`;
      } else {
        // Educational opening - present a problem and ask first question
        promptContent = `You are a Socratic tutor for a 10-year-old who wants to learn about: ${wantsToLearn}

DO NOT teach by explaining. Teach by asking questions that guide discovery.

CHARACTER CONTEXT (use to personalize):
- Name: ${heroName} (${gender} pronouns)
- Loves: ${lovesToDo}
- Special at: ${specialTrait}
- Hobbies: ${hobbies}

TASK: Present a problem or scenario related to "${wantsToLearn}" that feels relevant to their interests. Then ask an opening question that starts their thinking.

FORMAT (45-60 words):
1. Present the problem: "We have a challenge..."
2. Give context related to their interests
3. Ask your first guiding question: "What do you think..."

CRITICAL:
- 4-6th grade level
- Make it feel like a puzzle to solve, not a lecture
- Connect to their hobbies: ${hobbies}
- Start simple, build complexity through questions
- NO direct teaching - only questions!

Example opening (for photosynthesis): "We need help! The plants in our greenhouse are wilting even though we water them daily. They're getting water and soil, but something's wrong. What else do you think plants need to stay healthy?"`;
      }
    }
    // CREATIVE MODE - Story-based adventure
    else {
      if (previousStory && userContribution) {
        // Creative story continuation
        const genreGuidance = getGenreGuidance(genre || 'fantasy');

        promptContent = `You are continuing an interactive adventure story for a 10-year-old reader who loves science, art, and learning.

This is a CREATIVE ADVENTURE story focused on imagination, excitement, and wonder. Keep it fun and fantastical!

${genreGuidance}

Here's the story so far:
${previousStory}

The reader just added this to the story:
"${userContribution}"

Continue the story (45-60 words - keep it tight!) building on what the reader wrote. Make their contribution meaningful and exciting. Keep the tone engaging and age-appropriate. End with another opportunity for them to respond.

CRITICAL: Keep response SHORT (45-60 words max). Less reading, more typing for the reader!

IMPORTANT: The hero's name is ${heroName} and uses ${gender} pronouns. Always use the correct pronouns throughout the story.`;
      } else {
        // Creative story opening
        const genreGuidance = getGenreGuidance(genre || 'fantasy');

        promptContent = `You are a creative storyteller for a 10-year-old reader who loves science, art, and learning.

This is a CREATIVE ADVENTURE story. Focus on imagination, wonder, magic, and fantastical elements. Make it thrilling and fun!

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
