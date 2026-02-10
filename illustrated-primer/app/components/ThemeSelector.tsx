'use client';

import type { StoryTheme } from '../lib/prompts';

interface ThemeSelectorProps {
  selected: StoryTheme | '';
  onSelect: (theme: StoryTheme) => void;
}

const THEMES: { value: StoryTheme; icon: string; label: string; description: string }[] = [
  {
    value: 'science',
    icon: '\u{1F52C}',
    label: 'Science Exploration',
    description: 'Real experiments, discoveries, and the natural world',
  },
  {
    value: 'math',
    icon: '\u{1F9E9}',
    label: 'Math Mystery',
    description: 'Puzzles, codes, and problems with real numbers',
  },
  {
    value: 'art',
    icon: '\u{1F3A8}',
    label: 'Art Quest',
    description: 'Colors, composition, and real artistic techniques',
  },
  {
    value: 'creative',
    icon: '\u{2728}',
    label: 'Creative Adventure',
    description: 'Vivid storytelling and imaginative world-building',
  },
];

export function ThemeSelector({ selected, onSelect }: ThemeSelectorProps) {
  return (
    <fieldset>
      <legend className="text-amber-800 font-serif text-sm mb-2">
        What kind of adventure?
      </legend>
      <div
        className="grid grid-cols-2 gap-2"
        role="radiogroup"
        aria-label="Story theme selection"
      >
        {THEMES.map((theme) => (
          <button
            key={theme.value}
            type="button"
            role="radio"
            aria-checked={selected === theme.value}
            onClick={() => onSelect(theme.value)}
            className={`flex flex-col items-center gap-1 rounded-lg px-3 py-3 font-serif text-sm transition-all cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              selected === theme.value
                ? 'bg-amber-600 text-amber-50 border-2 border-amber-700'
                : 'bg-[#FDF8F0] text-amber-800 border-2 border-amber-300 hover:border-amber-400'
            }`}
          >
            <span className="text-2xl" aria-hidden="true">
              {theme.icon}
            </span>
            <span className="font-bold text-xs">{theme.label}</span>
            <span
              className={`text-[10px] leading-tight ${
                selected === theme.value ? 'text-amber-200' : 'text-amber-500'
              }`}
            >
              {theme.description}
            </span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
