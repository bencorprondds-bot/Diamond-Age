import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { prompt, referenceImage } = await request.json();

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

    // Build contents array - add reference image if provided for consistency
    const contents: any[] = [];
    
    if (referenceImage) {
      // Extract base64 data from data URL if needed
      const base64Data = referenceImage.startsWith('data:') 
        ? referenceImage.split(',')[1] 
        : referenceImage;
      
      // Add reference image and consistency instruction
      contents.push({
        role: 'user',
        parts: [
          {
            text: 'Use this reference image to maintain consistent character appearance and art style:'
          },
          {
            inlineData: {
              mimeType: 'image/png',
              data: base64Data
            }
          }
        ]
      });
    }
    
    // Add the main prompt
    contents.push(enhancedPrompt);

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: contents,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: '1:1',
        },
      },
    });

    // Extract the image from the response
    // The SDK may return candidates in different shapes
    const candidates =
      response.candidates ||
      response.response?.candidates ||
      response.result?.candidates ||
      [];

    if (!candidates || candidates.length === 0) {
      console.error('No candidates in response. Keys:', Object.keys(response || {}));
      return NextResponse.json({ error: 'No image generated', debug: 'No candidates' }, { status: 500 });
    }

    for (const candidate of candidates) {
      const parts = candidate?.content?.parts || [];

      for (const part of parts) {
        // Check for inlineData property (new format)
        if (part?.inlineData?.data) {
          const { mimeType, data } = part.inlineData;
          const imageDataUrl = `data:${mimeType};base64,${data}`;
          console.log('Image generated successfully, size:', data.length);
          return NextResponse.json({ imageData: imageDataUrl });
        }
        // Check for inline_data property (alternative format)
        if (part?.inline_data?.data) {
          const { mime_type, data } = part.inline_data;
          const imageDataUrl = `data:${mime_type};base64,${data}`;
          console.log('Image generated successfully, size:', data.length);
          return NextResponse.json({ imageData: imageDataUrl });
        }
        // Check for fileData property (some SDK versions)
        if (part?.fileData?.data && part?.fileData?.mimeType) {
          const { mimeType, data } = part.fileData;
          const imageDataUrl = `data:${mimeType};base64,${data}`;
          console.log('Image generated successfully, size:', data.length);
          return NextResponse.json({ imageData: imageDataUrl });
        }
      }
    }

    console.error('No image data found in candidates. First candidate keys:', Object.keys(candidates[0] || {}));
    return NextResponse.json({ error: 'No image generated', debug: 'No inlineData in parts' }, { status: 500 });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({
      error: 'Failed to generate image',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
