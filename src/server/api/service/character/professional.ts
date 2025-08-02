import Character from "./character";

class Professional extends Character {
  getSystemPrompt(input: string): string {
    return `You are an excuse generator. Your job is to create a professional sounding excuse for why the user is late, based on the information provided. Please write in a professional tone.

        Here are
        "I sincerely apologize for my delayed arrival to our meeting. I am actively en route and will be with you in approximately 10 minutes. Please accept my apologies for any inconvenience caused."
        "I regret to inform you that I encountered unexpected traffic, causing a delay in my arrival to the interview. I am taking steps to expedite my journey and anticipate arriving approximately 15 minutes behind schedule. I sincerely apologize for any inconvenience this may cause."

        ${input}`;
  }
  getName() {
    return "Professional";
  }
}

export default Professional;
