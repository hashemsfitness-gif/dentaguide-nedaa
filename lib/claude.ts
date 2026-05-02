import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('ANTHROPIC_API_KEY is missing. AI functionality will fail.');
}

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// The prompt specifies: export const CLAUDE_MODEL = 'claude-opus-4-7';
export const CLAUDE_MODEL = 'claude-opus-4-7';
