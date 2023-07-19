import { createContext, useState, ReactNode, useEffect, useCallback, useLayoutEffect } from 'react';
import { setCookie } from '../../util';
import i18n from '../../i18n';
import 'dayjs/locale/ar';
import dayjs from 'dayjs';

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
        dayjs.locale(i18n.language);
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

    useLayoutEffect(() => {
        if(currentLang) {
            document.querySelector('html')?.setAttribute('lang',currentLang)
            if(currentLang === 'ar') {
                document.querySelector('html')?.setAttribute('dir','rtl')
            } else {
                document.querySelector('html')?.setAttribute('dir','ltr')
            }
        }
    }, [])

    return <LocalizeContext.Provider value={{currentLang, handleCurrentLang}}>
                {children}
            </LocalizeContext.Provider>
}