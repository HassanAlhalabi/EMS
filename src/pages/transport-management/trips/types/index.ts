import { Vehicle } from "../../../../types/vehicles";
import { BusStop } from "../../bus-stops/types";
import { Route } from "../../routes/types";

export interface Trip {
    tripId: string;
    departureHoure: string;
    route: Route;
    vehicle: Vehicle;
    busStops: BusStop[]
}

export interface NewTrip {
    departureHoure: string;
    routeId: string;
    vehicleId: string;
    busStops: {
        value: string,
        label: string
    }[]
}