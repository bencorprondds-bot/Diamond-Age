# The Illustrated Primer - TODO List

This document tracks actionable tasks for the project. Tasks are organized by phase and priority.

---

## Phase 0: Foundation & Planning ✓ COMPLETE!

### Documentation ✓ COMPLETED
- [x] Create PROJECT_VISION.md
- [x] Create ROADMAP.md
- [x] Update CLAUDE.MD
- [x] Create TODO.md (this file)
- [x] Create DEVELOPMENT_SETUP.md
- [x] Create GETTING_STARTED.md

### Technical Decisions ✓ FINALIZED
- [x] **Frontend Framework:** Next.js 14 with TypeScript ✓
- [x] **AI Provider:** Anthropic Claude + Google Gemini (hybrid) ✓
- [x] **Hosting:** Vercel (free tier) ✓
- [x] **Database:** Supabase (PostgreSQL) ✓
- [x] **CSS Framework:** Tailwind CSS ✓

### Development Strategy ✓ DECIDED
- [x] **Build daughter's features first** (story writing, typing, illustrations)
- [x] Then adapt the foundation for son's dungeon crawler game

### Setup Tasks ✓ 100% COMPLETE!
- [x] Install Node.js ✓
- [x] Install VS Code ✓
- [x] Create Vercel account (sign in with GitHub) ✓
- [x] Create Supabase account and project ✓
- [x] Create Anthropic account and get Claude API key ✓
- [x] Create Google AI Studio account and get Gemini API key ✓
- [x] Set up GitHub repository (already done) ✓
- [x] Clone repository to local machine ✓
- [x] Initialize Next.js project in `illustrated-primer/` folder ✓
- [x] Install all dependencies ✓
- [x] Set up environment variables (.env.local file) ✓
- [x] Create database tables in Supabase (profiles, stories, progress) ✓
- [x] Test development server works (`npm run dev`) ✓

**See DEVELOPMENT_SETUP.md for detailed step-by-step instructions!**

### Optional Learning Resources
- [ ] Watch: "Next.js 14 Tutorial for Beginners" (optional - learn by doing)
- [ ] Read: Anthropic Claude API docs (when needed)
- [ ] Read: React Basics (optional - learn by doing)
- [ ] Skim: TypeScript basics (will learn as you go)

---

## Phase 1A: Interactive Storybook for Harlow ✅ **COMPLETE!**

**Focus:** Built a beautiful interactive storybook with AI story generation, illustrations, and database persistence - optimized for Harlow's interests (science, art, creative writing).

**Completed:** 2026-01-19

### Project Setup ✅ COMPLETE
- [x] Initialize Next.js project with TypeScript
- [x] Install dependencies (Claude SDK, Gemini SDK, Tailwind CSS, Supabase)
- [x] Set up project structure (components, API routes, lib)
- [x] Configure environment variables (.env.local)
- [x] Create Supabase client configuration
- [x] Test API connections (Claude, Gemini, Supabase)

### Frontend Development ✅ COMPLETE
- [x] Create beautiful book interface (leather-bound book that opens)
- [x] Design multi-screen UI (menu → character select → story)
- [x] Create character creation form with:
  - [x] Name input field
  - [x] Gender/pronoun selector (she/her, he/him, they/them)
  - [x] Story type selector (Adventure, Learning, Creative, Combination)
  - [x] Interest fields (loves to do, wants to learn, special trait, hobbies)
  - [x] Form validation (requires name + gender + story type)
  - [x] Typewriter effect on heading
- [x] Create story display component with:
  - [x] Beautiful parchment aesthetic typography
  - [x] Visual demarkation (AI vs user contributions)
  - [x] Decorative separators between segments
  - [x] First letter drop cap effect
- [x] Create image display area (right page of book)
- [x] Add loading states with engaging animations (bouncing dots, painting emoji)
- [x] Implement story continuation interface (textarea + button)
- [x] Build character library/selection screen
- [x] Build story library/selection screen
- [x] Make fully responsive design

### Backend Development (API Routes) ✅ COMPLETE
- [x] Create `/api/story/generate` endpoint
  - [x] Integrate Claude API (claude-3-5-sonnet-20241022)
  - [x] Create prompts optimized for 10-year-old Harlow
  - [x] Tailored prompts for each story type (Adventure/Learning/Creative/Combination)
  - [x] Include interests: science, math, art, creativity
  - [x] Use gender pronouns in stories
  - [x] Ensure age-appropriate content
  - [x] Support both initial story and continuation modes
- [x] Create `/api/image/generate` endpoint
  - [x] Integrate Gemini 2.5 Flash Image model
  - [x] Generate watercolor-style illustrations
  - [x] Support reference images for character consistency
  - [x] Child-friendly, whimsical art style
- [x] Create `/api/character/save` endpoint - Save characters to Supabase
- [x] Create `/api/character/list` endpoint - List all saved characters
- [x] Create `/api/character/[id]` endpoint - Get specific character
- [x] Create `/api/story/save` endpoint - Save stories with images
- [x] Create `/api/story/list` endpoint - List all saved stories
- [x] Create `/api/story/load/[id]` endpoint - Load specific story
- [x] Add comprehensive error handling with try-catch blocks
- [x] Test with various story themes and character types

### Testing & Polish ✅ COMPLETE
- [x] Test story generation quality (tested with Aravos character)
- [x] Test image generation quality (beautiful watercolor images working)
- [x] Ensure age-appropriate content (prompts optimized for 10-year-old)
- [x] Get feedback from Harlow (requested hobbies field, gender selection, images!)
- [x] Fix bugs and implement requested features
- [ ] Deploy to Vercel (not yet deployed to production)
- [ ] Full family user testing session

---

## Phase 1B: Enhanced Features [IN PROGRESS]

**Focus:** Add typing practice metrics, multiple story formats, and educational tutorials to enhance Harlow's learning experience.

### Typing Practice & Metrics
- [ ] Implement WPM (words per minute) tracking
- [ ] Add accuracy tracking (typos, corrections)
- [ ] Create typing practice mode
- [ ] Build progress visualization dashboard
- [ ] Add typing achievements/milestones

### Story Formats & Styles
- [ ] Add more story genres (mystery, fantasy, historical)
- [ ] Implement different story lengths (short/medium/long)
- [ ] Create poetry mode
- [ ] Add choose-your-own-adventure branching
- [ ] Build story templates library

### Interactive Tutorials
- [ ] Create science tutorial system (experiments, explanations)
- [ ] Build math problem-solving stories
- [ ] Add art technique breakdown feature
- [ ] Implement interactive code/building tutorials
- [ ] Design tutorial progress tracking

### Story Sharing & Export
- [ ] Add story export to PDF
- [ ] Create printable storybook format
- [ ] Build shareable story links
- [ ] Implement story collaboration mode (write with parents)
- [ ] Add portfolio gallery view

### Testing & Polish
- [ ] Get Harlow's feedback on new features
- [ ] Test typing metrics accuracy
- [ ] Ensure tutorials are educational and engaging
- [ ] Deploy updates to production
- [ ] Monitor usage and gather analytics

---

## Phase 2: Son's Pre-Reader Dungeon Crawler [FUTURE]

**Focus:** Adapt the application for Ben's pre-reader son with gamified word recognition through dungeon crawler mechanics.

### Game Design
- [ ] Design game levels (start with 5)
- [ ] Create word lists for each level
- [ ] Design reward system
- [ ] Sketch character and monster designs
- [ ] Plan audio narration system

### Database & Profile Setup
- [ ] Adapt existing Supabase tables for game progress
- [ ] Create game state schema
- [ ] Build profile for son (separate from daughter's)
- [ ] Design progress tracking for word recognition

### Frontend Development
- [ ] Create dungeon map interface
- [ ] Build battle screen UI
- [ ] Design character and monster sprites/visuals
- [ ] Implement word challenge display
- [ ] Add sound effects and audio cues

### Game Logic & Backend
- [ ] Implement level progression system
- [ ] Build word challenge mechanics
- [ ] Create reward/unlock system
- [ ] Add audio narration integration
- [ ] Implement save/load game state
- [ ] Test difficulty levels

### Testing & Polish
- [ ] Test with son (critical user testing!)
- [ ] Adjust difficulty based on feedback
- [ ] Add more levels as needed
- [ ] Polish animations and transitions
- [ ] Ensure engaging for 4-6 year old

---

## Phase 3: Advanced Personalization [FUTURE]

### Game Design
- [ ] Design game levels (start with 5)
- [ ] Create word lists for each level
- [ ] Design reward system
- [ ] Sketch character and monster designs

### Visual Development
- [ ] Create or source character sprites
- [ ] Create or source monster sprites
- [ ] Design game world visual style
- [ ] Build dungeon map component
- [ ] Create battle screen UI

### Game Logic
- [ ] Implement level progression
- [ ] Build word challenge mechanics
- [ ] Create reward system
- [ ] Add audio narration
- [ ] Implement save/load game state

### Polish
- [ ] Add animations and transitions
- [ ] Test with son (critical!)
- [ ] Adjust difficulty based on feedback
- [ ] Add more levels
- [ ] Polish audio and visuals

---

## Phase 4: The Story Workshop (For Daughter) [FUTURE]

### Writing Interface
- [ ] Build rich text editor
- [ ] Add typing practice mode
- [ ] Implement real-time typing stats
- [ ] Create AI suggestion system
- [ ] Test writing flow

### Illustration System
- [ ] Create illustration request interface
- [ ] Implement style selection
- [ ] Build art tutorial system
- [ ] Create technique breakdown feature

### Portfolio
- [ ] Design portfolio interface
- [ ] Implement story saving and organization
- [ ] Create story sharing feature
- [ ] Build story viewer/reader mode

### Testing
- [ ] Test with daughter (critical!)
- [ ] Gather feedback on writing experience
- [ ] Adjust AI suggestions based on feedback
- [ ] Improve illustration quality

---

## Phase 5: Learning Modules [FUTURE]

### Math Module
- [ ] Design math curriculum outline
- [ ] Create interactive number line
- [ ] Build visual math problems
- [ ] Implement word problems
- [ ] Test math progression

### Science Module
- [ ] Design science topics (age-appropriate)
- [ ] Create interactive demonstrations
- [ ] Build question system
- [ ] Add visual explanations

### Art Module
- [ ] Design art lesson structure
- [ ] Create color theory lessons
- [ ] Build style exploration tool
- [ ] Add drawing tutorials

---

## Phase 6: Social & Sharing [FUTURE]

- [ ] Create shared family library
- [ ] Implement collaborative story mode
- [ ] Build achievement wall
- [ ] Create parent dashboard
- [ ] Add progress reports

---

## Phase 7: Advanced Features [FUTURE]

- [ ] Implement offline mode (PWA)
- [ ] Add voice interaction
- [ ] Create more game types
- [ ] Build export/print feature
- [ ] Add themes and customization
- [ ] Expand achievement system
- [ ] Improve adaptive learning AI
- [ ] Add accessibility features

---

## Ongoing Tasks

### Documentation
- [x] Create DEVELOPMENT_SETUP.md guide ✓
- [x] Create GETTING_STARTED.md guide ✓
- [ ] Document code as you go (inline comments)
- [ ] Update ROADMAP.md with actual progress
- [ ] Write API documentation (as features are built)
- [ ] Create user guide for parents (future)

### Maintenance
- [ ] Monitor API costs
- [ ] Review and improve AI prompts
- [ ] Optimize performance
- [ ] Fix bugs as discovered
- [ ] Update dependencies

### Learning & Research
- [ ] Learn TypeScript basics
- [ ] Study React component patterns
- [ ] Understand API design
- [ ] Research educational best practices
- [ ] Stay updated on AI capabilities

---

## Current Focus: 🎉 Phase 1A COMPLETE! Moving to Phase 1B! 🚀

### ✅ Phase 0 - COMPLETE! (2026-01-13)
Foundation complete - all documentation, setup, and technical decisions finalized.

### ✅ Phase 1A - COMPLETE! (2026-01-19)

**🎊 Harlow's Interactive Storybook is LIVE!**

**What We Built:**
- ✓ Beautiful book interface (leather-bound book opens to parchment pages)
- ✓ Character creation with gender pronouns and story type selection
- ✓ AI story generation with Claude (4 story types: Adventure, Learning, Creative, Combination)
- ✓ AI-generated watercolor illustrations with Gemini 2.5 Flash Image
- ✓ Interactive story continuation (Harlow can write, AI responds)
- ✓ Visual demarkation between AI and user contributions
- ✓ Full Supabase integration - characters and stories persist to database
- ✓ Multi-screen UI: menu → character library → story library
- ✓ 8 API endpoints for complete CRUD operations

**Technology Stack:**
- ✓ Next.js 14 with TypeScript
- ✓ Anthropic Claude API (active - story generation)
- ✓ Google Gemini API (active - image generation)
- ✓ Supabase (active - database persistence)
- ✓ Tailwind CSS for beautiful parchment aesthetic

**Key Files:**
- `app/components/Book.tsx` - Main interactive component
- `app/api/story/generate/route.ts` - Story generation
- `app/api/image/generate/route.ts` - Image generation
- `lib/supabase.ts` - Database client
- Plus 6 more API routes for character/story management

**Harlow's Feedback Incorporated:**
- ✓ Changed "dream of discovering" to "hobbies"
- ✓ Added gender/pronoun selection
- ✓ Added visual difference between AI and user text
- ✓ Added beautiful illustrations!

### 🎯 Next: Phase 1B - Enhanced Features

**Goal:** Add typing metrics, multiple story formats, and interactive tutorials

**Planned Features:**
1. Typing practice with WPM/accuracy tracking
2. Multiple story formats (poetry, choose-your-own-adventure)
3. Science/math/art tutorial systems
4. Story export to PDF
5. Collaboration mode (write with parents)

**Let's discuss Phase 1B features before starting development!**

---

## Notes

- This TODO list will be updated regularly as we progress
- Completed tasks will be marked with [x]
- New tasks will be added as we discover them
- Priorities may shift based on user feedback (your children!)
- Don't worry about completing everything - iterate and improve!

---

**Last Updated:** 2026-01-19 (Phase 1A Complete!)
