abstract class Character {
  abstract getName(): string;
  abstract getSystemPrompt(input: string): string;
}

export default Character;
