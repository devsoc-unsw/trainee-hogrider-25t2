import { z } from "zod";
import { generateText, type CoreMessage } from "ai";
import { openai } from "@ai-sdk/openai";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import CalendarApi from "../service/calendar";
import type { ExcuseApi } from "../service/excuseapi";

export const aiRouter = createTRPCRouter({
  getCalendarEvents: protectedProcedure.query(async ({ ctx }) => {
    const calendar = new CalendarApi(ctx.session.accessToken);
    return await calendar.getInformation();
  }),

  burnMoney: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // TODO
      // 1. Call appropiate APIs here
      // 2. Feed the relevant data into the ai to generate a response
      // 3. Stretch: allow the ai to further investigate based on our input
      const SYSTEM_PROMPT = {
        role: "system" as const,
        content: `You are an excuse generator. You will be given a few excuses combine them and make a nice sounding excuse for why the user is late
        ${input.text}`,
      };

      const apis: ExcuseApi[] = [new CalendarApi(ctx.session.accessToken)];

      const messages: CoreMessage[] = [SYSTEM_PROMPT];

      const start_all_api = Date.now();
      for (const api of apis) {
        try {
          const start = Date.now();
          const excuse = await api.getInformation();
          console.log(
            "     API: " +
              api.getName() +
              " took " +
              (Date.now() - start) +
              "ms",
          );
          messages.push({ role: "system", content: api.getExcusePrompt() });
          messages.push({ role: "user", content: excuse });
        } catch (e) {
          console.log("Skipping api: " + api.getName(), e);
        }
      }

      console.log("Total time: " + (Date.now() - start_all_api) + "ms");

      const start_ai = Date.now();
      const { text } = await generateText({
        model: openai("o3-mini"),
        messages: messages,
      });

      console.log("AI took " + (Date.now() - start_ai) + "ms");
      return text;
    }),
});
