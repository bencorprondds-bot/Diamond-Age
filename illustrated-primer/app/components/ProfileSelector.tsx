'use client';

export type Profile = 'harlow' | 'explorer';

interface ProfileSelectorProps {
  onSelect: (profile: Profile) => void;
}

export function ProfileSelector({ onSelect }: ProfileSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-fadeIn">
      <h2 className="text-3xl font-serif text-amber-900 text-center">
        Who&apos;s reading today?
      </h2>

      <div className="flex gap-6" role="group" aria-label="Choose a reader profile">
        <button
          onClick={() => onSelect('harlow')}
          aria-label="Harlow's profile — for ages 8 and up"
          className="flex flex-col items-center gap-3 bg-[#FDF8F0] border-2 border-amber-300 rounded-xl px-8 py-6
                     hover:border-amber-500 hover:shadow-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200
                     transition-all duration-200 cursor-pointer transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <span className="text-5xl" aria-hidden="true">&#128218;</span>
          <span className="text-xl font-serif text-amber-900 font-bold">Harlow</span>
          <span className="text-sm font-serif text-amber-600">Storyteller &amp; Creator</span>
        </button>

        <button
          onClick={() => onSelect('explorer')}
          aria-label="Young Explorer's profile — for pre-readers"
          className="flex flex-col items-center gap-3 bg-[#FDF8F0] border-2 border-amber-300 rounded-xl px-8 py-6
                     hover:border-amber-500 hover:shadow-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200
                     transition-all duration-200 cursor-pointer transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <span className="text-5xl" aria-hidden="true">&#127758;</span>
          <span className="text-xl font-serif text-amber-900 font-bold">Explorer</span>
          <span className="text-sm font-serif text-amber-600">Young Adventurer</span>
        </button>
      </div>

      <p className="text-amber-500 text-sm font-serif italic">
        Choose your reader to begin
      </p>
    </div>
  );
}
