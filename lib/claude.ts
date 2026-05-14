import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('ANTHROPIC_API_KEY is missing. AI functionality will fail.');
}

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Claude 3.5 Sonnet är den snabbaste och mest kapabla modellen för kliniska resonemang
export const CLAUDE_MODEL = 'claude-3-5-sonnet-latest';
