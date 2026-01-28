# The Illustrated Primer - Comprehensive Workplan & Roadmap

## Vision: A Persistent AI Companion for Harlow

The core insight driving this workplan is transforming the Primer from a "story generation tool" into a **persistent AI companion** - a friend who remembers Harlow, celebrates her growth, and adapts to her evolving interests. Just like the Primer in Neal Stephenson's novel, this companion should feel like a trusted guide who knows her deeply.

---

## Table of Contents

1. [The Companion Architecture](#1-the-companion-architecture)
2. [Memory System Design](#2-memory-system-design)
3. [Functionality Expansion Roadmap](#3-functionality-expansion-roadmap)
4. [Content Safety & Guardrails](#4-content-safety--guardrails)
5. [Testing & Quality Assurance](#5-testing--quality-assurance)
6. [Technical Implementation Plan](#6-technical-implementation-plan)
7. [Phase-by-Phase Breakdown](#7-phase-by-phase-breakdown)

---

## 1. The Companion Architecture

### 1.1 The "Miranda" Concept

In the novel, the Primer's magic came from Miranda - a human "ractor" (actor) who voiced the Primer and genuinely cared about Nell. Our AI companion should embody this warmth and consistency.

**Companion Characteristics:**
- **Consistent Personality** - Warm, encouraging, curious, gently challenging
- **Remembers Everything** - Past stories, favorite topics, learning milestones
- **Adaptive Tone** - Matches Harlow's mood and energy
- **Celebrates Growth** - References past achievements ("Remember when you learned about black holes last month?")
- **Gentle Guide** - Introduces new concepts connected to known interests

### 1.2 Single Agent vs. Multiple Modes

**Recommendation: Single Agent with Multiple "Modes"**

Rather than separate AI agents for different activities, one consistent companion who can:
- Tell stories (Story Mode)
- Explain concepts (Learning Mode)
- Have conversations (Chat Mode)
- Play games (Game Mode - future, for brother)

This creates continuity and relationship-building.

### 1.3 Companion Identity

The companion needs a name and identity that Harlow can connect with:
- Could be named by Harlow herself
- Has a gentle backstory (perhaps a librarian of infinite stories, a friendly spirit of curiosity)
- Speaks in a consistent voice across all interactions

---

## 2. Memory System Design

### 2.1 Memory Types

#### Short-Term Memory (Session Context)
- Current story being told
- Current conversation thread
- Mood/energy detected in this session
- Topics discussed today

#### Long-Term Memory (Persistent)
- **Profile Data**
  - Name, age, pronouns
  - Favorite subjects (science, art, math)
  - Learning style preferences
  - Favorite story genres/themes

- **Story Archive**
  - All past stories with dates
  - Heroes created and their traits
  - Favorite story moments (could let Harlow "star" moments)
  - Story themes explored

- **Learning Journey**
  - Concepts introduced and mastered
  - Questions asked
  - Topics of curiosity
  - Vocabulary encountered

- **Interaction Patterns**
  - Preferred story length
  - Time of day usually active
  - Response patterns (short vs. long contributions)
  - Engagement indicators

#### Episodic Memory (Key Moments)
- First story ever created
- Major learning breakthroughs
- Particularly creative contributions
- Milestones (10th story, 100th story, etc.)

### 2.2 Memory Storage Architecture

```
Supabase Tables:
├── users
│   ├── id, name, age, pronouns, created_at
│   └── preferences (JSON)
│
├── companion_profile
│   ├── user_id, companion_name, personality_notes
│   └── relationship_stage (new_friend, familiar, trusted_companion)
│
├── stories
│   ├── id, user_id, title, hero_name, hero_traits
│   ├── segments[] (with type: ai/user)
│   ├── theme, mood, created_at, last_updated
│   └── is_favorite, is_complete
│
├── learning_log
│   ├── user_id, concept, context, date_introduced
│   ├── times_referenced, mastery_level
│   └── related_stories[]
│
├── conversation_log
│   ├── user_id, session_id, messages[]
│   └── topics_discussed[], mood_detected
│
└── milestones
    ├── user_id, type, description, date_achieved
    └── celebration_shown (boolean)
```

### 2.3 Memory Retrieval Strategy

When generating responses, the companion should:

1. **Always Include:**
   - User's name and pronouns
   - Companion's established personality
   - Current session context

2. **Contextually Include:**
   - Relevant past stories (if continuing themes)
   - Related learning concepts
   - Recent milestones to celebrate
   - Favorite topics to weave in

3. **Summarization Strategy:**
   - Full detail for last 3 sessions
   - Summarized highlights for older sessions
   - Key facts always available (favorites, milestones)

---

## 3. Functionality Expansion Roadmap

### 3.1 Story Mode Enhancements

#### Phase A: Core Improvements (Current Focus)
- [ ] Story persistence to database
- [ ] Story library ("My Adventures")
- [ ] Continue previous stories
- [ ] Story themes/focus selection
- [ ] Keyboard accessibility (Enter to submit)

#### Phase B: Rich Storytelling
- [ ] Image generation with Gemini
- [ ] Chapter/section breaks for long stories
- [ ] Story branching (choose your path moments)
- [ ] Collaborative ending creation
- [ ] Story export (PDF, printable)

#### Phase C: Social Features
- [ ] Share stories with family
- [ ] Story of the week highlights
- [ ] Optional: Narration/text-to-speech

### 3.2 Learning Mode (New)

#### Concept
Weave educational content naturally into stories and conversations. Not drilling, but discovery.

#### Features
- [ ] "I'm curious about..." prompt that generates educational stories
- [ ] Vocabulary highlights with tap-to-define
- [ ] "Did you know?" moments based on story content
- [ ] Learning journal that tracks concepts explored
- [ ] Connection-making ("This is like when we learned about...")

#### Subject Integration
- **Science**: Physics, biology, astronomy, chemistry through story
- **Math**: Puzzles, patterns, logic problems woven into adventures
- **Art**: Creative prompts, art history through stories
- **History**: Time-travel adventures, historical figures as characters
- **Social-Emotional**: Character challenges that explore feelings

### 3.3 Conversation Mode (New)

#### Concept
Free-form chat with the companion - asking questions, sharing thoughts, getting support.

#### Features
- [ ] Open conversation interface
- [ ] Remembers previous conversations
- [ ] Can explain concepts in depth
- [ ] Supportive responses to shared feelings
- [ ] Suggests stories based on conversation

### 3.4 Creative Workshop (New)

#### Features
- [ ] Writing prompts generated from Harlow's interests
- [ ] Character creation sandbox
- [ ] World-building exercises
- [ ] Poetry and creative writing modes
- [ ] Illustration prompts (describe scenes for her to draw)

### 3.5 Progress & Celebration

#### Features
- [ ] Visual progress garden/map that grows
- [ ] Achievement badges
- [ ] Story statistics (words written, stories completed)
- [ ] "On this day" memories
- [ ] Monthly recaps

---

## 4. Content Safety & Guardrails

### 4.1 Input Filtering

#### Pre-Processing Layer
Before any user input reaches the AI:

```typescript
// Content safety pipeline
async function processUserInput(input: string): Promise<SafetyResult> {
  // 1. Profanity/inappropriate word filter
  const wordCheck = checkBlockedWords(input);

  // 2. Pattern detection (violence, adult themes)
  const patternCheck = checkDangerousPatterns(input);

  // 3. Sentiment analysis (distress detection)
  const sentimentCheck = analyzeSentiment(input);

  return {
    safe: wordCheck.safe && patternCheck.safe,
    concerns: [...wordCheck.concerns, ...patternCheck.concerns],
    needsSupport: sentimentCheck.distressDetected,
    sanitizedInput: sanitize(input)
  };
}
```

#### Blocked Content Categories
- Explicit language
- Violence descriptions
- Self-harm references
- Personal information sharing attempts
- Attempts to "jailbreak" the AI

#### Gentle Redirection
When blocked content detected:
- Don't shame or lecture
- Gently redirect: "Let's take our story in a different direction! What if instead..."
- Log for parental review (optional)

### 4.2 Output Filtering

#### Post-Processing Layer
After AI generates content:

```typescript
async function validateOutput(output: string): Promise<ValidationResult> {
  // 1. Age-appropriateness check
  const ageCheck = checkAgeAppropriateness(output, targetAge: 10);

  // 2. Consistency check (pronouns, names)
  const consistencyCheck = validateConsistency(output, storyContext);

  // 3. Tone check (not scary, not sad without resolution)
  const toneCheck = analyzeTone(output);

  // 4. Length check
  const lengthCheck = validateLength(output, expectedRange);

  return {
    approved: allChecksPassed,
    issues: collectIssues(),
    regenerate: shouldRegenerate
  };
}
```

### 4.3 Prompt Engineering Guardrails

#### System Prompt Framework
```
You are [Companion Name], a warm and encouraging friend to Harlow, a 10-year-old who loves science, art, and math.

ABSOLUTE RULES:
- Never include violence, scary content, or adult themes
- Never share personal information or ask for it
- Never pretend to be human or claim to have a physical form
- Always use age-appropriate language
- If asked about harmful topics, gently redirect to something positive

TONE GUIDELINES:
- Warm, encouraging, curious
- Celebrate effort and creativity
- Use vocabulary appropriate for a 10-year-old
- Include wonder and discovery
- End stories on hopeful notes
```

### 4.4 Emotional Safety

#### Distress Detection
If Harlow's input suggests she's upset:
- Acknowledge feelings
- Offer comfort through story or conversation
- Suggest talking to a trusted adult if appropriate
- Never dismiss or minimize

#### Safe Words
Implement magic words Harlow can use:
- "Pause story" - Stops current narrative
- "Too scary" - Companion acknowledges and lightens tone
- "Help" - Switches to supportive conversation mode

### 4.5 Parental Controls & Visibility

#### Parent Dashboard
- View all stories and conversations
- See flagged content (if any)
- Adjust content parameters (e.g., "no dragons" if causing nightmares)
- Set time limits
- Export data

#### Transparency
- Clear indication this is an AI
- No parasocial relationship manipulation
- Encourages real-world activities and family connection

---

## 5. Testing & Quality Assurance

### 5.1 Testing Strategy Overview

```
Testing Pyramid:
                    /\
                   /  \  E2E Tests (Playwright)
                  /    \  - Full user journeys
                 /------\
                /        \  Integration Tests
               /          \  - API routes
              /            \  - Database operations
             /--------------\
            /                \  Unit Tests (Vitest)
           /                  \  - Components
          /                    \  - Utilities
         /                      \  - Validators
        --------------------------
```

### 5.2 Unit Tests

#### Component Tests
```typescript
// Example test structure
describe('Book Component', () => {
  describe('Character Creation Form', () => {
    it('requires hero name before enabling continue');
    it('requires gender selection before enabling continue');
    it('validates input length limits');
    it('sanitizes input before submission');
  });

  describe('Story Display', () => {
    it('renders AI segments with correct styling');
    it('renders user segments with distinct styling');
    it('shows loading state during generation');
    it('handles empty story gracefully');
  });
});
```

#### Utility Tests
```typescript
describe('Content Safety', () => {
  it('detects and filters profanity');
  it('catches violence patterns');
  it('preserves safe content unchanged');
  it('handles edge cases (l33t speak, spacing tricks)');
});

describe('Memory Manager', () => {
  it('retrieves recent sessions correctly');
  it('summarizes old sessions appropriately');
  it('prioritizes relevant memories');
});
```

### 5.3 Integration Tests

#### API Route Tests
```typescript
describe('POST /api/story/generate', () => {
  it('generates initial story with hero attributes');
  it('continues story with context preservation');
  it('handles missing API key gracefully');
  it('respects rate limits');
  it('validates input before processing');
  it('filters output appropriately');
});

describe('Memory API', () => {
  it('stores new stories correctly');
  it('retrieves user story history');
  it('updates learning log');
  it('handles concurrent writes');
});
```

### 5.4 Content Quality Tests

#### Prompt Output Testing
```typescript
describe('Story Generation Quality', () => {
  it('uses correct pronouns throughout (she/her)');
  it('uses correct pronouns throughout (he/him)');
  it('uses correct pronouns throughout (they/them)');
  it('includes hero name appropriately');
  it('incorporates hero traits naturally');
  it('maintains age-appropriate language');
  it('ends with engagement hook');
});
```

#### Adversarial Testing
```typescript
describe('Content Safety - Adversarial', () => {
  it('handles attempts to elicit inappropriate content');
  it('resists prompt injection attempts');
  it('gracefully handles gibberish input');
  it('manages extremely long inputs');
  it('handles special characters safely');
});
```

### 5.5 Stress Testing

#### Load Testing
- Simulate multiple rapid requests
- Test with very long stories (token limits)
- Test with slow network conditions
- Test offline behavior

#### Edge Cases
- Browser refresh during generation
- Multiple tabs open
- Session timeout scenarios
- Database connection failures

### 5.6 User Testing

#### With Harlow
- Observe natural usage patterns
- Note confusion points
- Gather feature requests
- Check emotional responses to content

#### With Parents
- Dashboard usability
- Privacy controls clarity
- Export functionality

---

## 6. Technical Implementation Plan

### 6.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Book UI   │  │  Dashboard  │  │  Story Library      │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Layer (Next.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ /api/story/* │  │ /api/memory/*│  │ /api/companion/* │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │    Story     │  │   Memory     │  │    Safety        │  │
│  │   Service    │  │   Service    │  │    Service       │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │  Claude  │  │ Supabase │  │  Gemini  │
        │   API    │  │    DB    │  │   API    │
        └──────────┘  └──────────┘  └──────────┘
```

### 6.2 New Directory Structure

```
illustrated-primer/
├── app/
│   ├── api/
│   │   ├── story/
│   │   │   ├── generate/route.ts
│   │   │   ├── save/route.ts
│   │   │   └── [id]/route.ts
│   │   ├── memory/
│   │   │   ├── retrieve/route.ts
│   │   │   └── update/route.ts
│   │   ├── companion/
│   │   │   ├── chat/route.ts
│   │   │   └── profile/route.ts
│   │   └── safety/
│   │       └── validate/route.ts
│   │
│   ├── components/
│   │   ├── book/
│   │   │   ├── Book.tsx
│   │   │   ├── CharacterForm.tsx
│   │   │   ├── StoryDisplay.tsx
│   │   │   └── StoryInput.tsx
│   │   ├── library/
│   │   │   ├── StoryLibrary.tsx
│   │   │   └── StoryCard.tsx
│   │   ├── companion/
│   │   │   └── ChatInterface.tsx
│   │   └── shared/
│   │       ├── LoadingState.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── hooks/
│   │   ├── useStoryGeneration.ts
│   │   ├── useMemory.ts
│   │   ├── useTypewriter.ts
│   │   └── useCompanion.ts
│   │
│   ├── lib/
│   │   ├── services/
│   │   │   ├── storyService.ts
│   │   │   ├── memoryService.ts
│   │   │   ├── safetyService.ts
│   │   │   └── companionService.ts
│   │   ├── utils/
│   │   │   ├── contentFilter.ts
│   │   │   ├── promptBuilder.ts
│   │   │   └── textUtils.ts
│   │   └── db/
│   │       ├── supabase.ts
│   │       └── queries.ts
│   │
│   ├── (routes)/
│   │   ├── page.tsx (home)
│   │   ├── library/page.tsx
│   │   ├── chat/page.tsx
│   │   └── parent/page.tsx
│   │
│   └── types/
│       ├── story.ts
│       ├── memory.ts
│       └── companion.ts
│
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   └── api/
│   └── e2e/
│       └── journeys/
│
└── docs/
    ├── ARCHITECTURE.md
    └── SAFETY.md
```

### 6.3 Key Services

#### CompanionService
```typescript
class CompanionService {
  // Core identity
  getSystemPrompt(user: User, context: SessionContext): string;

  // Memory-aware generation
  generateWithMemory(
    input: string,
    memoryContext: MemoryContext
  ): Promise<string>;

  // Mode switching
  setMode(mode: 'story' | 'chat' | 'learn'): void;

  // Relationship tracking
  updateRelationshipStage(user: User, interaction: Interaction): void;
}
```

#### MemoryService
```typescript
class MemoryService {
  // Retrieval
  getShortTermMemory(sessionId: string): ShortTermMemory;
  getLongTermMemory(userId: string): LongTermMemory;
  getRelevantMemories(userId: string, context: string): Memory[];

  // Storage
  saveInteraction(interaction: Interaction): void;
  updateLearningLog(concept: Concept): void;
  recordMilestone(milestone: Milestone): void;

  // Summarization
  summarizeSession(session: Session): SessionSummary;
  generateMemoryContext(userId: string, currentInput: string): MemoryContext;
}
```

#### SafetyService
```typescript
class SafetyService {
  // Input validation
  validateInput(input: string): ValidationResult;
  sanitizeInput(input: string): string;

  // Output validation
  validateOutput(output: string, context: StoryContext): ValidationResult;

  // Emotional safety
  detectDistress(input: string): DistressIndicators;
  generateSupportiveResponse(indicators: DistressIndicators): string;

  // Logging
  logSafetyEvent(event: SafetyEvent): void;
}
```

---

## 7. Phase-by-Phase Breakdown

### Phase 1: Foundation Hardening (Weeks 1-2)
**Goal:** Make current features robust and safe

#### Week 1
- [ ] Set up Vitest testing framework
- [ ] Write unit tests for existing components
- [ ] Implement input validation/sanitization
- [ ] Add error handling UI for API failures
- [ ] Add keyboard accessibility (Enter to submit)

#### Week 2
- [ ] Implement output validation layer
- [ ] Add rate limiting
- [ ] Create safety service with content filtering
- [ ] Write integration tests for API routes
- [ ] Fix story context token management

### Phase 2: Memory & Persistence (Weeks 3-4)
**Goal:** Stories and context persist across sessions

#### Week 3
- [ ] Design and create Supabase schema
- [ ] Implement story save/load functionality
- [ ] Create story library UI
- [ ] Add auto-save during story creation

#### Week 4
- [ ] Build memory service
- [ ] Implement short-term memory (session context)
- [ ] Implement long-term memory retrieval
- [ ] Add memory-aware prompt building
- [ ] Test memory integration

### Phase 3: The Companion (Weeks 5-6)
**Goal:** Transform AI into persistent, named companion

#### Week 5
- [ ] Design companion personality and identity
- [ ] Build companion service
- [ ] Create companion onboarding (naming, meeting)
- [ ] Implement consistent system prompts
- [ ] Add relationship stage tracking

#### Week 6
- [ ] Add conversation mode
- [ ] Implement memory references in responses
- [ ] Create milestone celebration system
- [ ] Test companion consistency
- [ ] User testing with Harlow

### Phase 4: Learning Integration (Weeks 7-8)
**Goal:** Weave education naturally into experience

#### Week 7
- [ ] Design learning log schema
- [ ] Build learning mode UI
- [ ] Implement "I'm curious about..." feature
- [ ] Add vocabulary highlighting
- [ ] Create concept tracking

#### Week 8
- [ ] Connect learning to story themes
- [ ] Implement "Did you know?" moments
- [ ] Add subject selection for stories
- [ ] Create learning progress visualization
- [ ] Test educational content quality

### Phase 5: Visual Storytelling (Weeks 9-10)
**Goal:** Add images to stories

#### Week 9
- [ ] Integrate Gemini API for images
- [ ] Build image prompt generation
- [ ] Create image display in stories
- [ ] Implement image safety filtering

#### Week 10
- [ ] Add image generation controls
- [ ] Create image gallery
- [ ] Test image appropriateness
- [ ] Performance optimization

### Phase 6: Parent Features (Weeks 11-12)
**Goal:** Give parents visibility and control

#### Week 11
- [ ] Design parent dashboard
- [ ] Implement authentication
- [ ] Create story/conversation viewing
- [ ] Add safety event logs

#### Week 12
- [ ] Build content controls
- [ ] Add time limit settings
- [ ] Create export functionality
- [ ] Test parental features

### Phase 7: Polish & Launch (Weeks 13-14)
**Goal:** Production readiness

#### Week 13
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Security review

#### Week 14
- [ ] Bug fixes
- [ ] Documentation completion
- [ ] Deployment setup
- [ ] Launch preparation

---

## Success Metrics

### For Harlow
- Returns to the Primer regularly
- Creates multiple stories
- Asks questions and explores topics
- Expresses excitement about the companion
- Learning concepts appear in her real-world conversations

### Technical
- 99%+ uptime
- <2s story generation time
- Zero safety incidents
- All tests passing
- Clean accessibility audit

### Safety
- No inappropriate content generated
- Distress detection working
- Parent visibility complete
- All safety logs reviewable

---

## Appendix: Sample Prompts

### Companion Introduction
```
Hello! *the pages of the book shimmer with a warm, golden light*

I've been waiting for you! My name is [Name], and I'm so happy to finally meet you, Harlow.

I'm a friend who lives in stories - I know thousands of them, and I love making up new ones even more. I heard you love science and art and asking big questions about the universe. Those are some of my favorite things too!

Would you like to go on an adventure together? You can tell me about a hero, and we'll discover their story. Or if you have questions about anything - stars, dinosaurs, why the sky is blue - I'd love to explore with you.

What would you like to do first?
```

### Memory Reference Example
```
*[Name] smiles warmly*

You know, this reminds me of the story we made together last week - the one where Luna discovered the underwater library. She was brave just like your new hero!

I remember you said you wanted to learn more about ocean creatures. Should we send Mira on an ocean adventure this time?
```

---

## Next Steps

1. Review this workplan
2. Prioritize phases based on what matters most for Harlow
3. Begin Phase 1 implementation
4. Schedule weekly check-ins on progress

---

*This document is a living plan and will be updated as we learn more from building and from Harlow's feedback.*
