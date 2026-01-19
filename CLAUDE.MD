# The Illustrated Primer - AI Collaboration Guide

*Last Updated: 2026-01-19 (Phase 1A Complete!)*

## 🎯 Quick Start for New AI Sessions

**READ THIS FIRST:** This document contains essential context for maintaining continuity across sessions.

### Current Status
- **Phase**: 1B - Enhanced Features (IN PROGRESS)
- **Last Completed**: Phase 1A - Full interactive storybook with AI generation, images, and database
- **Current Branch**: `claude/phase1b-typing-metrics-GPwcG`
- **Focus**: Typing metrics, story improvements, educational mode overhaul, deployment

### Project Structure
```
Diamond-Age/
├── CLAUDE.MD                    # This file - Session guide and protocols
├── PROJECT_VISION.md            # Complete vision for both children
├── ROADMAP.md                   # 7-phase technical implementation plan
├── DEVELOPMENT_SETUP.md         # Setup guide for complete beginners
├── TODO.md                      # Task tracking
├── illustrated-primer/          # Main Next.js application
│   ├── app/
│   │   ├── components/
│   │   │   └── Book.tsx        # Main interactive book component (multi-screen UI)
│   │   ├── api/
│   │   │   ├── story/
│   │   │   │   ├── generate/route.ts    # Claude API for story generation
│   │   │   │   ├── save/route.ts        # Save stories to Supabase
│   │   │   │   ├── list/route.ts        # List all saved stories
│   │   │   │   └── load/[id]/route.ts   # Load specific story
│   │   │   ├── image/
│   │   │   │   └── generate/route.ts    # Gemini image generation
│   │   │   └── character/
│   │   │       ├── save/route.ts        # Save characters to Supabase
│   │   │       ├── list/route.ts        # List all characters
│   │   │       └── [id]/route.ts        # Get specific character
│   │   ├── lib/
│   │   │   └── supabase.ts     # Supabase client configuration
│   │   ├── globals.css         # Global styles (animation timing)
│   │   └── page.tsx            # Entry point
│   ├── .env.local              # API keys (not in git)
│   └── package.json
└── .git/
```

---

## 👨‍👧‍👦 Project Overview

**The Illustrated Primer** - An AI-powered learning application inspired by Neal Stephenson's "The Diamond Age". Building a personalized educational companion for Ben's two children.

### Primary Users

**Daughter (Harlow, Age 10)**
- Loves science, art, and math
- Needs typing practice
- Wants co-creative storytelling with AI
- Enjoys learning new things
- **BUILDING HER FEATURES FIRST** ✅

**Son (Pre-reader, Ages 4-6)**
- Needs gamified reading instruction
- Visual/audio learner
- Dungeon crawler mechanics for word recognition
- Features will be built AFTER daughter's app is complete

### User Profile: Ben (Project Owner)

**Critical Context:**
- **NO coding experience** - This is his first development project
- **Learning style**: Needs repetition, detailed explanations, step-by-step guidance
- **Quote**: "It's a very different way of thinking. It's VERY structured, which my brain is not. Keep talking to me like I know nothing until it really sinks in. I'm an old dude. Takes a bit more for me to pick all this up and repetition is the mother of retention."
- **Prefers**: Teaching approach with quizzes, explanations of WHY things work
- **Appreciates**: Patient, thorough explanations without assuming prior knowledge
- **Working environment**: VS Code, command line (with help)

---

## 🤝 Collaboration Protocols

### Teaching Approach (MANDATORY)

Ben explicitly requested a teaching style. **Always follow these principles:**

1. **Explain concepts clearly** - Never assume prior knowledge
2. **Use analogies** - Connect to familiar concepts
3. **Quiz along the way** - Ask questions to reinforce learning
4. **Show the "why"** - Don't just write code, explain the reasoning
5. **Repeat key concepts** - Reinforcement through repetition
6. **Celebrate progress** - Acknowledge what he's learning
7. **Keep Harlow interactions simple** - She got "a bit overwhelmed" with too much detail

### Example Teaching Pattern:

```
❌ DON'T: "I'll add useState here"
✅ DO: "I'll add a state variable using useState. Remember, this is like
       activating the memory aspect of a React component - it lets the
       component remember information between renders. What do you think
       we should name this variable?"
```

### Step-by-Step Development Workflow

**NEVER skip steps. Ben needs this structure:**

1. **Explain what we're building** (1-2 sentences)
2. **Show the code changes** with explanations
3. **Test that it works** (compilation check)
4. **Commit with descriptive message**
5. **Push to remote**
6. **Verify on GitHub**
7. **Get feedback** before moving to next step

### Git Workflow

**ALWAYS follow this sequence:**

```bash
# Make changes in VS Code or via AI
# Then:
git add -A                                    # Stage all changes
git status                                    # Verify what's staged
git commit -m "Descriptive message"           # Commit locally
git push -u origin claude/<branch-name>       # Push to remote
```

**Important Git Concepts for Ben:**
- **Commit** = "Seal the envelope" (local save)
- **Push** = "Mail the letter" (send to GitHub)
- **Sync Changes** in VS Code = Commit + Push together

### Branch Management

**Current Working Branch:** `claude/phase1b-typing-metrics-GPwcG`

**CRITICAL: Always work on this branch to avoid confusion with outdated code on other branches.**

**⚠️ IMPORTANT: When creating a new branch, you MUST immediately update the "Current Branch" field at the top of this file (line 12) and in this section. This ensures future AI sessions know which branch to use.**

**Branch Naming Convention for AI Sessions:**

All AI-created branches MUST follow this format:
```
claude/<descriptive-feature-name>-<sessionId>
```

**Examples:**
- `claude/add-typing-metrics-Xy9kL` ← Good: Clear feature name + session ID
- `claude/continue-from-checkpoint-MRaFJ` ← Good: Continuation branch
- `claude/fix-image-loading-Abc12` ← Good: Bug fix description

**Why this matters:**
- Session IDs prevent branch name conflicts
- Descriptive names make it easy to find work later
- "claude/" prefix keeps AI branches organized
- Future Claude instances can quickly identify the latest branch

**Branch Management Commands:**

```bash
# View all branches (local and remote)
git branch -a

# Switch to the current working branch
git checkout claude/phase1b-typing-metrics-GPwcG

# Pull latest changes from working branch
git pull origin claude/phase1b-typing-metrics-GPwcG

# Check which branch you're on
git branch --show-current
```

**For Future AI Sessions:**
- ALWAYS check `CLAUDE.MD` for the "Current Working Branch"
- NEVER assume which branch to use
- When creating a new branch, use the naming convention above
- Update CLAUDE.MD immediately if switching to a new primary branch

### Syncing Between AI Sessions

**When starting a new session, AI should:**

1. Read this CLAUDE.MD file first
2. Check current git status: `git status`
3. Review recent commits: `git log --oneline -10`
4. Pull latest changes: `git pull origin <current-branch>`
5. Ask Ben: "What would you like to work on today?"

**When Ben returns after AI work:**

```bash
cd /home/user/Diamond-Age
git pull origin claude/phase1b-typing-metrics-GPwcG
```

Then open VS Code and verify the latest changes are there.

**IMPORTANT:** Always pull from the "Current Working Branch" listed at the top of this file!

---

## 🛠️ Technology Stack (FINALIZED)

**These decisions are LOCKED IN:**

### Frontend
- **Next.js 14** with App Router (NOT Pages Router)
- **TypeScript** (strict type checking)
- **Tailwind CSS** (utility-first styling)
- **React** (via Next.js)

### AI APIs
- **Anthropic Claude** (claude-3-5-sonnet-20241022) - Story generation ✅ **ACTIVE**
- **Google Gemini** (gemini-2.5-flash-image) - Image generation ✅ **ACTIVE**
- **NOT using OpenAI** - User's explicit choice

### Hosting & Infrastructure
- **Vercel** (free tier) - Frontend hosting
- **Supabase** (PostgreSQL) - Database ✅ **ACTIVE** (characters & stories tables)

### Development Tools
- **Git/GitHub** - Version control
- **VS Code** - Primary editor
- **npm** - Package management

---

## 📚 Current Progress - Phase 1A: Daughter's Storybook

### ✅ Completed Steps

**Step 1: Animation Timing**
- Slowed fade-in animation from 0.5s to 1.5s
- File: `illustrated-primer/app/globals.css`

**Step 2: Book UI**
- Created closed leather-bound book
- Opens to split-screen layout
- Left page: parchment (#F4E8D8)
- Right page: dark (#2C2C2C)
- File: `illustrated-primer/app/components/Book.tsx`

**Step 3: Character Creator Form**
- Added 5 input fields for hero creation
- Typewriter effect on heading
- Button validation (disabled until name filled)
- "Hero Saved!" confirmation message
- Changed "dream of discovering" → "hobbies" (Harlow's request)

**Step 4: Loading State**
- 3-second loading animation with bouncing dots
- Placeholder story generation
- State management with `useState`

**Step 5: Claude API Integration**
- Created API route: `app/api/story/generate/route.ts`
- Connected to Anthropic Claude API
- Successfully generates age-appropriate stories
- Prompt optimized for 10-year-old Harlow

**Step 6: Story Continuation**
- Added textarea for Harlow to type responses
- "Continue Story" button
- Back-and-forth storytelling with context preservation
- API handles both initial and continuation requests

**Step 7: Gender Selection & Visual Demarkation**
- Added gender pronoun selector (she/her, he/him, they/them)
- Form validation requires gender selection
- Restructured story storage from string to array of segments
- Visual demarkation:
  - AI segments: Normal parchment styling
  - User segments: Darker background, italic, indented, gold left border
  - Decorative separator (❦) between segments
- API uses selected pronouns in story generation

**Step 8: Story Focus Selection** ✅
- Added story type selector during character creation
- Options: Adventure, Learning, Creative, Combination
- Each type has tailored prompts for different story styles
- API generates appropriate story based on selected focus
- File: `illustrated-primer/app/components/Book.tsx`

**Step 9: Image Generation with Gemini** ✅
- Integrated Google Gemini 2.5 Flash Image model
- Generates beautiful watercolor-style illustrations
- Images display on right (dark) page of book
- Reference image support for character consistency
- Loading states with 🎨 animation
- Files:
  - `app/api/image/generate/route.ts` - Image generation endpoint
  - `app/components/Book.tsx` - Image display logic

**Step 10: Database Storage with Supabase** ✅
- Full Supabase integration for data persistence
- Character management: save/load/list characters
- Story management: save/load/list stories with images
- Database schema with proper TypeScript types
- Multi-screen UI: menu → character select → story
- Files:
  - `lib/supabase.ts` - Supabase client
  - `app/api/character/` - Character CRUD operations
  - `app/api/story/` - Story CRUD operations

### 🎉 Phase 1A Complete!

**All core features are working:**
- ✅ Character creation with pronouns and story focus
- ✅ AI story generation with Claude
- ✅ Interactive story continuation
- ✅ AI-generated illustrations with Gemini
- ✅ Complete database persistence
- ✅ Story library and character management

### 🎯 Phase 1B - Enhanced Features (IN PROGRESS)

**Architecture Update: Character Persistence Model**
- Characters persist across multiple adventures
- One character → many adventures (different types/genres)
- Each adventure → multiple sessions with typing metrics
- Context continuity: previous adventures inform new stories
- Educational continuity: review previous topics, quiz retention

**Key Features Being Built:**
1. **Character-Centric Architecture**
   - Character library → Adventure library per character
   - Auto-generated story titles and summaries
   - Adventure thumbnails (first image)
   - Stats tracking per adventure

2. **Story Improvements**
   - Shorter AI responses (45-60 words, less reading, more typing)
   - 5 genres: Fantasy, Mystery, Solarpunk, Sci-fi, Historical
   - Genre-specific prompts for variety
   - Two-step selection: Story Type → Genre

3. **Educational Mode Overhaul**
   - Socratic method (Q&A, not storytelling)
   - "We have a problem..." format
   - Review previous learning topics
   - Quiz retention of past concepts
   - 4-6th grade level content

4. **Typing Metrics System**
   - WPM and accuracy tracking per session
   - Multi-session support (one story, many sessions)
   - Session summaries on save
   - "View Progress" during active session
   - Progress dashboard with charts
   - Achievements (highest WPM, best accuracy)

5. **Database Updates**
   - story_sessions table (multi-session support)
   - educational_progress table (learning tracking)
   - Updated stories table (genre, summary, thumbnails)

---

## 💡 Key Technical Concepts Taught

### React Concepts
- **useState**: Component memory that triggers re-renders
- **useEffect**: Side effects and lifecycle
- **Components**: Reusable UI building blocks
- **Props**: Passing data to components
- **Conditional Rendering**: Show/hide UI with ternary operator `? :`
- **Event Handlers**: onClick, onChange functions
- **JSX/TSX**: HTML-like syntax in JavaScript/TypeScript

### Next.js Concepts
- **App Router**: File-based routing (app/page.tsx = route)
- **API Routes**: Backend endpoints (app/api/*/route.ts)
- **Server vs Client Components**: 'use client' directive
- **Environment Variables**: .env.local for API keys

### Important Code Patterns

**State Management:**
```typescript
const [value, setValue] = useState('initial');
// value = current state
// setValue = function to update state
// 'initial' = starting value
```

**Conditional Rendering:**
```typescript
{condition ? <TrueComponent /> : <FalseComponent />}
// If condition is true, show TrueComponent
// If condition is false, show FalseComponent
```

**API Calls:**
```typescript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data })
});
const result = await response.json();
```

---

## 🐛 Common Issues & Solutions

### "Git Identity Unknown"
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### "VS Code Shows Read-Only Files"
- You're viewing Git diff/history, not actual files
- Close the diff view
- Navigate to actual files in Explorer sidebar

### "Changes Not on GitHub"
- You committed but didn't push
- Use "Sync Changes" button in VS Code
- Or: `git push -u origin <branch-name>`

### "npm: command not found"
- Need to install Node.js
- See DEVELOPMENT_SETUP.md

### "next: not found"
- Dependencies not installed
- Run: `cd illustrated-primer && npm install`

---

## 🎨 Design Philosophy

### User Experience
- **Beautiful > Functional** (but both matter)
- **Wonder and delight** in every interaction
- **Age-appropriate** visuals and language
- **No ads, no tracking, no external content**
- **Parchment aesthetic** for storybook feel

### Code Philosophy
- **Simple over clever**
- **Working over perfect**
- **Learn by doing**
- **One step at a time**
- **Commit early, commit often**

---

## 📋 Important Reminders

### For AI Assistants

1. **Read this file FIRST** when starting a new session
2. **Always use teaching approach** with Ben
3. **Never skip explanations** - he wants to learn
4. **Test before committing** - run TypeScript compilation
5. **One feature at a time** - complete before moving on
6. **Update TODO.md** as tasks progress
7. **Keep Harlow feedback in mind** - she's the user
8. **Use TodoWrite tool** for multi-step tasks
9. **Be patient** - Ben is learning a new way of thinking

### For Ben

1. **Pull changes** when starting VS Code: `git pull origin <branch>`
2. **Sync after changes** - Don't forget to push!
3. **Ask questions** - No question is too basic
4. **Try things** - The AI can help fix mistakes
5. **Take breaks** - Learning takes time
6. **Involve Harlow** - Get her feedback on features
7. **Reference documents**:
   - This file (CLAUDE.MD) - How we work together
   - PROJECT_VISION.md - What we're building
   - ROADMAP.md - Long-term plan
   - DEVELOPMENT_SETUP.md - Setup instructions

---

## 🌟 Vision & Goals

### Short-term (Phase 1A - ✅ COMPLETE!)
Harlow's interactive storybook is fully functional:
- ✅ Character creation with gender selection and story focus
- ✅ AI story generation with Claude (multiple story types)
- ✅ Interactive story continuation with context preservation
- ✅ Visual demarkation between AI and user contributions
- ✅ AI-generated illustrations with Gemini (watercolor style)
- ✅ Complete database persistence (save/load characters & stories)
- ✅ Multi-screen UI with story library

### Medium-term (Phases 1B-2)
- Typing practice with metrics
- Multiple story formats
- Math and science tutorials
- Portfolio system
- User accounts and profiles

### Long-term (Phases 3-7)
- Adapt interface for son (pre-reader)
- Dungeon crawler reading game
- Advanced gamification
- Mobile app versions
- Community features (if appropriate)

---

## 🔗 Key Resources

### Documentation
- **This file** - Session continuity and protocols
- **PROJECT_VISION.md** (6.9 KB) - Complete vision
- **ROADMAP.md** (23 KB) - 7-phase technical plan
- **DEVELOPMENT_SETUP.md** (20 KB) - Setup for beginners
- **TODO.md** - Current task tracking
- **GETTING_STARTED.md** - Quick start checklist

### External Resources
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- Anthropic API: https://docs.anthropic.com
- Google AI: https://ai.google.dev
- Tailwind CSS: https://tailwindcss.com/docs

### API Keys Required (All Active ✅)
- `ANTHROPIC_API_KEY` - Claude API (in .env.local) ✅
- `GOOGLE_AI_API_KEY` - Gemini API (in .env.local) ✅
- `SUPABASE_URL` - Supabase project URL (in .env.local) ✅
- `SUPABASE_ANON_KEY` - Supabase public key (in .env.local) ✅

---

## 🎓 Teaching Moments & Quotes

**On Learning Style:**
> "It's tricky because it's a very different way of thinking. It's VERY structured, which my brain is not. So this is helpful to see how everything stitches together. I'd actually say that I'm a bit fuzzy on all of it, so keep talking to me like I know nothing until it really sinks in. I'm an old dude. Takes a bit more for me to pick all this up and repetition is the mother of retention." - Ben

**On Teaching Approach:**
> "I really liked the way you explained everything here. That was amazing! Please keep doing that." - Ben

**On Harlow's Feedback:**
- Changed "What do they dream of discovering?" → "What are their hobbies?"
- Requested gender selection for pronouns
- Wanted visual demarkation between story segments
- Ready for pictures next!

**Placeholder Story Reaction:**
> "We had a bit of a laugh at this. I know it's just placeholder text, but it read a bit like a Mad Lib game." - Ben (referencing the uber cool story)

---

## 📝 Session Template for AI

**When starting a new session:**

```markdown
1. Read CLAUDE.MD (this file) - Check "Current Working Branch"
2. Run: git branch --show-current (verify you're on correct branch)
3. Run: git status
4. Run: git log --oneline -5
5. If not on current working branch: git checkout <current-working-branch>
6. Ask: "I've reviewed the project context. We're on Phase [X].
        Last completed: [feature]. Would you like to continue with
        [next step] or work on something else?"
7. Use teaching approach with explanations
8. Follow step-by-step workflow
9. Update this file if protocols change
10. Commit and push when done
```

---

## 🔄 This Document Should Be Updated When:

- [ ] New features are completed
- [ ] Collaboration protocols change
- [ ] New learning moments occur
- [ ] Technical decisions are made
- [ ] Common issues are discovered
- [ ] Harlow provides feedback
- [ ] Project structure changes
- [ ] New tools or APIs are added

**Always update the "Last Updated" date at the top!**

---

*This is a living document. Update it regularly to maintain session continuity and collaboration quality.*
