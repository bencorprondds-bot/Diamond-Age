/**
 * Story Provider — the abstraction layer between the app and the AI.
 *
 * RIGHT NOW: This uses the Anthropic API directly (Option B).
 * The AnthropicProvider class calls Claude's API with your API key.
 *
 * FUTURE (Option C — MCP):
 * When Anthropic's Model Context Protocol is production-ready for web apps,
 * you'd create a new class — MCPProvider — that implements the same
 * StoryProvider interface but routes requests through Claude Desktop / Max
 * instead of the API. The rest of the app wouldn't need to change at all.
 *
 * The switch would look like:
 *   // Before:
 *   const provider = new AnthropicProvider();
 *   // After:
 *   const provider = new MCPProvider({ connectionUrl: '...' });
 *
 * Everything downstream stays identical because both implement StoryProvider.
 */

import Anthropic from '@anthropic-ai/sdk';
import {
  buildSystemPrompt,
  buildUserPrompt,
  type StoryRequestParams,
} from './prompts';

// ---------------------------------------------------------------------------
// The interface — this is what the rest of the app talks to.
// Any provider (API, MCP, local model, etc.) must implement this shape.
// ---------------------------------------------------------------------------

export interface StoryResult {
  story: string;
}

export interface StoryProvider {
  generateStory(params: StoryRequestParams): Promise<StoryResult>;
}

// ---------------------------------------------------------------------------
// Option B: Anthropic API provider (current implementation)
// ---------------------------------------------------------------------------

export class AnthropicProvider implements StoryProvider {
  private client: Anthropic;
  private model: string;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
    // Sonnet 4.5 — massive upgrade from Haiku. Strong at creative writing,
    // educational content, following detailed instructions, and maintaining
    // consistency across a long story. Good balance of quality and cost.
    this.model = 'claude-sonnet-4-5-20250929';
  }

  async generateStory(params: StoryRequestParams): Promise<StoryResult> {
    const systemPrompt = buildSystemPrompt(params);
    const userPrompt = buildUserPrompt(params);

    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const storyText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    return { story: storyText };
  }
}

// ---------------------------------------------------------------------------
// Option C placeholder: MCP Provider (future implementation)
// ---------------------------------------------------------------------------
//
// When MCP is ready, this would look something like:
//
// export class MCPProvider implements StoryProvider {
//   private mcpClient: MCPClient;
//
//   constructor(config: { serverUrl: string }) {
//     this.mcpClient = new MCPClient(config);
//   }
//
//   async generateStory(params: StoryRequestParams): Promise<StoryResult> {
//     const systemPrompt = buildSystemPrompt(params);
//     const userPrompt = buildUserPrompt(params);
//
//     // MCP would route this through Claude Desktop / Max subscription
//     // instead of making a direct API call with an API key.
//     const result = await this.mcpClient.complete({
//       system: systemPrompt,
//       messages: [{ role: 'user', content: userPrompt }],
//     });
//
//     return { story: result.text };
//   }
// }
//
// The app would switch providers via an environment variable:
//   STORY_PROVIDER=mcp  → use MCPProvider
//   STORY_PROVIDER=api  → use AnthropicProvider (default)
// ---------------------------------------------------------------------------

/**
 * Factory function — returns the right provider based on configuration.
 * Currently always returns AnthropicProvider. When MCP is ready,
 * this is the single place you'd add the switch.
 */
export function createStoryProvider(): StoryProvider {
  // Future: check process.env.STORY_PROVIDER === 'mcp'
  return new AnthropicProvider();
}
