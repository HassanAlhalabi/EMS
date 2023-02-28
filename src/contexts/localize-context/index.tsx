import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { getCookie, setCookie } from '../../util';

type SystemLang = 'AR' | 'EN';

const LOCALIZE_INITIAL_VALUE = {
    currentLang: 'EN',
    handleCurrentLang: (newLang: SystemLang) => {}
}

export const LocalizeContext = createContext(LOCALIZE_INITIAL_VALUE);

export const LocalizeProvider = ({children}:{children: ReactNode}) => {

    const [currentLang, setCurrentLang] = useState(LOCALIZE_INITIAL_VALUE.currentLang);

    const handleCurrentLang = useCallback((newLang: SystemLang) => { 
        setCurrentLang(newLang);
        setCookie('EMSSystemLang',newLang);
    },[]);

    // Initialize Language
    useEffect(() => {
        const currentLang = getCookie('EMSSystemLang');
        if(currentLang) {
            handleCurrentLang(currentLang);
            return;
        }
        handleCurrentLang(LOCALIZE_INITIAL_VALUE.currentLang as SystemLang);
        setCookie('EMSSystemLang', LOCALIZE_INITIAL_VALUE.currentLang);
    },[])

    return <LocalizeContext.Provider value={{currentLang, handleCurrentLang}}>
                {children}
            </LocalizeContext.Provider>
}