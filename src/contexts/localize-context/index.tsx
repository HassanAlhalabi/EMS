import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { setCookie } from '../../util';
import i18n from '../../i18n';
import { queryClient } from '../../main';

const LOCALIZE_INITIAL_VALUE = {
    currentLang: i18n.resolvedLanguage,
    handleCurrentLang: (newLang: string) => {}
}

export const LocalizeContext = createContext(LOCALIZE_INITIAL_VALUE);

export const LocalizeProvider = ({children}:{children: ReactNode}) => {

    const [currentLang, setCurrentLang] = useState(LOCALIZE_INITIAL_VALUE.currentLang);

    const handleCurrentLang = useCallback((newLang: string) => { 
        i18n.changeLanguage(newLang)
        setCurrentLang(newLang);
        setCookie('EMSSystemLang',newLang);
    },[]);

    // Initialize Language
    useEffect(() => {
        const currentLang = i18n.resolvedLanguage
        if(currentLang) {
            handleCurrentLang(currentLang);
            return;
        }
        handleCurrentLang(LOCALIZE_INITIAL_VALUE.currentLang as string);
    },[])

    useEffect(() => {
        if(currentLang) {
            queryClient.resetQueries();
            queryClient.refetchQueries();
        }
    }, [currentLang])

    return <LocalizeContext.Provider value={{currentLang, handleCurrentLang}}>
                {children}
            </LocalizeContext.Provider>
}