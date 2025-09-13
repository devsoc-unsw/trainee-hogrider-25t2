export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility?: number;
  name: string;
}