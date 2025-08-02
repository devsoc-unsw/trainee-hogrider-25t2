import { google } from "googleapis";
import { ExcuseApi } from "./excuseapi";

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
      prev.setDate(prev.getDate() - 7);
      const next = new Date();
      next.setDate(next.getDate() + 7);
      const res = await client.events.list({
        calendarId: "primary",
        timeMin: prev.toISOString(),
        timeMax: next.toISOString(),
      });
      return JSON.stringify(res.data);
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
