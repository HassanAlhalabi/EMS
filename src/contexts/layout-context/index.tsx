import { createContext, ReactNode, useState, useEffect, useCallback } from "react"

const INITIAL_STATE = {
    
    drawerIsExpanded: true,
    
    toggleDrawer: () => {},
    theme: 'DARK',   
    toggleTheme: () => {},

    isScreenLoading: false,
    toggleScreenLoader: () => {},

    isProgressLoading: false,
    toggleProgressLoader: (loaderState: boolean) => {},

}

export type ThemeMode = 'LIGHT' | 'DARK';

const handleToggleTheme = (currentTheme: ThemeMode) => {
    const root = document.querySelector('html');
    currentTheme === 'DARK' ? 
        root?.classList.add('dark') :
        root?.classList.remove('dark')
}

export const LayoutContext = createContext(INITIAL_STATE);

export const LayoutContextProvider = ({children}:{children: ReactNode}) => {

    const [drawerIsExpanded, setIsExpanded] = useState(false);
    const [theme, setTheme] = useState<ThemeMode>('DARK');
    const [isScreenLoading, setIsScreenLoading] = useState<boolean>(false);
    const [isProgressLoading, setProgressLoading] = useState<boolean>(false);

    const toggleDrawer =  useCallback(() => setIsExpanded(prev => !prev),[]);
    const toggleTheme = useCallback(() => setTheme(prev => prev === 'LIGHT' ? 'DARK' : 'LIGHT'),[]);
    const toggleScreenLoader = () => setIsScreenLoading(prev => !prev);
    const toggleProgressLoader = (loaderState: boolean) => setProgressLoading(loaderState);

    useEffect(() => {
        handleToggleTheme(theme);
    }, [theme]);

    return  <LayoutContext.Provider value={{ 
                                            drawerIsExpanded, 
                                            toggleDrawer, 
                                            theme, 
                                            toggleTheme,
                                            isScreenLoading,
                                            toggleScreenLoader,
                                            isProgressLoading,
                                            toggleProgressLoader 
                                        }}>
                {children}
            </LayoutContext.Provider>

}