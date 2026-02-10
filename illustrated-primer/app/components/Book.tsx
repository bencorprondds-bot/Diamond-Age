'use client';

import { useState, useEffect, useRef } from 'react';
import { ProfileSelector, type Profile } from './ProfileSelector';
import { ReadAloud } from './ReadAloud';

export function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  // Form state
  const [heroName, setHeroName] = useState('');
  const [gender, setGender] = useState('');
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

  // Ref for focus management
  const bookContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && displayedHeading.length < fullHeading.length) {
      const timeout = setTimeout(() => {
        setDisplayedHeading(fullHeading.slice(0, displayedHeading.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, displayedHeading, fullHeading]);

  // Reset typewriter when book opens
  useEffect(() => {
    if (isOpen) {
      setDisplayedHeading('');
    }
  }, [isOpen]);

  // Move focus into the book when it opens
  useEffect(() => {
    if (isOpen && bookContentRef.current) {
      bookContentRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showStory) return; // Don't close during a story
        if (activeProfile && !showStory) {
          setActiveProfile(null); // Go back to profile selector
        } else if (isOpen && !activeProfile) {
          setIsOpen(false); // Close the book
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeProfile, showStory]);

  const isFormValid = heroName.trim().length > 0 && gender.length > 0;

  const handleBeginAdventure = async () => {
    console.log('Hero Created:', {
      heroName,
      gender,
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
          gender
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

  const handleProfileSelect = (profile: Profile) => {
    setActiveProfile(profile);
  };

  const handleBackToProfiles = () => {
    setActiveProfile(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
      {!isOpen ? (
        // CLOSED BOOK — now a proper button for keyboard/screen reader access
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open The Illustrated Primer"
          className="cursor-pointer transform transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-4 focus:ring-offset-[#F5F5DC] rounded-r-lg"
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
        </button>
      ) : (
        // OPEN BOOK
        <div
          className="w-full max-w-7xl mx-auto px-4 animate-fadeIn"
          ref={bookContentRef}
          tabIndex={-1}
          role="main"
          aria-label="The Illustrated Primer — open book"
        >
          <div className="flex gap-8 min-h-[600px]">

            {/* LEFT PAGE */}
            <div className="flex-1 bg-[#F4E8D8] rounded-lg shadow-2xl p-8 relative flex flex-col">

              {!activeProfile ? (
                // PROFILE SELECTION
                <ProfileSelector onSelect={handleProfileSelect} />

              ) : isGenerating ? (
                // LOADING STATE
                <div className="flex-1 flex flex-col items-center justify-center animate-fadeIn" role="status" aria-label="Generating your adventure">
                  <div className="text-6xl mb-6 animate-pulse" aria-hidden="true">&#128214;</div>
                  <h3 className="text-2xl font-serif text-amber-800 mb-4">Creating your adventure...</h3>
                  <div className="flex gap-2" aria-hidden="true">
                    <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>

              ) : showStory ? (
                // STORY DISPLAY STATE
                <div className="flex-1 flex flex-col animate-fadeIn">
                  <h3 className="text-2xl font-serif text-amber-900 mb-6 text-center">
                    <span aria-hidden="true">&#128214; </span>The Tale of {heroName}
                  </h3>
                  <div className="text-lg font-serif leading-relaxed flex-1 overflow-y-auto mb-4" role="log" aria-label="Story content">
                    {storySegments.map((segment, index) => (
                      <div key={index}>
                        {segment.type === 'ai' ? (
                          <div className="mb-4">
                            <p className={`text-amber-950 ${index === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:text-amber-800 first-letter:mr-3 first-letter:float-left first-letter:leading-none' : ''}`}>
                              {segment.text}
                            </p>
                            <div className="mt-2">
                              <ReadAloud text={segment.text} />
                            </div>
                          </div>
                        ) : (
                          <div className="bg-[#E8DCC8] rounded-lg px-4 py-3 my-4 ml-4 border-l-4 border-amber-500">
                            <p className="text-amber-900 italic">
                              {segment.text}
                            </p>
                          </div>
                        )}
                        {index < storySegments.length - 1 && (
                          <div className="text-center text-amber-500 my-4" aria-hidden="true">
                            &#10086;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {!isGenerating && (
                    <div className="flex flex-col gap-3 mt-4">
                      <label htmlFor="story-continuation" className="sr-only">
                        Write what happens next in the story
                      </label>
                      <textarea
                        id="story-continuation"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-3 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all resize-none"
                        placeholder="What happens next? Type your response..."
                        rows={3}
                        aria-label="Write what happens next in the story"
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
                // FORM STATE (default when profile is selected)
                <>
                  {/* Back button to return to profile selector */}
                  <button
                    onClick={handleBackToProfiles}
                    aria-label="Go back to profile selection"
                    className="self-start mb-4 text-amber-600 hover:text-amber-800 font-serif text-sm flex items-center gap-1 cursor-pointer focus:outline-none focus:underline transition-colors"
                  >
                    <span aria-hidden="true">&larr;</span> Switch reader
                  </button>

                  <h3 className="text-3xl font-serif text-amber-900 mb-6 text-center min-h-[2.5rem]" aria-live="polite">
                    {displayedHeading}
                    <span className="animate-pulse" aria-hidden="true">|</span>
                  </h3>

                  <form
                    className="flex flex-col gap-4 flex-1"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (isFormValid) handleBeginAdventure();
                    }}
                    aria-label="Create your hero"
                  >
                    <div className="flex flex-col gap-1">
                      <label htmlFor="hero-name" className="text-amber-800 font-serif text-sm">What&apos;s your hero&apos;s name?</label>
                      <input
                        id="hero-name"
                        type="text"
                        value={heroName}
                        onChange={(e) => setHeroName(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Enter a name..."
                        required
                      />
                    </div>

                    <fieldset>
                      <legend className="text-amber-800 font-serif text-sm mb-1">What pronouns does your hero use?</legend>
                      <div className="flex gap-2" role="radiogroup" aria-label="Pronoun selection">
                        {(['she/her', 'he/him', 'they/them'] as const).map((pronoun) => (
                          <button
                            key={pronoun}
                            type="button"
                            role="radio"
                            aria-checked={gender === pronoun}
                            onClick={() => setGender(pronoun)}
                            className={`flex-1 py-2 px-4 rounded-lg font-serif text-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                              gender === pronoun
                                ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                                : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
                            }`}
                          >
                            {pronoun.charAt(0).toUpperCase() + pronoun.slice(1)}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="loves-to-do" className="text-amber-800 font-serif text-sm">What do they love to do?</label>
                      <input
                        id="loves-to-do"
                        type="text"
                        value={lovesToDo}
                        onChange={(e) => setLovesToDo(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Their favorite activities..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="wants-to-learn" className="text-amber-800 font-serif text-sm">What do you want to learn about?</label>
                      <input
                        id="wants-to-learn"
                        type="text"
                        value={wantsToLearn}
                        onChange={(e) => setWantsToLearn(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Topics that spark curiosity..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="special-trait" className="text-amber-800 font-serif text-sm">What makes them special?</label>
                      <input
                        id="special-trait"
                        type="text"
                        value={specialTrait}
                        onChange={(e) => setSpecialTrait(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Their unique talents..."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="hobbies" className="text-amber-800 font-serif text-sm">What are their hobbies?</label>
                      <input
                        id="hobbies"
                        type="text"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                        className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                        placeholder="Their favorite hobbies..."
                      />
                    </div>

                    {showSaved && (
                      <div className="bg-green-100 text-green-700 rounded-lg px-4 py-3 flex items-center gap-2 animate-fadeIn" role="status">
                        <span className="text-xl" aria-hidden="true">&#10003;</span>
                        <span className="font-serif">Hero Saved!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`mt-4 font-serif text-lg py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ${
                        isFormValid
                          ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 hover:from-amber-800 hover:to-amber-900 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                    >
                      Begin Adventure
                    </button>
                  </form>
                </>
              )}

              <div className="absolute bottom-4 right-4 text-amber-600 text-sm" aria-hidden="true">
                1
              </div>
            </div>

            {/* RIGHT PAGE - Image */}
            <div className="flex-1 bg-[#2C2C2C] rounded-lg shadow-2xl relative" aria-label="Illustration area">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4" aria-hidden="true">&#10024;</div>
                  <p className="text-amber-100 text-lg">
                    Illustrations will appear here
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-amber-400 text-sm" aria-hidden="true">
                2
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
