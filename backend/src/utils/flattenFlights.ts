
export interface FlatFlight {
    flightKey: string;
    origin:string;
    destination:string;
    airline: string;
    stops: number;
    departureTime: string;
    arrivalTime: string;
    durationInMin: number;
    lowestPrice: number;
    fares: any[];
  }
export function flattenFlights(result: any): FlatFlight[] {
    const flatFlights: FlatFlight[] = [];
  
    const journeys = result.journeys;
    const sectors = result.sectors;
  
    for (const journeyKey in journeys) {
      const sectorKey = journeys[journeyKey].sector;
      const sectorFlights = sectors[sectorKey];
  
      if (!sectorFlights) continue;
  
      for (const flightKey in sectorFlights) {
        const flightOption = sectorFlights[flightKey];
  
        const segments = flightOption.flights;
        const origin = segments[0].departureAirport.code;
        const destination = segments[segments.length - 1].arrivalAirport.code;
        const otherDetails = flightOption.otherDetails;
        const fares = flightOption.fares || [];
  
        const stops = segments.length - 1;
        const departureTime = segments[0].departureAirport.time;
        const arrivalTime =
          segments[segments.length - 1].arrivalAirport.time;
  
        const durationInMin = segments.reduce(
          (sum: number, seg: any) => sum + (seg.durationInMin || 0),
          0
        );
  
        flatFlights.push({
          flightKey,
          origin,
          destination,
          airline: otherDetails.airline?.[0] || segments[0].airlineCode,
          stops,
          departureTime,
          arrivalTime,
          durationInMin,
          lowestPrice: Number(otherDetails.lowestPrice),
          fares
        });
      }
    }
  
    return flatFlights;
  }
  