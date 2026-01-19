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

## Implementation Order (Recommended)

### Phase 1B.1: Foundation (Week 1)
1. Deploy current app to Vercel (get it live first)
2. Test on iPhone and fix any mobile issues
3. Shorten AI response length (quick win)

### Phase 1B.2: Core Features (Week 2)
4. Add genre selector (5 genres)
5. Implement typing metrics tracking (real-time capture)
6. Create session summary display

### Phase 1B.3: Advanced Features (Week 3)
7. Build progress visualization (charts)
8. Implement achievements system
9. Overhaul educational mode (Socratic method)

### Phase 1B.4: Optional Features (Week 4)
10. Implement choose-your-own-adventure mode
11. Final polish and testing
12. Full user testing session with Harlow

---

## Questions for Ben

1. **Typing Metrics:** Should we track metrics for BOTH the initial character creation AND story continuation, or only story continuation?

2. **Educational Topics:** What specific subjects is Harlow most interested in learning right now? (This will help us create better problem scenarios)

3. **Genre Priority:** Which of the 5 genres should we test first? (We can implement all but focus polish on her favorites)

4. **Choose-Your-Own-Adventure:** Is this a must-have for Phase 1B, or can it wait for a later phase?

5. **Session Summary Timing:** Should the typing metrics summary appear:
   - Immediately after she clicks "finish story"?
   - As a separate "View Progress" button she can click?
   - Both options?

6. **Mobile Priority:** Is iPhone the primary device Harlow will use, or is desktop/laptop more common?

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
