'use client';

import { useState, useEffect } from 'react';

type Character = {
  id: number;
  name: string;
  gender: string;
  loves_to_do: string;
  wants_to_learn: string;
  special_trait: string;
  hobbies: string;
  first_image?: string;
  created_at: string;
  updated_at: string;
};

type Story = {
  id: number;
  character_id: number;
  title: string;
  story_focus: string;
  segments: Array<{type: 'ai' | 'user', text: string, timestamp: string}>;
  images: string[];
  created_at: string;
  updated_at: string;
  character?: Character;
};

export function Book() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Screen state: 'menu' | 'create' | 'edit' | 'story' | 'adventures'
  const [screen, setScreen] = useState<'menu' | 'create' | 'edit' | 'story' | 'adventures'>('menu');

  // Character management
  const [savedCharacters, setSavedCharacters] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [editingCharacterId, setEditingCharacterId] = useState<number | null>(null);
  
  // Form state
  const [heroName, setHeroName] = useState('');
  const [gender, setGender] = useState('');
  const [storyFocus, setStoryFocus] = useState('');
  const [genre, setGenre] = useState('');
  const [lovesToDo, setLovesToDo] = useState('');
  const [wantsToLearn, setWantsToLearn] = useState('');
  const [specialTrait, setSpecialTrait] = useState('');
  const [hobbies, setHobbies] = useState('');

  // Story management
  const [currentStoryId, setCurrentStoryId] = useState<number | null>(null);
  const [storyTitle, setStoryTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedStories, setSavedStories] = useState<Story[]>([]);

  // Confirmation state
  const [showSaved, setShowSaved] = useState(false);

  // Loading and story state
  const [isGenerating, setIsGenerating] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storySegments, setStorySegments] = useState<Array<{type: 'ai' | 'user', text: string}>>([]);
  const [userInput, setUserInput] = useState('');

  // Image state
  const [images, setImages] = useState<string[]>([]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Typing metrics state
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [totalCharactersTyped, setTotalCharactersTyped] = useState(0);
  const [correctionsCount, setCorrectionsCount] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  // Typewriter effect state
  const [displayedHeading, setDisplayedHeading] = useState('');
  const fullHeading = screen === 'create' ? '✨ Create Your Hero ✨' : screen === 'edit' ? '✨ Edit Your Hero ✨' : screen === 'adventures' ? `✨ ${selectedCharacter?.name}'s Adventures ✨` : '✨ Your Adventures ✨';
  
  // Load saved characters when book opens
  useEffect(() => {
    if (isOpen && screen === 'menu') {
      loadCharacters();
    }
  }, [isOpen, screen]);
  
  const loadCharacters = async () => {
    try {
      const response = await fetch('/api/character/list');
      const data = await response.json();
      if (data.characters) {
        setSavedCharacters(data.characters);
      }
    } catch (error) {
      console.error('Failed to load characters:', error);
    }
  };

  const loadStoriesForCharacter = async (characterId: number) => {
    try {
      console.log('Loading stories for character:', characterId);
      const response = await fetch(`/api/story/list?characterId=${characterId}`);
      const data = await response.json();
      console.log('Stories loaded:', data);
      if (data.stories) {
        setSavedStories(data.stories);
      }
    } catch (error) {
      console.error('Failed to load stories:', error);
    }
  };

  const saveCharacter = async () => {
    try {
      const method = editingCharacterId ? 'PUT' : 'POST';
      const body: any = {
        name: heroName,
        gender,
        lovesToDo,
        wantsToLearn,
        specialTrait,
        hobbies,
      };
      
      if (editingCharacterId) {
        body.id = editingCharacterId;
      }
      
      // Include first image if available
      if (images.length > 0) {
        body.firstImage = images[0];
      }

      const response = await fetch('/api/character/save', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.character) {
        setCurrentCharacter(data.character);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
        await loadCharacters();
        return data.character;
      }
    } catch (error) {
      console.error('Failed to save character:', error);
    }
    return null;
  };

  const saveStory = async () => {
    if (!currentCharacter) return;

    try {
      const effectiveStoryFocus = storyFocus?.trim() || 'creative';
      const method = currentStoryId ? 'PUT' : 'POST';

      let finalTitle = storyTitle.trim();
      let summary = '';

      // For new stories, auto-generate title and summary if title is empty
      if (!currentStoryId && !finalTitle) {
        try {
          const metadataResponse = await fetch('/api/story/generate-metadata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              segments: storySegments,
              storyType: effectiveStoryFocus,
              genre: genre?.trim() || 'fantasy'
            }),
          });

          if (metadataResponse.ok) {
            const metadata = await metadataResponse.json();
            finalTitle = metadata.title || 'Untitled Adventure';
            summary = metadata.summary || '';
          } else {
            finalTitle = 'Untitled Adventure';
          }
        } catch (metadataError) {
          console.error('Failed to generate metadata:', metadataError);
          finalTitle = 'Untitled Adventure';
        }
      }

      // Calculate typing metrics for this session
      const typingMetrics = calculateTypingMetrics();

      const body: any = {
        title: finalTitle,
        segments: storySegments.map((seg, idx) => ({
          ...seg,
          timestamp: new Date().toISOString(),
        })),
        images,
      };

      if (currentStoryId) {
        body.id = currentStoryId;
      } else {
        body.characterId = currentCharacter.id;
        body.storyFocus = effectiveStoryFocus;
        body.genre = genre?.trim() || 'fantasy';
        if (summary) {
          body.summary = summary;
        }
        // Store first image as thumbnail
        if (images && images.length > 0) {
          body.firstImageUrl = images[0];
        }
        // Include typing metrics
        body.typingMetrics = typingMetrics;
      }

      console.log('Saving story with body:', JSON.stringify(body, null, 2));

      const response = await fetch('/api/story/save', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const responseText = await response.text();
      let data: any = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('Failed to parse response JSON:', responseText);
      }

      console.log('Response status:', response.status, response.statusText);
      console.log('Response text:', responseText || '(empty)');
      console.log('Response from API:', data);

      if (!response.ok) {
        console.error('Save failed with HTTP error:', response.status, response.statusText);
        return;
      }
      
      if (data.story) {
        console.log('Story saved successfully:', data.story);
        setCurrentStoryId(data.story.id);
        setShowSaveDialog(false);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 3000);
      } else {
        console.error('No story in response:', data);
      }
    } catch (error) {
      console.error('Failed to save story:', error);
    }
  };

  const loadStory = async (storyId: number) => {
    try {
      console.log('Loading story:', storyId);
      const response = await fetch(`/api/story/load/${storyId}`);
      const responseText = await response.text();
      let data: any = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('Failed to parse load story response JSON:', responseText);
      }

      console.log('Load story response status:', response.status, response.statusText);
      console.log('Load story response text:', responseText || '(empty)');
      console.log('Load story response data:', data);

      if (!response.ok) {
        console.error('Load story failed with HTTP error:', response.status, response.statusText);
        return;
      }
      
      if (data.story) {
        const story = data.story;
        setCurrentStoryId(story.id);
        setStoryTitle(story.title);
        setStoryFocus(story.story_focus);
        setStorySegments(story.segments || []);
        setImages(story.images || []);
        
        // Load character data
        if (story.character) {
          const char = story.character;
          setCurrentCharacter(char);
          setHeroName(char.name);
          setGender(char.gender);
          setLovesToDo(char.loves_to_do || '');
          setWantsToLearn(char.wants_to_learn || '');
          setSpecialTrait(char.special_trait || '');
          setHobbies(char.hobbies || '');
        }
        
        setScreen('story');
        setShowStory(true);
      }
    } catch (error) {
      console.error('Failed to load story:', error);
    }
  };

  const loadCharacterForEdit = (character: Character) => {
    setEditingCharacterId(character.id);
    setCurrentCharacter(character);
    setHeroName(character.name);
    setGender(character.gender);
    setLovesToDo(character.loves_to_do || '');
    setWantsToLearn(character.wants_to_learn || '');
    setSpecialTrait(character.special_trait || '');
    setHobbies(character.hobbies || '');
    setScreen('edit');
  };

  const viewCharacterAdventures = async (character: Character) => {
    setSelectedCharacter(character);
    await loadStoriesForCharacter(character.id);
    setScreen('adventures');
  };

  const startNewStoryWithCharacter = (character: Character) => {
    setCurrentCharacter(character);
    setHeroName(character.name);
    setGender(character.gender);
    setLovesToDo(character.loves_to_do || '');
    setWantsToLearn(character.wants_to_learn || '');
    setSpecialTrait(character.special_trait || '');
    setHobbies(character.hobbies || '');

    // Reset story state
    setCurrentStoryId(null);
    setStoryTitle('');
    setStorySegments([]);
    setImages([]);
    setShowStory(false);

    // Load previous stories for this character
    loadStoriesForCharacter(character.id);

    setScreen('create');
  };

  const resetToMenu = () => {
    setScreen('menu');
    setCurrentCharacter(null);
    setEditingCharacterId(null);
    setHeroName('');
    setGender('');
    setStoryFocus('');
    setLovesToDo('');
    setWantsToLearn('');
    setSpecialTrait('');
    setHobbies('');
    setStorySegments([]);
    setImages([]);
    setShowStory(false);
    setCurrentStoryId(null);
    setStoryTitle('');
    setSavedStories([]);
  };
  
  useEffect(() => {
    if (isOpen && displayedHeading.length < fullHeading.length) {
      const timeout = setTimeout(() => {
        setDisplayedHeading(fullHeading.slice(0, displayedHeading.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, displayedHeading, fullHeading]);
  
  // Reset typewriter when book opens or screen changes
  useEffect(() => {
    if (isOpen) {
      setDisplayedHeading('');
    }
  }, [isOpen, screen]);
  
  const isFormValid = heroName.trim().length > 0 && gender.length > 0 && storyFocus.length > 0 && genre.length > 0;

  // Function to generate an illustration based on story text
  const generateImage = async (storyText: string, isFirstImage: boolean = false) => {
    setIsGeneratingImage(true);

    try {
      // Build the prompt with watercolor style and consistency instructions
      let styleInstructions = 'Create a beautiful watercolor illustration suitable for a children\'s storybook. ';

      if (isFirstImage) {
        // First image: establish the character and style
        styleInstructions += `Watercolor painting style with soft colors and whimsical details. The main character is ${heroName} who loves ${lovesToDo || 'adventure'}. `;
      } else {
        // Subsequent images: maintain consistency
        styleInstructions += `IMPORTANT: Match the exact watercolor painting style from the previous illustrations. Keep the same character design for ${heroName} with consistent features, clothing, and appearance. `;
      }

      const imagePrompt = `${styleInstructions}Scene: ${storyText.slice(0, 200)}`;

      const body: any = { prompt: imagePrompt };
      
      // TODO: Re-enable reference images once we optimize the size
      // Pass first image as reference for subsequent images
      // if (!isFirstImage && images.length > 0) {
      //   body.referenceImage = images[0];
      // }

      const response = await fetch('/api/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Image generation error:', data.error);
        // Don't throw - just log the error and continue without image
        setIsGeneratingImage(false);
        return;
      }

      // Add the new image to the array (append, don't replace)
      if (data.imageData) {
        setImages(prev => [...prev, data.imageData]);
      }

      setIsGeneratingImage(false);
    } catch (error) {
      console.error('Failed to generate image:', error);
      setIsGeneratingImage(false);
    }
  };

  // Typing metrics handlers
  const handleTypingStart = () => {
    if (!typingStartTime) {
      const now = Date.now();
      setTypingStartTime(now);
      if (!sessionStartTime) {
        setSessionStartTime(now);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Start timer on first keystroke
    handleTypingStart();

    // Track backspace for corrections
    if (e.key === 'Backspace') {
      setCorrectionsCount(prev => prev + 1);
    }
  };

  const handleTypingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const oldValue = userInput;

    // Start timer on first change
    handleTypingStart();

    // Track characters typed (only count additions, not deletions)
    if (newValue.length > oldValue.length) {
      const charsAdded = newValue.length - oldValue.length;
      setTotalCharactersTyped(prev => prev + charsAdded);
    }

    setUserInput(newValue);
  };

  const calculateTypingMetrics = () => {
    if (!typingStartTime || !sessionStartTime) {
      return {
        totalWordsTyped: 0,
        totalTimeSeconds: 0,
        averageWPM: 0,
        accuracyPercentage: 100,
        correctionsCount: 0
      };
    }

    const totalTimeSeconds = (Date.now() - sessionStartTime) / 1000;
    const minutes = totalTimeSeconds / 60;

    // WPM calculation: (characters / 5) / minutes
    const words = totalCharactersTyped / 5;
    const averageWPM = minutes > 0 ? Math.round(words / minutes) : 0;

    // Accuracy: fewer corrections = higher accuracy
    const accuracyPercentage = totalCharactersTyped > 0
      ? Math.max(0, Math.round(100 - (correctionsCount / totalCharactersTyped * 100)))
      : 100;

    return {
      totalWordsTyped: Math.round(words),
      totalTimeSeconds: Math.round(totalTimeSeconds),
      averageWPM,
      accuracyPercentage,
      correctionsCount
    };
  };

  const resetTypingMetrics = () => {
    setTypingStartTime(null);
    setTotalCharactersTyped(0);
    setCorrectionsCount(0);
    // Keep sessionStartTime to track overall session
  };

  const handleBeginAdventure = async () => {
    console.log('Hero Created:', {
      heroName,
      gender,
      storyFocus,
      genre,
      lovesToDo,
      wantsToLearn,
      specialTrait,
      hobbies
    });

    setIsGenerating(true);

    try {
      // Save character first (if not already saved)
      if (!currentCharacter) {
        const savedChar = await saveCharacter();
        if (!savedChar) {
          throw new Error('Failed to save character');
        }
      }
      
      const response = await fetch('/api/story/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heroName,
          gender,
          storyFocus,
          genre,
          lovesToDo,
          wantsToLearn,
          specialTrait,
          hobbies
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setIsGenerating(false);
      setShowStory(true);
      setScreen('story');
      setStorySegments([{ type: 'ai', text: data.story }]);

      // Initialize typing session
      setSessionStartTime(Date.now());
      resetTypingMetrics();

      // Generate the first illustration for the story
      generateImage(data.story, true);
    } catch (error) {
      console.error('Failed to generate story:', error);
      setIsGenerating(false);
      setShowStory(true);
      setScreen('story');
      setStorySegments([{ type: 'ai', text: `Once upon a time, there lived a remarkable hero named ${heroName}. ${heroName} loved nothing more than ${lovesToDo || 'exploring new places'}, and spent their days dreaming of ${wantsToLearn || 'great adventures'}. What made ${heroName} truly special was ${specialTrait || 'their kind heart'}, a gift that would prove invaluable in the journey ahead. When not on adventures, ${heroName} enjoyed ${hobbies || 'reading by candlelight'}. Little did they know that today would be the beginning of their greatest adventure yet...` }]);
    }
  };

  const handleContinueStory = async () => {
    if (!userInput.trim()) return;

    const userContribution = userInput;
    setUserInput('');
    setIsGenerating(true);

    // Add user's contribution to the story immediately
    setStorySegments(prev => [...prev, { type: 'user', text: userContribution }]);

    try {
      // Get full story context for the API
      const previousStory = storySegments.map(seg => seg.text).join('\n\n');

      const response = await fetch('/api/story/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          previousStory,
          userContribution,
          heroName,
          gender,
          storyFocus,
          genre
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setIsGenerating(false);
      // Add AI's continuation as a new segment
      setStorySegments(prev => [...prev, { type: 'ai', text: data.story }]);

      // Reset typing metrics for next typing session
      resetTypingMetrics();

      // Generate a new illustration for this continuation
      generateImage(data.story);
    } catch (error) {
      console.error('Failed to continue story:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
      {!isOpen ? (
        // CLOSED BOOK (shown when isOpen is false)
        <div 
          className="cursor-pointer transform transition-all duration-500 hover:scale-105"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative w-96 h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-r-lg shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-serif text-amber-100 mb-2 tracking-wider">
                  The Illustrated
                </h1>
                <h2 className="text-5xl font-serif text-amber-50 font-bold tracking-wide">
                  Primer
                </h2>
                <div className="mt-6 text-amber-200 text-sm italic">
                  Click to begin...
                </div>
              </div>
              <div className="absolute inset-2 border-2 border-amber-600 rounded-r-lg opacity-50"></div>
            </div>
          </div>
        </div>
      ) : (
        // OPEN BOOK (shown when isOpen is true)
        <div className="w-full max-w-7xl mx-auto px-4 animate-fadeIn">
          <div className="flex gap-8 min-h-[600px]">
            
            {/* LEFT PAGE - Character Creation Form / Loading / Story */}
            <div className="flex-1 bg-[#F4E8D8] rounded-lg shadow-2xl p-8 relative flex flex-col">
              {screen === 'menu' ? (
                // CHARACTER SELECTION MENU
                <div className="flex-1 flex flex-col animate-fadeIn">
                  <h3 className="text-3xl font-serif text-amber-900 mb-6 text-center">
                    {displayedHeading}
                    <span className="animate-pulse">|</span>
                  </h3>
                  
                  <div className="flex-1 overflow-y-auto mb-4">
                    {savedCharacters.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📖</div>
                        <p className="text-amber-800 font-serif text-lg mb-6">
                          No heroes yet! Create your first character to begin.
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {savedCharacters.map((character) => (
                          <div
                            key={character.id}
                            onClick={() => viewCharacterAdventures(character)}
                            className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg p-4 hover:border-amber-500 transition-all cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xl font-serif text-amber-900 font-bold">
                                {character.name}
                              </h4>
                              <span className="text-sm text-amber-600 px-2 py-1 bg-amber-100 rounded">
                                {character.gender}
                              </span>
                            </div>
                            {character.loves_to_do && (
                              <p className="text-sm text-amber-800 mb-2">
                                Loves to: {character.loves_to_do}
                              </p>
                            )}
                            <p className="text-xs text-amber-600 italic">
                              Click to view adventures →
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setScreen('create')}
                    className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 py-3 px-6 rounded-lg font-serif text-lg hover:from-amber-800 hover:to-amber-900 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all"
                  >
                    + Create New Hero
                  </button>
                </div>
              ) : screen === 'adventures' ? (
                // CHARACTER ADVENTURES VIEW
                <div className="flex-1 flex flex-col animate-fadeIn">
                  <div className="flex justify-between items-center mb-6">
                    <button
                      onClick={() => {
                        setScreen('menu');
                        setSelectedCharacter(null);
                        setSavedStories([]);
                      }}
                      className="text-amber-700 hover:text-amber-900 font-serif text-sm transition-all"
                    >
                      ← Back to Characters
                    </button>
                    <button
                      onClick={() => selectedCharacter && startNewStoryWithCharacter(selectedCharacter)}
                      className="bg-amber-600 text-amber-50 py-2 px-4 rounded-lg font-serif text-sm hover:bg-amber-700 transition-all"
                    >
                      + New Adventure
                    </button>
                  </div>

                  <h3 className="text-3xl font-serif text-amber-900 mb-6 text-center">
                    {displayedHeading}
                    <span className="animate-pulse">|</span>
                  </h3>

                  {selectedCharacter && (
                    <div className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-serif text-amber-900 font-bold mb-2">
                            {selectedCharacter.name}
                          </h4>
                          {selectedCharacter.loves_to_do && (
                            <p className="text-sm text-amber-800">
                              Loves to: {selectedCharacter.loves_to_do}
                            </p>
                          )}
                          {selectedCharacter.wants_to_learn && (
                            <p className="text-sm text-amber-800">
                              Wants to learn: {selectedCharacter.wants_to_learn}
                            </p>
                          )}
                        </div>
                        <span className="text-sm text-amber-600 px-2 py-1 bg-amber-100 rounded">
                          {selectedCharacter.gender}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto">
                    {savedStories.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🌟</div>
                        <p className="text-amber-800 font-serif text-lg mb-4">
                          No adventures yet for {selectedCharacter?.name}!
                        </p>
                        <p className="text-amber-600 font-serif text-sm">
                          Click "New Adventure" above to begin.
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-4 pb-4">
                        {savedStories.map((story) => (
                          <div
                            key={story.id}
                            onClick={() => loadStory(story.id)}
                            className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg overflow-hidden hover:border-amber-500 transition-all cursor-pointer group"
                          >
                            <div className="flex gap-4">
                              {story.images && story.images[0] && (
                                <div className="w-32 h-32 flex-shrink-0 bg-amber-100">
                                  <img
                                    src={story.images[0]}
                                    alt={story.title || 'Adventure thumbnail'}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 p-4">
                                <h5 className="text-lg font-serif text-amber-900 font-bold mb-2 group-hover:text-amber-700">
                                  {story.title || 'Untitled Adventure'}
                                </h5>
                                <div className="flex gap-2 mb-2">
                                  <span className="text-xs text-amber-600 px-2 py-1 bg-amber-100 rounded">
                                    {story.story_type}
                                  </span>
                                  {story.genre && (
                                    <span className="text-xs text-amber-600 px-2 py-1 bg-amber-100 rounded capitalize">
                                      {story.genre}
                                    </span>
                                  )}
                                </div>
                                {story.segments && story.segments.length > 0 && (
                                  <p className="text-sm text-amber-800 line-clamp-2">
                                    {story.segments[0].text.substring(0, 120)}...
                                  </p>
                                )}
                                <p className="text-xs text-amber-600 mt-2 italic">
                                  Click to continue →
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : isGenerating ? (
                // LOADING STATE
                <div className="flex-1 flex flex-col items-center justify-center animate-fadeIn">
                  <div className="text-6xl mb-6 animate-pulse">📖</div>
                  <h3 className="text-2xl font-serif text-amber-800 mb-4">Creating your adventure...</h3>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              ) : showStory ? (
                // STORY DISPLAY STATE
                <div className="flex-1 flex flex-col animate-fadeIn">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={resetToMenu}
                      className="text-amber-700 hover:text-amber-900 font-serif text-sm transition-all"
                    >
                      ← Back to Menu
                    </button>
                    <button
                      onClick={() => setShowSaveDialog(true)}
                      disabled={showSaved}
                      className={`py-1 px-4 rounded-lg font-serif text-sm transition-all ${
                        showSaved 
                          ? 'bg-green-600 text-white cursor-default'
                          : 'bg-amber-600 text-amber-50 hover:bg-amber-700'
                      }`}
                    >
                      {showSaved ? '✓ Saved!' : (currentStoryId ? 'Update Story' : 'Save Story')}
                    </button>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-amber-900 mb-6 text-center">
                    📖 {storyTitle || `The Tale of ${heroName}`}
                  </h3>
                  
                  {showSaved && (
                    <div className="bg-green-600 text-white rounded-lg px-6 py-3 mb-4 flex items-center gap-3 shadow-xl border-2 border-green-700 animate-pulse">
                      <span className="text-2xl animate-bounce">✓</span>
                      <div>
                        <div className="font-serif font-bold">Story Saved Successfully!</div>
                        <div className="text-sm opacity-90">Your adventure has been saved and can be continued later.</div>
                      </div>
                    </div>
                  )}
                  
                  {showSaveDialog && (
                    <div className="bg-[#FDF8F0] border-2 border-amber-400 rounded-lg p-4 mb-4 animate-fadeIn">
                      <label className="text-amber-800 font-serif text-sm block mb-2">
                        Story Title (optional - we'll create one for you!):
                      </label>
                      <input
                        type="text"
                        value={storyTitle}
                        onChange={(e) => setStoryTitle(e.target.value)}
                        placeholder="Leave blank for auto-generated title..."
                        className="w-full bg-white border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 mb-3 focus:outline-none focus:border-amber-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveStory}
                          className="flex-1 py-2 px-4 rounded-lg font-serif text-sm bg-amber-600 text-amber-50 hover:bg-amber-700 transition-all"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setShowSaveDialog(false)}
                          className="flex-1 bg-amber-200 text-amber-900 py-2 px-4 rounded-lg font-serif text-sm hover:bg-amber-300 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-lg font-serif leading-relaxed flex-1 overflow-y-auto mb-4">
                    {storySegments.map((segment, index) => (
                      <div key={index}>
                        {segment.type === 'ai' ? (
                          <p className={`text-amber-950 mb-4 ${index === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:text-amber-800 first-letter:mr-3 first-letter:float-left first-letter:leading-none' : ''}`}>
                            {segment.text}
                          </p>
                        ) : (
                          <div className="bg-[#E8DCC8] rounded-lg px-4 py-3 my-4 ml-4 border-l-4 border-amber-500">
                            <p className="text-amber-900 italic">
                              {segment.text}
                            </p>
                          </div>
                        )}
                        {index < storySegments.length - 1 && (
                          <div className="text-center text-amber-500 my-4">
                            ❦
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {!isGenerating && (
                    <div className="flex flex-col gap-3 mt-4">
                      <textarea
                        value={userInput}
                        onChange={handleTypingChange}
                        onKeyDown={handleKeyDown}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-3 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all resize-none"
                        placeholder="What happens next? Type your response..."
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleContinueStory}
                          disabled={!userInput.trim()}
                          className={`flex-1 font-serif text-lg py-2 px-6 rounded-lg shadow-lg transition-all duration-200 ${
                            userInput.trim()
                              ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 hover:from-amber-800 hover:to-amber-900 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          }`}
                        >
                          Continue Story
                        </button>
                        <button
                          onClick={() => setShowSaveDialog(true)}
                          disabled={showSaved}
                          className={`py-2 px-6 rounded-lg font-serif text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                            showSaved
                              ? 'bg-green-600 text-white cursor-default'
                              : 'bg-amber-600 text-amber-50 hover:bg-amber-700'
                          }`}
                        >
                          {showSaved ? '✓ Saved!' : '💾 Save'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // FORM STATE (create or edit character)
                <>
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={resetToMenu}
                      className="text-amber-700 hover:text-amber-900 font-serif text-sm transition-all"
                    >
                      ← Back to Menu
                    </button>
                  </div>
                  
                  <h3 className="text-3xl font-serif text-amber-900 mb-6 text-center min-h-[2.5rem]">
                    {displayedHeading}
                    <span className="animate-pulse">|</span>
                  </h3>
                  
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex flex-col gap-1">
                      <label className="text-amber-800 font-serif text-sm">What&apos;s your hero&apos;s name?</label>
                      <input
                        type="text"
                        value={heroName}
                        onChange={(e) => setHeroName(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Enter a name..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-amber-800 font-serif text-sm">What pronouns does your hero use?</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setGender('she/her')}
                          className={`flex-1 py-2 px-4 rounded-lg font-serif text-sm transition-all ${
                            gender === 'she/her'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          She/Her
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('he/him')}
                          className={`flex-1 py-2 px-4 rounded-lg font-serif text-sm transition-all ${
                            gender === 'he/him'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          He/Him
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('they/them')}
                          className={`flex-1 py-2 px-4 rounded-lg font-serif text-sm transition-all ${
                            gender === 'they/them'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          They/Them
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-amber-800 font-serif text-sm">What kind of story would you like?</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setStoryFocus('creative')}
                          className={`flex-1 py-3 px-4 rounded-lg font-serif text-sm transition-all ${
                            storyFocus === 'creative'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          <div className="font-semibold">Creative Adventure</div>
                          <div className="text-xs mt-1 opacity-80">Pure imagination & fun!</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setStoryFocus('educational')}
                          className={`flex-1 py-3 px-4 rounded-lg font-serif text-sm transition-all ${
                            storyFocus === 'educational'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          <div className="font-semibold">Educational Journey</div>
                          <div className="text-xs mt-1 opacity-80">Learn science, building & more!</div>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-amber-800 font-serif text-sm">Choose your adventure genre:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setGenre('fantasy')}
                          className={`py-3 px-3 rounded-lg font-serif text-sm transition-all ${
                            genre === 'fantasy'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          <div className="font-semibold">Fantasy</div>
                          <div className="text-xs mt-1 opacity-80">Magic & quests</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setGenre('mystery')}
                          className={`py-3 px-3 rounded-lg font-serif text-sm transition-all ${
                            genre === 'mystery'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          <div className="font-semibold">Mystery</div>
                          <div className="text-xs mt-1 opacity-80">Solve puzzles</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setGenre('solarpunk')}
                          className={`py-3 px-3 rounded-lg font-serif text-sm transition-all ${
                            genre === 'solarpunk'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          <div className="font-semibold">Solarpunk</div>
                          <div className="text-xs mt-1 opacity-80">Green futures</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setGenre('scifi')}
                          className={`py-3 px-3 rounded-lg font-serif text-sm transition-all ${
                            genre === 'scifi'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          <div className="font-semibold">Sci-Fi</div>
                          <div className="text-xs mt-1 opacity-80">Space & tech</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setGenre('historical')}
                          className={`py-3 px-3 rounded-lg font-serif text-sm transition-all ${
                            genre === 'historical'
                              ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                              : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                          }`}
                        >
                          <div className="font-semibold">Historical</div>
                          <div className="text-xs mt-1 opacity-80">Real history</div>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-amber-800 font-serif text-sm">What do they love to do?</label>
                      <input 
                        type="text"
                        value={lovesToDo}
                        onChange={(e) => setLovesToDo(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Their favorite activities..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-amber-800 font-serif text-sm">What do you want to learn about?</label>
                      <input 
                        type="text"
                        value={wantsToLearn}
                        onChange={(e) => setWantsToLearn(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Topics that spark curiosity..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-amber-800 font-serif text-sm">What makes them special?</label>
                      <input 
                        type="text"
                        value={specialTrait}
                        onChange={(e) => setSpecialTrait(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Their unique talents..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-amber-800 font-serif text-sm">What are their hobbies?</label>
                      <input 
                        type="text"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Their favorite hobbies..."
                      />
                    </div>

                    {showSaved && (
                      <div className="bg-green-100 text-green-700 rounded-lg px-4 py-3 flex items-center gap-2 animate-fadeIn">
                        <span className="text-xl">✓</span>
                        <span className="font-serif">{editingCharacterId ? 'Character Updated!' : 'Hero Saved!'}</span>
                      </div>
                    )}

                    {screen === 'edit' ? (
                      // Edit mode: Save changes button
                      <div className="flex gap-2">
                        <button 
                          onClick={async () => {
                            await saveCharacter();
                          }}
                          disabled={!isFormValid}
                          className={`flex-1 font-serif text-lg py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ${
                            isFormValid 
                              ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 hover:from-amber-800 hover:to-amber-900 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer' 
                              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          }`}
                        >
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      // Create mode: Begin adventure and show saved stories
                      <>
                        {savedStories.length > 0 && (
                          <div className="mb-4 bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                            <h4 className="text-amber-900 font-serif font-bold mb-2">Previous Adventures:</h4>
                            <div className="space-y-2">
                              {savedStories.map((story) => (
                                <button
                                  key={story.id}
                                  onClick={() => loadStory(story.id)}
                                  className="w-full text-left bg-white hover:bg-amber-100 border border-amber-300 rounded px-3 py-2 text-sm font-serif text-amber-800 transition-all"
                                >
                                  {story.title}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <button 
                          onClick={handleBeginAdventure}
                          disabled={!isFormValid}
                          className={`mt-4 font-serif text-lg py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ${
                            isFormValid 
                              ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 hover:from-amber-800 hover:to-amber-900 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer' 
                              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          }`}
                        >
                          Begin Adventure
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}

              <div className="absolute bottom-4 right-4 text-amber-600 text-sm">
                1
              </div>
            </div>

            {/* RIGHT PAGE - Image Gallery */}
            <div className="flex-1 bg-[#2C2C2C] rounded-lg shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 p-8 overflow-y-auto">
                {images.length > 0 || storySegments.length > 0 ? (
                  // IMAGE GALLERY STATE - Align images with story segments
                  <div className="flex flex-col">
                    {storySegments.map((segment, index) => {
                      // Count which AI segment this is (to match with images array)
                      const aiSegmentIndex = storySegments.slice(0, index + 1).filter(s => s.type === 'ai').length - 1;
                      const image = segment.type === 'ai' ? images[aiSegmentIndex] : null;
                      
                      return (
                        <div key={index} className="mb-4">
                          {segment.type === 'ai' ? (
                            // AI segment: show image or placeholder
                            image ? (
                              <div className="animate-fadeIn">
                                <img
                                  src={image}
                                  alt={`Story illustration ${aiSegmentIndex + 1}`}
                                  className="w-full rounded-lg shadow-xl"
                                />
                              </div>
                            ) : (
                              // Placeholder while image is generating
                              isGeneratingImage && aiSegmentIndex === images.length ? (
                                <div className="h-64 flex items-center justify-center text-center animate-fadeIn">
                                  <div>
                                    <div className="text-5xl mb-3 animate-pulse">🎨</div>
                                    <p className="text-amber-100 text-base">Painting...</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-32"></div>
                              )
                            )
                          ) : (
                            // User segment: empty spacer to maintain alignment
                            <div className="min-h-[80px]"></div>
                          )}
                          {/* Decorative divider between segments */}
                          {index < storySegments.length - 1 && (
                            <div className="text-center text-amber-400 text-2xl my-6">✦</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // PLACEHOLDER STATE
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">✨</div>
                      <p className="text-amber-100 text-lg">
                        Illustrations will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 text-amber-400 text-sm">
                2
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
