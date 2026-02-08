export interface FlightSearchResponse {
  data: {
    searchId: string;
    provider: string;
    success: boolean;
    result: {
      journeys: any;
      sectors: any;
    };
  };
}
