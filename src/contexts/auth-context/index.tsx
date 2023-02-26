import { createContext, useState, ReactNode, useEffect } from 'react';
import { updateHTTPClient } from '../../http';
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
            updateHTTPClient();
        }
    },[])

    return <AuthContext.Provider value={{isAuthUser: isAuthUser, setAuthUser: handleAuthUser}}>
                {children}
            </AuthContext.Provider>
}