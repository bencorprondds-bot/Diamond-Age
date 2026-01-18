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
            
            {/* LEFT PAGE - Character Creation Form */}
            <div className="flex-1 bg-[#F4E8D8] rounded-lg shadow-2xl p-8 relative flex flex-col">
              <h3 className="text-3xl font-serif text-amber-900 mb-6 text-center">
                ✨ Create Your Hero ✨
              </h3>
              
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-1">
                  <label className="text-amber-800 font-serif text-sm">What&apos;s your hero&apos;s name?</label>
                  <input 
                    type="text"
                    className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                    placeholder="Enter a name..."
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-amber-800 font-serif text-sm">What do they love to do?</label>
                  <input 
                    type="text"
                    className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                    placeholder="Their favorite activities..."
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-amber-800 font-serif text-sm">What do you want to learn about?</label>
                  <input 
                    type="text"
                    className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                    placeholder="Topics that spark curiosity..."
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-amber-800 font-serif text-sm">What makes them special?</label>
                  <input 
                    type="text"
                    className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                    placeholder="Their unique talents..."
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-amber-800 font-serif text-sm">What do they dream of discovering?</label>
                  <input 
                    type="text"
                    className="bg-[#FDF8F0] border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-amber-950 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                    placeholder="Adventures awaiting..."
                  />
                </div>

                <button className="mt-4 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 font-serif text-lg py-3 px-6 rounded-lg shadow-lg hover:from-amber-800 hover:to-amber-900 transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
                  Begin Adventure
                </button>
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
