abstract class ExcuseApi {
  // Returns a string containing relevant API data
  abstract getInformation(): Promise<string>;

  // Returns a string descrining how the AI should use the string given by getInformation()
  abstract getExcusePrompt(): string;

  // Used to identify the API throughout the program
  abstract getName(): string;
}

export { ExcuseApi };
