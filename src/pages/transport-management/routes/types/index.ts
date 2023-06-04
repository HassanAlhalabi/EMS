
export interface State {
    stateId: number,
    stateName: string
}

export interface City {
    cityId: number,
    cityName: string,
    state?: State
}

export interface Route {
    routeId: string,
    from: City,
    to: City
}

export interface NewRoute {
    from?: City;
    to?: City;
    fromId: number;
    toId: number
}