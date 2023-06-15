
export interface NewBusStop {
    nameAr: string;
    nameEn: string;
    cityId: number;
    stateId: number;
}

export interface BusStop {
    busStopId: string;
    busStopName: string;
    cityName: string;
    cityId: number;
    stateId: number;
    stateName: string;   
}

export interface FullBusStop {
    busStopId: string;
    nameAr: string;
    nameEn: string;
    cityName: string;
    cityId: number;
    stateId: number;
    stateName: string;   
}