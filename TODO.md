# The Illustrated Primer - TODO List

This document tracks actionable tasks for the project. Tasks are organized by phase and priority.

---

## Phase 0: Foundation & Planning [IN PROGRESS]

### Documentation ✓ COMPLETED
- [x] Create PROJECT_VISION.md
- [x] Create ROADMAP.md
- [x] Update CLAUDE.MD
- [x] Create TODO.md (this file)

### Next Steps - Technical Decisions
- [ ] **DECISION: Choose Frontend Framework**
  - Option A: Next.js 14 (recommended - full-stack, great for beginners)
  - Option B: Create React App + separate backend
  - Option C: Vite + React (faster dev, but need separate backend)
  - **Recommendation:** Next.js 14 - One framework, easier learning curve

- [ ] **DECISION: Choose AI Provider**
  - Research OpenAI pricing (GPT-4 + DALL-E 3)
  - Research Anthropic pricing (Claude)
  - Research open-source options (Llama, Stable Diffusion)
  - **Recommendation:** Start with OpenAI (GPT-4 Turbo + DALL-E 3) - Best quality, good docs

- [ ] **DECISION: Choose Hosting**
  - Option A: Vercel (recommended - easiest for Next.js, free tier)
  - Option B: Netlify
  - Option C: AWS / Self-hosted
  - **Recommendation:** Vercel - Free tier, automatic deployments

- [ ] **DECISION: Choose Database**
  - Option A: Vercel Postgres (integrated, easy)
  - Option B: Supabase (more features, still easy)
  - Option C: MongoDB Atlas
  - **Recommendation:** Supabase - Good free tier, great developer experience

### Setup Tasks
- [ ] Install Node.js (if not already installed)
- [ ] Install VS Code or preferred editor
- [ ] Create OpenAI account and get API key
- [ ] Set up GitHub repository (already done ✓)
- [ ] Create project folder structure
- [ ] Initialize Next.js project
- [ ] Set up environment variables (.env file)

### Learning Resources to Review
- [ ] Watch: "Next.js 14 Tutorial for Beginners" (1 hour)
- [ ] Read: OpenAI API Quickstart
- [ ] Read: React Basics (if unfamiliar)
- [ ] Review: Basic JavaScript concepts

---

## Phase 1: Hello Primer (MVP) [UPCOMING]

### Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Install dependencies (OpenAI SDK, Tailwind CSS)
- [ ] Set up project structure (components, services, pages)
- [ ] Configure environment variables
- [ ] Test API connection to OpenAI

### Frontend Development
- [ ] Create basic layout component
- [ ] Design and build landing page
- [ ] Create "Generate Story" button component
- [ ] Create story display component
- [ ] Create image display component
- [ ] Add loading states and animations
- [ ] Make responsive for tablet and desktop

### Backend Development
- [ ] Create API route for story generation
- [ ] Implement OpenAI GPT-4 integration
- [ ] Implement DALL-E 3 integration
- [ ] Add error handling
- [ ] Add rate limiting (basic)
- [ ] Test with different prompts

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
- [ ] Document code as you go
- [ ] Update ROADMAP.md with actual progress
- [ ] Create DEVELOPMENT_SETUP.md guide
- [ ] Write API documentation
- [ ] Create user guide for parents

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

## Current Focus: Complete Phase 0

**Immediate Next Steps:**
1. Make technology stack decisions (see above)
2. Set up development environment
3. Create accounts (OpenAI, Vercel, Supabase)
4. Initialize the Next.js project
5. Get a "Hello World" running

**After Phase 0:**
Move to Phase 1 and build the first working prototype!

---

## Notes

- This TODO list will be updated regularly as we progress
- Completed tasks will be marked with [x]
- New tasks will be added as we discover them
- Priorities may shift based on user feedback (your children!)
- Don't worry about completing everything - iterate and improve!

---

**Last Updated:** 2026-01-13
