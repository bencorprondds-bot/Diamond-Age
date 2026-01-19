'use client';

import { useState, useEffect } from 'react';

export function Book() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Form state
  const [heroName, setHeroName] = useState('');
  const [gender, setGender] = useState('');
  const [storyFocus, setStoryFocus] = useState('');
  const [lovesToDo, setLovesToDo] = useState('');
  const [wantsToLearn, setWantsToLearn] = useState('');
  const [specialTrait, setSpecialTrait] = useState('');
  const [hobbies, setHobbies] = useState('');

  // Confirmation state
  const [showSaved, setShowSaved] = useState(false);

  // Loading and story state
  const [isGenerating, setIsGenerating] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storySegments, setStorySegments] = useState<Array<{type: 'ai' | 'user', text: string}>>([]);
  const [userInput, setUserInput] = useState('');
  
  // Typewriter effect state
  const [displayedHeading, setDisplayedHeading] = useState('');
  const fullHeading = '✨ Create Your Hero ✨';
  
  useEffect(() => {
    if (isOpen && displayedHeading.length < fullHeading.length) {
      const timeout = setTimeout(() => {
        setDisplayedHeading(fullHeading.slice(0, displayedHeading.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, displayedHeading]);
  
  // Reset typewriter when book opens
  useEffect(() => {
    if (isOpen) {
      setDisplayedHeading('');
    }
  }, [isOpen]);
  
  const isFormValid = heroName.trim().length > 0 && gender.length > 0 && storyFocus.length > 0;
  
  const handleBeginAdventure = async () => {
    console.log('Hero Created:', {
      heroName,
      gender,
      storyFocus,
      lovesToDo,
      wantsToLearn,
      specialTrait,
      hobbies
    });
    setShowSaved(false);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/story/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heroName,
          gender,
          storyFocus,
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
      setStorySegments([{ type: 'ai', text: data.story }]);
    } catch (error) {
      console.error('Failed to generate story:', error);
      setIsGenerating(false);
      setShowStory(true);
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
          storyFocus
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setIsGenerating(false);
      // Add AI's continuation as a new segment
      setStorySegments(prev => [...prev, { type: 'ai', text: data.story }]);
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
              {isGenerating ? (
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
                  <h3 className="text-2xl font-serif text-amber-900 mb-6 text-center">
                    📖 The Tale of {heroName}
                  </h3>
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
                        onChange={(e) => setUserInput(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-3 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all resize-none"
                        placeholder="What happens next? Type your response..."
                        rows={3}
                      />
                      <button
                        onClick={handleContinueStory}
                        disabled={!userInput.trim()}
                        className={`font-serif text-lg py-2 px-6 rounded-lg shadow-lg transition-all duration-200 ${
                          userInput.trim()
                            ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 hover:from-amber-800 hover:to-amber-900 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        }`}
                      >
                        Continue Story
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // FORM STATE (default)
                <>
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
                        <span className="font-serif">Hero Saved!</span>
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
                  </div>
                </>
              )}

              <div className="absolute bottom-4 right-4 text-amber-600 text-sm">
                1
              </div>
            </div>

            {/* RIGHT PAGE - Image */}
            <div className="flex-1 bg-[#2C2C2C] rounded-lg shadow-2xl relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <p className="text-amber-100 text-lg">
                    Illustrations will appear here
                  </p>
                </div>
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
