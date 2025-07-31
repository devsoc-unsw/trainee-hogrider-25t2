import { z } from "zod";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "googleapis";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

function getCalendarClient(access_token: string | null) {
  if (!access_token) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const auth = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
  );
  auth.setCredentials({ access_token: access_token });
  google.options({ http2: true });
  return google.calendar({ version: "v3", auth });
}

export const aiRouter = createTRPCRouter({
  getCalendarEvents: protectedProcedure.query(async ({ ctx, input }) => {
    console.log("access token", ctx.session.accessToken);
    const client = getCalendarClient(ctx.session.accessToken);

    // const auth = new google.auth.OAuth2(
    //   process.env.AUTH_GOOGLE_ID,
    //   process.env.AUTH_GOOGLE_SECRET,
    // );
    // auth.setCredentials({ access_token: ctx.session.accessToken });
    // google.options({ http2: true });
    // const x = google.oauth2({ version: "v2", auth });
    // const y = await x.tokeninfo();
    // console.log(y.data);

    const prev = new Date();
    prev.setDate(prev.getDate() - 7);
    const next = new Date();
    next.setDate(next.getDate() + 7);
    const res = await client.events.list({
      calendarId: "primary",
      timeMin: prev.toISOString(),
      timeMax: next.toISOString(),
    });
    return res.data;
  }),

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
