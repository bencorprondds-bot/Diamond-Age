import { NextResponse } from 'next/server';
import { createStoryProvider } from '../../../lib/story-provider';
import type { StoryTheme, ReaderAge } from '../../../lib/prompts';

export async function POST(request: Request) {
  try {
    const {
      heroName,
      gender,
      theme = 'creative',
      readerAge = 'older',
      lovesToDo,
      wantsToLearn,
      specialTrait,
      hobbies,
      previousStory,
      userContribution,
    } = await request.json();

    const provider = createStoryProvider();

    const result = await provider.generateStory({
      heroName,
      gender,
      theme: theme as StoryTheme,
      readerAge: readerAge as ReaderAge,
      lovesToDo,
      wantsToLearn,
      specialTrait,
      hobbies,
      previousStory,
      userContribution,
    });

    return NextResponse.json({ story: result.story });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    );
  }
}
