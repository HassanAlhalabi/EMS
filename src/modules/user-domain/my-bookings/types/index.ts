
export interface TripBooking {
    bookingId: string,
    userId: string,
    chairNumber: number,
    bookingDate: string,
}

export interface NewTripBooking {
    tripId: string;
    chairNumber: number;
}

export interface UserBooking {
    bookingId: string,
    userFullName: string,
    userName: string,
    chairNumber: number,
    bookingDate: string,
    trip: {
        tripId: string,
        departureHoure: string,
        vehicle: null,
        route: {
            routeId: string,
            from: {
                cityId: number,
                cityName: string,
                state: {
                    stateId: number,
                    stateName: string
                }
            } | null,
            to: {
                cityId: number,
                cityName: string,
                state: {
                    stateId: number,
                    stateName: string
                }
            } | null
        },
        busStops: [],
        totalSeats: number,
        availableSeats: number
    }
}