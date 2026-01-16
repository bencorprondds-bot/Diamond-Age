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

### Setup Tasks ✓ NEARLY COMPLETE!
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
- [ ] **Create database tables in Supabase** ← FINAL STEP!
- [x] Test development server works (`npm run dev`) ✓

**See DEVELOPMENT_SETUP.md for detailed step-by-step instructions!**

### Optional Learning Resources
- [ ] Watch: "Next.js 14 Tutorial for Beginners" (optional - learn by doing)
- [ ] Read: Anthropic Claude API docs (when needed)
- [ ] Read: React Basics (optional - learn by doing)
- [ ] Skim: TypeScript basics (will learn as you go)

---

## Phase 1: Story Generator for Daughter [UPCOMING]

**Focus:** Build a beautiful story generator with AI illustrations, optimized for your daughter's interests (science, art, creative writing).

### Project Setup
- [ ] Initialize Next.js project with TypeScript (see DEVELOPMENT_SETUP.md)
- [ ] Install dependencies (Claude SDK, Gemini SDK, Tailwind CSS)
- [ ] Set up project structure (components, services, pages)
- [ ] Configure environment variables
- [ ] Create Supabase client configuration
- [ ] Test API connections (Claude, Gemini, Supabase)

### Frontend Development
- [ ] Create main layout component with beautiful design
- [ ] Design landing page (inspiring, age-appropriate for 8-12)
- [ ] Create "Generate Story" interface
  - [ ] Simple prompt input (optional: "I want a story about...")
  - [ ] Theme selector (science, art, adventure, mystery)
  - [ ] Generate button with loading state
- [ ] Create story display component
  - [ ] Beautiful typography for readability
  - [ ] Image display area
  - [ ] Save/favorite functionality
- [ ] Add loading states with engaging animations
- [ ] Make fully responsive (tablet-first, works on desktop too)

### Backend Development (API Routes)
- [ ] Create `/api/story/generate` endpoint
  - [ ] Integrate Claude API for story generation
  - [ ] Create prompts optimized for 8-12 year old girl
  - [ ] Include interests: science, math, art
  - [ ] Ensure age-appropriate content
- [ ] Create `/api/image/generate` endpoint
  - [ ] Integrate Gemini/Imagen for illustrations
  - [ ] Generate prompts from story content
  - [ ] Test different artistic styles
- [ ] Create `/api/story/save` endpoint
  - [ ] Save story to Supabase
  - [ ] Associate with user profile (prep for Phase 2)
- [ ] Add comprehensive error handling
- [ ] Add basic rate limiting (prevent abuse)
- [ ] Test with various story themes and prompts

### Testing & Polish
- [ ] Test story generation quality
- [ ] Test image generation quality
- [ ] Ensure age-appropriate content
- [ ] Get feedback from children (user testing!)
- [ ] Fix bugs and issues
- [ ] Deploy to Vercel
- [ ] Share with family for feedback

---

## Phase 2: Personalization & Profiles [FUTURE]

### Database Setup
- [ ] Set up Supabase project
- [ ] Create database schema (profiles, stories tables)
- [ ] Configure database connection
- [ ] Test CRUD operations

### Profile System
- [ ] Create profile selection screen
- [ ] Build profile creation form
- [ ] Implement profile storage
- [ ] Add profile switching
- [ ] Create simple profile settings page

### Story Personalization
- [ ] Modify story prompts based on profile data
- [ ] Implement story saving
- [ ] Create story library view
- [ ] Add story filtering by profile
- [ ] Test personalization effectiveness

### Progress Tracking
- [ ] Design progress data structure
- [ ] Implement basic progress tracking
- [ ] Create simple progress visualization
- [ ] Test progress persistence

---

## Phase 3: The Dungeon Crawler (For Son) [FUTURE]

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

## Current Focus: Phase 0 Complete! → Ready for Setup

### ✅ Phase 0 Achievements
- ✓ Project vision documented (PROJECT_VISION.md)
- ✓ Technical roadmap created (ROADMAP.md)
- ✓ Technology stack decided (Next.js, Claude, Gemini, Vercel, Supabase)
- ✓ Development priorities set (daughter's features first)
- ✓ Comprehensive setup guide written (DEVELOPMENT_SETUP.md)
- ✓ Getting started checklist created (GETTING_STARTED.md)

### 🚀 Next Steps: Environment Setup

**Follow DEVELOPMENT_SETUP.md step-by-step to:**
1. Install Node.js and VS Code
2. Create accounts (Vercel, Supabase, Anthropic, Google AI)
3. Get API keys for Claude and Gemini
4. Clone repository and initialize Next.js project
5. Set up database tables in Supabase
6. Test that everything works!

**Estimated Time:** 1-2 hours

**After Setup:**
Begin Phase 1 - Build the story generator for your daughter!

---

## Notes

- This TODO list will be updated regularly as we progress
- Completed tasks will be marked with [x]
- New tasks will be added as we discover them
- Priorities may shift based on user feedback (your children!)
- Don't worry about completing everything - iterate and improve!

---

**Last Updated:** 2026-01-13
