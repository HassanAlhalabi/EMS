import { createContext, useState, ReactNode, useMemo } from 'react';

const AUTH_INITIAL_VALUE: {
    access: string | null;
    setAccess: (newAccess: string | null) => void
} = {
    access: null,
    setAccess: (newAccess: string | null) => {}
}

export const AuthContext = createContext(AUTH_INITIAL_VALUE);

export const AuthProvider = ({children}:{children: ReactNode}) => {

    const [access, setAccess] = useState<null | string>(null);

    const handleAccess = (access: string | null) =>  { setAccess(access) };

    const AuthValue = useMemo(() => {
        return {    access, 
                    setAccess: handleAccess
                }
    }, [access])

    return <AuthContext.Provider value={AuthValue}>
                {children}
            </AuthContext.Provider>
}