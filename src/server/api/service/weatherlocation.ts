import { ExcuseApi } from "./excuseapi";

import type { WeatherData } from "./weather";

class WeatherLocationApi extends ExcuseApi {
  apiKey: string; 
  location: string;

  constructor(apiKey: string, location: string) {
    super();
    this.apiKey = apiKey;
    this.location = location;
  }

  async getInformation(): Promise<string> { 
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.location)}&appid=${this.apiKey}&units=metric`
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
      const weatherInfo = `Current weather in ${this.location}: ${weatherCondition.main} - ${weatherCondition.description}\n
        Temperature: ${data.main.temp}°C (feels like ${data.main.feels_like}°C)\n
        Wind: ${data.wind?.speed || 0} m/s\n
        ${data.visibility ? `Visibility: ${data.visibility}m\n` : ''}`;

      return weatherInfo;

    } catch (error) {
      console.error("Error fetching weather data:", error);
      return Promise.reject(new Error("Error in fetching weather information"));
    }
  }

  getExcusePrompt(): string {
    return `You have access to current weather information for the user's location (${this.location}).
        When generating an excuse, consider using the provided weather conditions as a reason. For example, bad weather,
        poor visibility (for driving, etc.), traffic delays, extreme temperatures, and so forth.
        Use these details from the data to make the excuse`;
  }

  getName(): string {
    return `Weather (${this.location})`;
  }
}

export default WeatherLocationApi;