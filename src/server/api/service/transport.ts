import { ExcuseApi } from "./excuseapi";
import type TransportData from "./transportdata"

class TransportApi extends ExcuseApi {
  apiKey: string; 
  location: string;
  destination: string;

  constructor(apiKey: string, location: string, destination: string) {
    super();
    this.apiKey = apiKey;
    this.location = location;
    this.destination = destination;
  }

  async getInformation(): Promise<string> { 
    try {
        const now = new Date();
        const currentDate = this.formatDate(now);
        const currentTime = this.formatTime(now);

        const params = new URLSearchParams({
            outputFormat: 'rapidJSON',
            coordOutputFormat: 'EPSG:4326',
            type_origin: 'any',
            name_origin: this.location,
            type_destination: 'any', 
            name_destination: this.destination,
            itdDate: currentDate,
            itdTime: currentTime,
            TfNSWTR: 'true'
        });

        const response = await fetch(
            `https://api.transport.nsw.gov.au/v1/tp/trip?${params}`,
            {
                headers: {
                    'Authorization': `apikey ${this.apiKey}`,
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`NSW Transport API responded with status ${response.status}`);
        }

        const data: TransportData = await response.json();

        const trip = data.journeys?.[0];
        if (!trip) {
            return `No transport route found between ${this.location} and ${this.destination}`;
        }

        const transportModes = trip.legs
            .map(leg => leg.transportation?.product?.name || 'Walking')
            .join(', ');

        const totalDuration = trip.duration ? Math.round(trip.duration / 60) : 'Unknown duration';

        const transportInfo = `Journey from ${this.location} to ${this.destination}:
            Transport modes: ${transportModes}\n
            Estimated travel time: ${totalDuration} minutes\n
            ${trip.legs.length} connection(s) required\n`;

        return transportInfo;
    } catch (error) {
        console.error("Error fetching transport data:", error);
        return Promise.reject(new Error("Error in fetching transport information for user"));
    }
  }

  private formatDate(date: Date): string {
    return date.getFullYear().toString() + 
           (date.getMonth() + 1).toString().padStart(2, '0') + 
           date.getDate().toString().padStart(2, '0');
  }

  private formatTime(date: Date): string {
    return date.getHours().toString().padStart(2, '0') + 
           date.getMinutes().toString().padStart(2, '0');
  }

  getExcusePrompt(): string {
    return `You have access to NSW Transport information from ${this.location} to ${this.destination}.
        When generating an excuse, consider using transport-related issues. If the information seems reasonable, you DO NOT NEED TO MENTION TRANSPORT, 
        unless purposefully trying to make a nonsensical excuse. If transport data is unavailable and there was an error in fetching it, DO NOT MENTION TRANSPORT.`;
  }

  getName(): string {
    return `NSW Transport: (${this.location} to ${this.destination})`;
  }
}

export default TransportApi;