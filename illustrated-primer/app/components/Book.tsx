'use client';

import { useState } from 'react';

export function Book() {
  const [isOpen, setIsOpen] = useState(false);

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
            
            {/* LEFT PAGE - Story Text */}
            <div className="flex-1 bg-[#F4E8D8] rounded-lg shadow-2xl p-12 relative">
              <h3 className="text-2xl font-serif text-amber-900 mb-6">
                📖 Story
              </h3>
              <div className="text-lg text-amber-950 font-serif leading-relaxed">
                <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-amber-800 first-letter:mr-3 first-letter:float-left">
                  Welcome to your Illustrated Primer. Let us begin your journey...
                </p>
              </div>
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
