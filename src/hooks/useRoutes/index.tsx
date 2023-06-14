import { useMemo } from "react"
import { getRoutes } from "../../routes"
import useIsAuth from "../useAuth";

export const useRoutes = () => {

    const isAuthUser = useIsAuth();

    const appRoutes = useMemo(() => {
        const routes = getRoutes();
        return routes;
    }, [isAuthUser])

    return { appRoutes }
}