import { z } from "zod";
import { generateText, type CoreMessage } from "ai";
import { openai } from "@ai-sdk/openai";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import CalendarApi from "../service/calendar";
import type { ExcuseApi } from "../service/excuseapi";
import { VapiClient } from "@vapi-ai/server-sdk";
import LeaguePlayer from "../service/character/leaguePlayer";
import Professional from "../service/character/professional";
import type Character from "../service/character/character";
import Secretary from "../service/character/secretary";
import RageBait from "../service/character/rageBait";
import { exec } from "child_process";

const vapi = new VapiClient({ token: process.env.VAPI_TOKEN! });

const CHARACTERS = [
  new Professional(),
  new LeaguePlayer(),
  new Secretary(),
  new RageBait(),
];

export const aiRouter = createTRPCRouter({
  getCalendarEvents: protectedProcedure.query(async ({ ctx }) => {
    const calendar = new CalendarApi(ctx.session.accessToken);
    return await calendar.getInformation();
  }),

  getCharacters: publicProcedure.query(() => {
    return CHARACTERS.map((c) => c.getName());
  }),

  callSomeone: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        character: z.string().optional(),
        phoneNumber: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      let character: Character = new Professional();

      for (const c of CHARACTERS) {
        if (c.getName() === input.character) {
          character = c;
          break;
        }
      }

      console.log("Start Call");
      const call = await vapi.calls.create({
        assistant: {
          name: "Kevin Shen",
          firstMessage: input.text,
          model: {
            provider: "openai",
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: character.getSystemPrompt(""),
              },
            ],
          },
          // voice: {
          //   provider: "11labs",
          //   voiceId: "xctasy8XvGp2cVO9HL9k",
          // },
        },
        phoneNumberId: "518e5ee4-cd88-43e3-a5ac-343e1d387def",
        customer: {
          number: input.phoneNumber,
        },
      });
      console.log("finish call");
      return "ok";
    }),

  burnMoney: protectedProcedure
    .input(z.object({ text: z.string(), character: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      // TODO
      // 1. Call appropiate APIs here
      // 2. Feed the relevant data into the ai to generate a response
      // 3. Stretch: allow the ai to further investigate based on our input
      let character: Character = new Professional();

      for (const c of CHARACTERS) {
        if (c.getName() === input.character) {
          character = c;
          break;
        }
      }

      const SYSTEM_PROMPT = {
        role: "system" as const,
        content: character.getSystemPrompt(input.text),
      };

      const apis: ExcuseApi[] = [];

      const messages: CoreMessage[] = [SYSTEM_PROMPT];

      const start_all_api = Date.now();
      for (const api of apis) {
        try {
          const start = Date.now();
          const excuse = await api.getInformation();
          console.log(excuse);
          console.log(
            `     API: ${api.getName()} took ${Date.now() - start}ms`,
          );
          messages.push({ role: "system", content: api.getExcusePrompt() });
          messages.push({ role: "user", content: excuse });
        } catch (e) {
          console.log("Skipping api: " + api.getName(), e);
        }
      }

      console.log("Total time: " + (Date.now() - start_all_api) + "ms");

      const start_ai = Date.now();
      console.log("Here");
      const { text } = await generateText({
        model: openai("o3-mini"),
        messages: messages,
      });
      console.log("There");

      console.log("AI took " + (Date.now() - start_ai) + "ms");
      return text;
    }),
});
