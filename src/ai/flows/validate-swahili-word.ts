'use server';

/**
 * @fileOverview A Swahili word validation AI agent.
 *
 * - validateSwahiliWord - A function that validates if a word is a valid Swahili word.
 * - ValidateSwahiliWordInput - The input type for the validateSwahiliWord function.
 * - ValidateSwahiliWordOutput - The return type for the validateSwahiliWord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateSwahiliWordInputSchema = z.object({
  word: z.string().describe('The word to validate.'),
});
export type ValidateSwahiliWordInput = z.infer<typeof ValidateSwahiliWordInputSchema>;

const ValidateSwahiliWordOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the word is a valid Swahili word.'),
});
export type ValidateSwahiliWordOutput = z.infer<typeof ValidateSwahiliWordOutputSchema>;

export async function validateSwahiliWord(input: ValidateSwahiliWordInput): Promise<ValidateSwahiliWordOutput> {
  return validateSwahiliWordFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateSwahiliWordPrompt',
  input: {schema: ValidateSwahiliWordInputSchema},
  output: {schema: ValidateSwahiliWordOutputSchema},
  prompt: `You are an expert Swahili linguist.

You will determine whether the supplied word is a valid Swahili word.

Word: {{{word}}}`,
});

const validateSwahiliWordFlow = ai.defineFlow(
  {
    name: 'validateSwahiliWordFlow',
    inputSchema: ValidateSwahiliWordInputSchema,
    outputSchema: ValidateSwahiliWordOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
