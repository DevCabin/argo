import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

export async function queryClaude(
  prompt: string,
  systemPrompt: string = 'You are a helpful voice assistant that processes commands and provides concise responses.'
): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    throw new Error('Unexpected response type from Claude');
  } catch (error) {
    console.error('Error querying Claude:', error);
    throw error;
  }
} 