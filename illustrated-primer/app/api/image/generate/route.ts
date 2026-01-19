import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Google AI API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Use Imagen 3 for image generation
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

    // Generate the image
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `Create a beautiful, child-friendly illustration for a storybook. Style: watercolor painting, whimsical, colorful, suitable for a 10-year-old. Scene: ${prompt}`,
        }],
      }],
      generationConfig: {
        temperature: 0.4,
        candidateCount: 1,
      },
    });

    const response = await result.response;

    // Extract the image data
    // Note: The actual response format may vary - this is a basic implementation
    // We'll need to adjust based on what Gemini actually returns
    const imageData = response.candidates?.[0]?.content?.parts?.[0];

    if (!imageData) {
      return NextResponse.json({ error: 'No image generated' }, { status: 500 });
    }

    return NextResponse.json({ imageData });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({
      error: 'Failed to generate image',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
