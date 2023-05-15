import { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { getCookie } from '../../util';

const AUTH_INITIAL_VALUE = {
    isAuthUser: false,
    setAuthUser: (isAuth: boolean) => {}
}

export const AuthContext = createContext(AUTH_INITIAL_VALUE);

export const AuthProvider = ({children}:{children: ReactNode}) => {

    const [isAuthUser, setIsAuth] = useState(false);

    const handleAuthUser = (isAuth: boolean) => setIsAuth(isAuth);

    useEffect(() => {
        const user = getCookie('EMSUser');
        if(user) {
            handleAuthUser(true);
        }
    },[])

    const AuthValue = useMemo(() => {
        return {isAuthUser: isAuthUser, setAuthUser: handleAuthUser}
    }, [isAuthUser])

    return <AuthContext.Provider value={AuthValue}>
                {children}
            </AuthContext.Provider>
}