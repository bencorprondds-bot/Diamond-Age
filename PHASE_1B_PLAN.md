# Phase 1B: Enhanced Features - Implementation Plan

**Created:** 2026-01-19
**Branch:** `claude/phase1b-typing-metrics-GPwcG`

---

## 🎯 Overview

Phase 1B focuses on three main goals:
1. **Typing metrics** (Harlow's PRIMARY goal)
2. **Story improvements** (shorter responses, more genres, better educational mode)
3. **Deploy & polish** (make it accessible on all devices)

---

## Priority 1: Typing Metrics & Practice (PRIMARY GOAL)

**Goal:** Track Harlow's typing progress to help her improve WPM and accuracy.

### Features to Build

#### 1.1 Real-time Typing Tracking
- [ ] Track WPM (words per minute) as Harlow types in textarea
- [ ] Track accuracy (count typos/corrections using input events)
- [ ] Store metrics for each typing session
- [ ] Do NOT display metrics during typing (show after session ends)

#### 1.2 Session Summary Display
- [ ] Create "Session Summary" component shown after story session
- [ ] Display session metrics:
  - Total words typed
  - Time spent typing
  - Average WPM for this session
  - Accuracy percentage
  - Number of corrections made
- [ ] Show comparison to previous sessions

#### 1.3 Progress Visualization
- [ ] Create progress dashboard/chart component
- [ ] Show WPM trend over time (line chart)
- [ ] Show accuracy trend over time
- [ ] Display from "Session Summary" or separate menu option

#### 1.4 Achievements System
- [ ] Track personal records:
  - Highest WPM achieved
  - Lowest typo score (best accuracy)
  - Most words in one session
  - Longest typing streak
- [ ] Display achievements in Session Summary
- [ ] Store achievements in Supabase

#### 1.5 Backend & Database
- [ ] Create `/api/typing/save-metrics` endpoint
- [ ] Add `typing_sessions` table to Supabase:
  - session_id, story_id, character_id
  - words_typed, time_spent_seconds, wpm
  - accuracy_percentage, corrections_count
  - timestamp
- [ ] Create `/api/typing/get-progress` endpoint for charts
- [ ] Store personal records in user profile or separate table

### Technical Notes
- Use `onInput`, `onChange`, or `onKeyDown` events to track typing
- Calculate WPM: (characters typed / 5) / (minutes elapsed)
- Track corrections by detecting backspace keys
- NO practice mode - only track during actual story writing

---

## Priority 2: Story Format Improvements

**Goal:** Make stories more engaging with shorter responses and more variety.

### Features to Build

#### 2.1 Shorten AI Response Length
- [ ] Update story generation prompts in `/api/story/generate/route.ts`
- [ ] Change from current ~75-100 words to 45-60 words per response
- [ ] Update system prompt: "Keep responses tight and concise (45-60 words)"
- [ ] Test to ensure quality isn't compromised
- [ ] Goal: Less reading, more typing/imagining for Harlow

#### 2.2 Genre Selector System
- [ ] Add genre selection to character creation form
- [ ] Two-step selection process:
  1. Story Type: Educational vs Creative (existing)
  2. Genre: Mystery, Fantasy, Historical, Sci-fi, Solarpunk
- [ ] Update form UI with genre selector (buttons or dropdown)
- [ ] Update form validation to require genre selection
- [ ] Pass genre to story generation API

#### 2.3 Genre-Specific Prompts
- [ ] Create tailored prompts for each genre in `/api/story/generate/route.ts`:
  - **Mystery:** Focus on clues, investigation, solving puzzles
  - **Fantasy:** Magic systems, mythical creatures, quests
  - **Historical:** Real historical periods/events, authentic details
  - **Sci-fi:** Technology, space, future concepts, science-based
  - **Solarpunk:** Sustainable tech, hopeful futures, nature + technology
- [ ] Combine story type + genre for final prompt (e.g., "Educational Mystery")

#### 2.4 Choose-Your-Own-Adventure Mode
- [ ] Create branching story option (separate from standard continuation)
- [ ] AI presents 2-3 choice points at end of each segment
- [ ] Harlow selects a choice AND types additional context/details
- [ ] AI continues based on chosen path + her added context
- [ ] Store branch choices in story structure
- [ ] UI: Show choice buttons + textarea for context
- [ ] This is OPTIONAL mode, not default

### Technical Notes
- Story type + genre = combined prompt strategy
- Genre stored in character profile and story metadata
- Choose-your-own-adventure needs different story flow logic

---

## Priority 3: Educational Mode Overhaul (MAJOR CHANGE)

**Goal:** Make educational stories dramatically different using Socratic method.

### Current Problem
Educational mode is currently too similar to creative mode - just storytelling with educational themes.

### New Approach: Socratic Q&A Method

#### 3.1 Educational Story Format
- [ ] Change educational stories to problem-based format
- [ ] Opening: "We have a problem..." based on Harlow's chosen topic
- [ ] AI asks guiding questions (not giving answers)
- [ ] Harlow responds with her thoughts/ideas
- [ ] AI responds with follow-up questions to lead her to solution
- [ ] AI acknowledges correct reasoning: "Yes! That's right because..."
- [ ] AI gently redirects if off-track: "Interesting thought. What if we consider...?"

#### 3.2 Educational Flow Design
**Step 1:** Harlow describes a topic she wants to learn (character creation or prompt)
**Step 2:** AI presents a problem related to that topic
**Step 3:** Conversation loop:
- AI asks a question to guide thinking
- Harlow types her response/idea
- AI evaluates and asks next question
- Continue until solution is discovered

**Step 4:** AI summarizes what was learned

#### 3.3 Implementation Changes
- [ ] Update educational prompts in `/api/story/generate/route.ts`
- [ ] New system prompt for educational mode:
  - "You are a Socratic tutor for a 10-year-old"
  - "Present problems, ask guiding questions"
  - "Don't give answers directly - help student discover them"
  - "Use encouraging, patient tone"
  - "Celebrate correct reasoning"
- [ ] Add topic field to educational character creation
- [ ] Create problem-generation logic based on topic
- [ ] Track learning progress (topics explored, concepts mastered)

#### 3.4 Example Educational Session

**Topic:** Harlow wants to learn about photosynthesis

**AI Opening:**
"In your garden, you notice plants in the sunny spot are green and healthy, but plants in the shade are pale and weak. Why might that be? What do you think plants need from sunlight?"

**Harlow Response:**
"Maybe the sun gives them energy?"

**AI Response:**
"Great thinking! Yes, sunlight provides energy. Now, plants can't eat food like we do. So how do you think they use that sunlight energy to make their own food? What ingredients might they need?"

**[Conversation continues with guiding questions]**

#### 3.5 Educational Topics to Support
- [ ] Science: experiments, natural phenomena, biology, physics
- [ ] Math: problem-solving, real-world applications
- [ ] Building/Engineering: how things work, design challenges
- [ ] Art: color theory, composition, techniques

### Technical Notes
- This is a MAJOR change to educational mode
- Requires significantly different prompts
- May need separate conversation state tracking
- Focus on questions, not answers
- Keep responses short (45-60 words still applies)

---

## Priority 4: Deploy & Polish

**Goal:** Make app accessible on all devices and ensure quality.

### Features to Build

#### 4.1 Vercel Deployment
- [ ] Review environment variables needed for production
- [ ] Create Vercel project (if not already exists)
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard:
  - ANTHROPIC_API_KEY
  - GOOGLE_AI_API_KEY
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
- [ ] Deploy to production
- [ ] Test deployed app
- [ ] Get production URL

#### 4.2 Mobile Testing & Optimization
- [ ] Test on iPhone (Safari browser)
- [ ] Test responsive design on mobile
- [ ] Check touch interactions (buttons, inputs)
- [ ] Verify images display correctly
- [ ] Test typing experience on mobile keyboard
- [ ] Optimize for mobile viewport
- [ ] Check performance on mobile

#### 4.3 Bug Fixes & Polish
- [ ] Review all error handling
- [ ] Improve loading states
- [ ] Test edge cases (empty inputs, long text, etc.)
- [ ] Verify database persistence working correctly
- [ ] Check character/story library functionality
- [ ] Smooth out animations
- [ ] Verify all features work in production

#### 4.4 User Testing with Harlow
- [ ] Full session with Harlow using deployed app
- [ ] Gather feedback on new features
- [ ] Note any bugs or issues
- [ ] Observe typing experience
- [ ] Ask about genre preferences
- [ ] Test educational mode
- [ ] Make adjustments based on feedback

### Technical Notes
- Vercel deployment should be straightforward for Next.js
- Mobile testing is critical - iPhone Safari behaves differently
- Production environment variables MUST match local setup
- Consider loading times for images on mobile

---

## 🏗️ Updated Architecture: Character Persistence

### Database Schema - Character → Adventures → Sessions

```sql
-- Characters table (existing, no changes needed)
characters (
  id, name, gender,
  loves_to_do, wants_to_learn, special_trait, hobbies,
  created_at, updated_at
)

-- Stories/Adventures table (updated)
stories (
  id, character_id,
  title,                    -- Auto-generated on first save
  story_type,               -- Educational, Creative
  genre,                    -- Fantasy, Mystery, Solarpunk, Sci-fi, Historical
  educational_topic,        -- If Educational type: "photosynthesis", "fractions", etc.
  summary,                  -- 1-2 sentence summary (auto-generated)
  first_image_url,          -- For thumbnail
  total_sessions,           -- Count of sessions
  created_at, updated_at
)

-- Story Sessions table (new)
story_sessions (
  id, story_id,
  session_number,           -- 1, 2, 3, etc.
  segments: json[],         -- [{type: 'ai'|'user', text, timestamp}]
  images: string[],         -- Array of image URLs for this session
  started_at, ended_at,

  -- Typing metrics
  total_words_typed,
  total_time_seconds,
  average_wpm,
  accuracy_percentage,
  corrections_count
)

-- Educational Progress table (new)
educational_progress (
  id, character_id,
  topic,                    -- "photosynthesis", "fractions", etc.
  summary,                  -- What was learned
  quiz_score,               -- Retention quiz results (future)
  learned_at
)
```

### UI Flow - Character Persistence

```
1. Main Menu
   ├── "My Characters" button
   └── "Create New Character" button

2. Character Library Screen
   ├── Grid of character cards
   │   ├── Character name + traits
   │   ├── Total adventures count
   │   └── Click to select
   └── "Create New Character" button

3. Character Selected: "Aravos"
   ├── Character Info Panel (left side)
   │   ├── Name, traits, hobbies
   │   ├── Total adventures: 5
   │   └── "Edit Character" button (future)
   │
   └── Adventures Panel (right side)
       ├── Grid of adventure cards with thumbnails
       │   ├── "The Mysterious Garden" (Mystery) - 2 sessions
       │   ├── "Learning Photosynthesis" (Educational) - 1 session
       │   └── Each shows first image as thumbnail
       │
       └── "Start New Adventure" button

4. Start New Adventure
   ├── Story Type: Educational / Creative
   ├── Genre: Fantasy, Mystery, Solarpunk, Sci-fi, Historical
   └── IF Educational: "What do you want to learn?" text input

5. Adventure Selected: "The Mysterious Garden"
   ├── Story Display (existing book UI)
   ├── All previous sessions loaded
   ├── Continue from last session
   ├── "View Progress" button
   └── "Save & Exit" button

6. Save & Exit
   ├── Auto-generate title (if first session)
   ├── Auto-generate 1-2 sentence summary
   ├── Save session with typing metrics
   ├── Show Session Summary popup
   └── Return to Character's Adventures screen
```

### Context Passing to AI

**Creative Stories:**
```javascript
const context = `
Character: ${character.name} (${character.gender})
Traits: ${character.specialTrait}
Interests: ${character.lovesToDo}, ${character.hobbies}

Previous Adventures Summary:
- "The Mysterious Garden" (Mystery): Discovered ancient seeds and met a talking bird
- "The Solarpunk City" (Solarpunk): Explored sustainable technology and green architecture

Maintain character consistency and personality.
Genre: ${story.genre}
`;
```

**Educational Stories:**
```javascript
const context = `
Character: ${character.name} (${character.gender})
Learning Goal: ${educational_topic}

Previous Educational Topics:
- Photosynthesis (learned: plants make food from sunlight, water, CO2)
- Fractions (learned: parts of a whole, equivalent fractions)

Review: Before starting new topic, briefly quiz understanding of "${previous_topic}".
Then present problem related to "${educational_topic}" using Socratic method.
`;
```

---

## Implementation Order (Recommended - Revised)

### Week 1: Character Persistence + Story Improvements (Foundation)

**Goal:** Implement character-persistence architecture and improve story quality

1. **Update Database Schema** (1-2 hours)
   - Add `story_sessions` table to Supabase
   - Add `educational_progress` table
   - Update `stories` table with new fields (genre, summary, first_image_url, total_sessions)
   - Update TypeScript types

2. **Shorten AI Responses** (15 minutes)
   - Update prompts: 75-100 words → 45-60 words
   - Test quality

3. **Add Genre Selector** (2 hours)
   - Add to "New Adventure" form (appears after character selection)
   - Two-step: Story Type → Genre (5 buttons: Fantasy, Mystery, Solarpunk, Sci-fi, Historical)
   - Form validation
   - Store in stories table

4. **Update Character Selection UI** (3-4 hours)
   - Character library shows all characters
   - Click character → shows character info + adventures grid
   - Adventures display as cards with thumbnails (first_image_url)
   - "Start New Adventure" button
   - Stats visible on adventure selection

5. **Implement Story Summaries** (1-2 hours)
   - Auto-generate 1-2 sentence summary on save using Claude
   - Create `/api/story/summarize` endpoint
   - Store in stories table
   - Display in adventure cards

6. **Auto-Title Generation** (1 hour)
   - Generate title on first session save
   - Use Claude to create engaging title
   - Store in stories table

7. **Genre-Specific Prompts** (2-3 hours)
   - Update `/api/story/generate` with genre prompts
   - Fantasy: magic, quests, mythical creatures
   - Mystery: clues, investigation, puzzles
   - Solarpunk: sustainable tech, hopeful futures
   - Sci-fi: technology, space, science
   - Historical: authentic period details
   - Test each genre

8. **Educational Mode Overhaul** (3-4 hours)
   - Socratic method implementation
   - "We have a problem..." format
   - Review previous educational topics
   - Quiz retention of previous learning
   - Store learning progress in educational_progress table
   - 4-6th grade level prompts

**Deliverable:** Character-centric architecture working, stories shorter and varied, educational mode teaches effectively

---

### Week 2: Typing Metrics System

**Goal:** Complete typing practice tracking with multi-session support

9. **Multi-Session Story Loading** (2-3 hours)
   - Load all sessions for a story
   - Display session boundaries visually
   - "Continue" starts new session
   - Session numbering

10. **Typing Tracker Component** (2-3 hours)
    - Timer starts on first keystroke after AI response
    - WPM calculation: (characters / 5) / minutes
    - Accuracy tracking (backspace = correction)
    - Track per session (not per response)
    - Store in story_sessions table

11. **Session Summary Display** (2 hours)
    - Popup on "Save & Exit"
    - Shows: words typed, time, WPM, accuracy, corrections
    - Comparison to previous sessions
    - Personal records highlighted
    - Return to character's adventures screen

12. **"View Progress" Button** (2 hours)
    - Button visible during active session
    - Shows live stats (current session)
    - Popup that persists until clicked again
    - Handle typing-in-progress state

13. **Progress Dashboard** (3 hours)
    - Create `/api/typing/get-progress` endpoint
    - Line charts: WPM over time, accuracy trends
    - Show per character or global
    - Accessible from menu

14. **Achievements System** (2 hours)
    - Track: highest WPM, best accuracy, most words, longest streak
    - Store in user profile or achievements table
    - Display in Session Summary
    - Celebrate new records

**Deliverable:** Full typing metrics system working, Harlow can track progress

---

### Week 3: Polish & Testing (Deployment on hold)

**Goal:** Bug fixes, optimization, and user testing

15. **Bug Fixes & Error Handling** (2-3 hours)
    - Review all error states
    - Test edge cases
    - Improve loading states
    - Verify database persistence

16. **UI Polish** (2 hours)
    - Smooth animations
    - Consistent styling
    - Mobile responsiveness check (even though desktop-focused)

17. **User Testing with Harlow** (Ongoing)
    - Full session with new features
    - Gather feedback
    - Iterate based on observations

18. **Performance Optimization** (1-2 hours)
    - Optimize database queries
    - Image loading optimization
    - Check for memory leaks

**Deliverable:** Polished, production-quality Phase 1B features

**Note:** Vercel deployment on hold per Ben's request

---

## ✅ Decisions Made - Character Persistence Architecture

### Character-Centric Model
- **One character, multiple adventures** - Characters persist across different story types and genres
- **Context continuity** - All adventures saved and provide context for future stories
- **Educational continuity** - Previous learning topics reviewed, retention quizzing

### Implementation Decisions
1. **Story Summaries:** Auto-generate 1-2 sentence summaries using Claude
2. **Character Editing:** Locked for now (consistency), but plan for future editing
3. **Educational Topics:** Fresh selection each time + review previous learning + quiz retention
4. **Story Naming:** Auto-title on save (AI generates from story content)
5. **Character Screen:** Adventures with thumbnails (first image) + stats on selection
6. **Typing Metrics:** Track only during story continuation (timer starts on first keystroke)
7. **Session Summary:** Both immediate (on save) + "View Progress" button during session
8. **Primary Device:** Desktop/laptop (mobile testing nice-to-have)
9. **Genre Priority:** Fantasy → Mystery → Solarpunk → Sci-fi → Historical
10. **Choose-Your-Own-Adventure:** Removed (not needed)

---

## Success Metrics for Phase 1B

- [ ] Harlow can see her typing progress after each session
- [ ] Stories are shorter (45-60 words) and easier to read quickly
- [ ] 5 genres available for variety
- [ ] Educational mode feels like learning (not just reading)
- [ ] App accessible on iPhone browser
- [ ] Harlow enjoys the experience and wants to keep using it

---

**Next Steps:**
1. Get Ben's answers to questions above
2. Start with deployment + mobile testing
3. Implement features in recommended order
4. Test with Harlow frequently for feedback
