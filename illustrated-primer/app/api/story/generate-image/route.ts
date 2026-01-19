import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { storyText, heroName, gender } = await request.json();

    // Initialize Google AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate an image prompt based on the story
    const promptRequest = `Based on this story excerpt, create a detailed, vivid image description suitable for a children's book illustration. Focus on the main scene, characters, and setting. Make it beautiful, age-appropriate, and inspiring.

Story excerpt:
${storyText}

Hero's name: ${heroName}
Pronouns: ${gender}

Create a detailed image description in 2-3 sentences that captures the most exciting or important moment from this story segment. Include details about:
- The hero's appearance and expression
- The setting and environment
- The mood and atmosphere
- Any other characters or important objects

Image description:`;

    const result = await model.generateContent(promptRequest);
    const imagePrompt = result.response.text();

    // For now, we'll return the generated prompt
    // In the future, this could be sent to an actual image generation API (DALL-E, Stable Diffusion, etc.)
    // For MVP, we'll use placeholder images or generate them client-side

    return NextResponse.json({
      imagePrompt: imagePrompt.trim(),
      // Placeholder - in production, this would be a real generated image URL
      imageUrl: null
    });
  } catch (error) {
    console.error('Error generating image prompt:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
