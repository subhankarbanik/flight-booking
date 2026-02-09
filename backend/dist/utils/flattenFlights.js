"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenFlights = flattenFlights;
function flattenFlights(result) {
    const flatFlights = [];
    const journeys = result.journeys;
    const sectors = result.sectors;
    for (const journeyKey in journeys) {
        const sectorKey = journeys[journeyKey].sector;
        const sectorFlights = sectors[sectorKey];
        if (!sectorFlights)
            continue;
        for (const flightKey in sectorFlights) {
            const flightOption = sectorFlights[flightKey];
            const rawSegments = flightOption.flights;
            const segments = rawSegments.map((seg) => ({
                origin: seg.departureAirport.code,
                destination: seg.arrivalAirport.code,
                departureTime: seg.departureAirport.time,
                arrivalTime: seg.arrivalAirport.time,
                flightNumber: seg.flightNumber,
                airline: seg.airlineCode
            }));
            const origin = segments[0].origin;
            const destination = segments[segments.length - 1].destination;
            const stops = segments.length - 1;
            const departureTime = segments[0].departureTime;
            const arrivalTime = segments[segments.length - 1].arrivalTime;
            const durationInMin = rawSegments.reduce((sum, seg) => sum + (seg.durationInMin || 0), 0);
            flatFlights.push({
                flightKey,
                origin,
                destination,
                airline: segments[0].airline,
                stops,
                departureTime,
                arrivalTime,
                durationInMin,
                lowestPrice: Number(flightOption.otherDetails?.lowestPrice),
                fares: flightOption.fares || [],
                segments
            });
        }
    }
    return flatFlights;
}
