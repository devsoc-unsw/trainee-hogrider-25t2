import { z } from "zod";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const aiRouter = createTRPCRouter({
  burnMoney: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      // TODO
      // 1. Call appropiate APIs here
      // 2. Feed the relevant data into the ai to generate a response
      // 3. Stretch: allow the ai to further investigate based on our input

      const { text } = await generateText({
        model: openai("o3-mini"),
        prompt: `You are an excuse generator. You will be given a few excuses combine them and make a nice sounding excuse for why the user is late
        ${input.text}`,
      });
      return text;
    }),
});
