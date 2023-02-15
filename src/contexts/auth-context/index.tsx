import { createContext, useState, ReactNode, useEffect } from 'react';

const AUTH_INITIAL_VALUE = {
    isAuthUser: false,
    setAuthUser: (isAuth: boolean) => {}
}

export const AuthContext = createContext(AUTH_INITIAL_VALUE);

export const AuthProvider = ({children}:{children: ReactNode}) => {

    const [isAuthUser, setIsAuth] = useState(true);

    const handleAuthUser = (isAuth: boolean) => setIsAuth(isAuth);

    return <AuthContext.Provider value={{isAuthUser: isAuthUser, setAuthUser: handleAuthUser}}>
                {children}
            </AuthContext.Provider>
}