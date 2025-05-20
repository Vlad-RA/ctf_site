'use server';

/**
 * @fileOverview A hint generation AI agent.
 *
 * - generateHint - A function that generates a hint for a given challenge.
 * - GenerateHintInput - The input type for the generateHint function.
 * - GenerateHintOutput - The return type for the generateHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHintInputSchema = z.object({
  challengeDescription: z.string().describe('The description of the current challenge.'),
  playerProgress: z.string().optional().describe('Optional information about the player\'s progress or attempts on the challenge.'),
});
export type GenerateHintInput = z.infer<typeof GenerateHintInputSchema>;

const GenerateHintOutputSchema = z.object({
  hint: z.string().describe('A helpful hint for the challenge.'),
});
export type GenerateHintOutput = z.infer<typeof GenerateHintOutputSchema>;

export async function generateHint(input: GenerateHintInput): Promise<GenerateHintOutput> {
  return generateHintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHintPrompt',
  input: {schema: GenerateHintInputSchema},
  output: {schema: GenerateHintOutputSchema},
  prompt: `You are a CTF (Capture The Flag) game master. A player is stuck on a challenge and needs a hint. Provide a helpful hint without giving away the answer directly. Consider the player's progress if available, and tailor the hint to help them overcome their specific hurdle.\n\nChallenge Description: {{{challengeDescription}}}\nPlayer Progress: {{{playerProgress}}}\n\nHint: `,
});

const generateHintFlow = ai.defineFlow(
  {
    name: 'generateHintFlow',
    inputSchema: GenerateHintInputSchema,
    outputSchema: GenerateHintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
