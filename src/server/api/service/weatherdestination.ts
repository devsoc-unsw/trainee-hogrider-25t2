// user's desired destination

import { ExcuseApi } from "./excuseapi";

import type { WeatherData } from "./weather";

class WeatherDestinationApi extends ExcuseApi {
  apiKey: string; 
  destination: string;

  constructor(apiKey: string, destination: string) {
    super();
    this.apiKey = apiKey;
    this.destination = destination;
  }

  async getInformation(): Promise<string> { 
    try {
      const response = await fetch(
        // to do: fix this 
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.destination)}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`OpenWeather API responded with status: ${response.status}`);
      }

      const data: WeatherData = await response.json();

      const weatherCondition = data.weather?.[0] ?? { 
        main: '???', 
        description: 'No weather data available' 
      };

      // TODO: add weatherInfo
      const weatherInfo = `Current weather in ${this.destination}: ${weatherCondition.main} - ${weatherCondition.description}\n
        Temperature: ${data.main.temp}°C (feels like ${data.main.feels_like}°C)\n
        Wind: ${data.wind?.speed || 0} m/s\n
        ${data.visibility ? `Visibility: ${data.visibility}m` : ''}`;

      return weatherInfo;

    } catch (error) {
      console.error("Error fetching weather data:", error);
      return Promise.reject(new Error("Error in fetching weather information"));
    }
  }

  getExcusePrompt(): string {
    return `You have access to current weather information for the user's destination (${this.destination}).
        Like with the user's current location, when generating an excuse, consider mentioning the weather data.`;
  }

  getName(): string {
    return `Weather (${this.destination})`;
  }
}

export default WeatherDestinationApi;

