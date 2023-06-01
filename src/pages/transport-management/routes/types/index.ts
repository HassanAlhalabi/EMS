
export interface Route {
    routeId: string,
    fromId: number,
    fromName: string,
    toId: number,
    toName: string
}

export interface NewRoute {
    toId: number,
    fromId: number
}