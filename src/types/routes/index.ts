
export interface IRoute {
    id: string,
    name: string,
    path: string,
    isIndex: boolean,
    childRoutes: IRoute[] | null,
    element: JSX.Element,
    hasPermission: boolean
}