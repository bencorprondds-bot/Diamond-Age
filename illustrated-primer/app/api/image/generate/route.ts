import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

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

    // Use Nano Banana (Gemini 2.5 Flash Image) for image generation
    const client = new GoogleGenAI({ apiKey });

    const enhancedPrompt = `Create a beautiful, child-friendly illustration for a storybook. Style: watercolor painting, whimsical, colorful, suitable for a 10-year-old. Scene: ${prompt}`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [enhancedPrompt],
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: '1:1',
        },
      },
    });

    console.log('Full response:', JSON.stringify(response, null, 2));

    // Extract the image from the response - candidates is directly on response
    const candidates = response.candidates;
    
    if (!candidates || candidates.length === 0) {
      console.log('No candidates in response');
      return NextResponse.json({ error: 'No image generated', debug: 'No candidates' }, { status: 500 });
    }

    const parts = candidates[0]?.content?.parts;
    
    if (!parts || parts.length === 0) {
      console.log('No parts in response');
      return NextResponse.json({ error: 'No image data in response', debug: 'No parts' }, { status: 500 });
    }

    for (const part of parts) {
      if (part.inlineData) {
        const { mimeType, data } = part.inlineData;
        const imageDataUrl = `data:${mimeType};base64,${data}`;
        return NextResponse.json({ imageData: imageDataUrl });
      }
    }

    console.log('No inlineData found in parts');
    return NextResponse.json({ error: 'No image generated', debug: 'No inlineData in parts' }, { status: 500 });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({
      error: 'Failed to generate image',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
