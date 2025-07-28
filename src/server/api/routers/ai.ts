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
    .query(async ({ input }) => {
      const { text } = await generateText({
        model: openai("o3-mini"),
        prompt: input.text,
      });
      return text;
    }),
});
