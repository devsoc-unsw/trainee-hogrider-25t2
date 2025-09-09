abstract class ExcuseApi {
  abstract getInformation(): Promise<string>;
  abstract getExcusePrompt(): string;
  abstract getName(): string;
}

export { ExcuseApi };
