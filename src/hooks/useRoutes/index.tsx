import { useContext, useMemo } from "react"
import { getRoutes } from "../../routes"
import { AuthContext } from "../../contexts/auth-context";

export const useRoutes = () => {
    const {isAuthUser} = useContext(AuthContext);

    const appRoutes = useMemo(() => {
        const routes = getRoutes();
        return routes;
    }, [isAuthUser])

    return { appRoutes }
}