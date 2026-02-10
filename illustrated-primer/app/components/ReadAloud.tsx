'use client';

import { useState, useCallback, useEffect } from 'react';

interface ReadAloudProps {
  text: string;
}

export function ReadAloud({ text }: ReadAloudProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggle = useCallback(() => {
    if (!supported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  }, [text, isSpeaking, supported]);

  if (!supported) return null;

  return (
    <button
      onClick={handleToggle}
      aria-label={isSpeaking ? 'Stop reading aloud' : 'Read this passage aloud'}
      title={isSpeaking ? 'Stop reading' : 'Read aloud'}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-serif transition-all duration-200 cursor-pointer ${
        isSpeaking
          ? 'bg-amber-600 text-amber-50'
          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
      }`}
    >
      {isSpeaking ? (
        <>
          <span aria-hidden="true">&#9632;</span>
          <span>Stop</span>
        </>
      ) : (
        <>
          <span aria-hidden="true">&#128264;</span>
          <span>Read aloud</span>
        </>
      )}
    </button>
  );
}
