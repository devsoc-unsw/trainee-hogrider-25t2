export default interface TransportData {
  journeys?: Array<{
    legs: Array<{
      transportation?: {
        product?: {
          name?: string;
        };
        destination?: {
          name?: string;
        };
      };
      duration?: number;
    }>;
    duration?: number;
  }>;
}