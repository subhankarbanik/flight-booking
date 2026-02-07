export interface FlightSearchResponse {
    success: boolean;
    searchId: string;
    result: {
      journeys: any;
      sectors: any;
      searchQuery: any;
      metaData:any;

    };
  }