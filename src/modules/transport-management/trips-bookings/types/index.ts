
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