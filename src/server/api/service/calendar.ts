import { calendar_v3, google } from "googleapis";
import { ExcuseApi } from "./excuseapi";
import { calendar } from "googleapis/build/src/apis/calendar";
import { readFileSync } from "fs";

function getCalendarClient(access_token: string | null) {
  if (!access_token) {
    throw new Error("No access token");
  }
  const auth = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
  );
  auth.setCredentials({ access_token: access_token });
  google.options({ http2: true });
  return google.calendar({ version: "v3", auth });
}

class CalendarApi extends ExcuseApi {
  access_token: string | null;

  constructor(access_token: string | null) {
    super();
    this.access_token = access_token;
  }

  async getInformation() {
    try {
      const client = getCalendarClient(this.access_token);
      const prev = new Date();
      prev.setDate(prev.getDate() - 21);
      const next = new Date();
      next.setDate(next.getDate() + 21);
      const res = await client.events.list({
        calendarId: "primary",
        timeMin: prev.toISOString(),
        timeMax: next.toISOString(),
        singleEvents: true,
      });

      const calendar_description =
        res.data.description ?? "User Primary Calendar";

      const events = res.data.items ?? [];

      function distanceToEvent(
        event: calendar_v3.Schema$Event,
        time_ms: number,
      ) {
        return Math.min(
          Math.abs(new Date(event.start?.dateTime ?? 0).getTime() - time_ms),
          Math.abs(new Date(event.end?.dateTime ?? 0).getTime() - time_ms),
        );
      }

      const now = Date.now();
      // Fix events issues
      events.forEach((event) => {
        if (event.start && !event.start.dateTime && event.start.date) {
          event.start.dateTime = new Date(event.start.date).toISOString();
        }
        if (event.end && !event.end.dateTime && event.end.date) {
          event.end.dateTime = new Date(event.end.date).toISOString();
        }
      });

      // Bring most recent events to the front
      events.sort((a, b) => {
        return distanceToEvent(a, now) - distanceToEvent(b, now);
      });

      function timeDifference(a: Date, b: Date): string {
        const diff = Math.abs(a.getTime() - b.getTime());
        const mins = Math.floor(diff / 1000 / 60);
        const hours = Math.floor(mins / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
          return `${days} days`;
        }
        if (hours > 0) {
          return `${hours} hours`;
        }
        return `${mins} minutes`;
      }

      function determineTimeRelation(event: calendar_v3.Schema$Event) {
        if (!event.start && !event.end) {
          return "Unknown";
        }

        if (
          event.end?.dateTime &&
          new Date(event.end.dateTime).getTime() < now
        ) {
          return `Finished ${timeDifference(
            new Date(event.end.dateTime),
            new Date(),
          )} ago`;
        }

        if (
          event.start?.dateTime &&
          new Date(event.start.dateTime).getTime() > now
        ) {
          return `Starts in ${timeDifference(
            new Date(event.start.dateTime),
            new Date(),
          )}`;
        }

        if (
          event.start?.dateTime &&
          event.end?.dateTime &&
          new Date(event.end.dateTime).getTime() < now &&
          new Date(event.start.dateTime).getTime() > now
        ) {
          return "Ongoing";
        }
        return "Unknown";
      }

      function convertEventToString(event: calendar_v3.Schema$Event) {
        return `${event.summary} from ${event.start ? event.start.dateTime : "Unknown Start Time"} to ${event.end ? event.end.dateTime : "Unknown End Time"} - ${determineTimeRelation(event)}
                ${event.description ? `Description ${event.description}` : ""}`;
      }
      return events.reduce((acc, event) => {
        return acc + "   " + convertEventToString(event) + "\n";
      }, `Recent Events Information from ${calendar_description} (Closest events first)\n`);
    } catch (e) {
      console.log(e);
      return Promise.reject(new Error("Error in fetching calendar events"));
    }
  }
  getExcusePrompt(): string {
    return `Additionally you have access to the users calendar events. The calendar events will contain the end time of the event. 
        When generating an excuse prioritise events that end closest to the current time. Reference the exact time an event is scheduled if the information is avaliable
        The current time is ${new Date().toISOString()} \n`;
  }

  getName() {
    return "Calendar";
  }
}

export default CalendarApi;
