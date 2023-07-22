import { createContext, ReactNode, useState, useEffect, useCallback } from "react"

const INITIAL_STATE = {
    
    drawerIsExpanded: true,
    
    toggleDrawer: () => {},
    theme: localStorage.getItem('themeMode') ? localStorage.getItem('themeMode') : 'DARK',   
    toggleTheme: () => {},

    isScreenLoading: false,
    toggleScreenLoader: () => {},

    isProgressLoading: false,
    toggleProgressLoader: (loaderState: boolean) => {},

    setIsExpanded: (newState: boolean) => {}

}

export type ThemeMode = 'LIGHT' | 'DARK';

const handleToggleTheme = (currentTheme: ThemeMode) => {
    const root = document.querySelector('html');
    if(currentTheme === 'DARK') {
        root?.classList.add('dark');
        localStorage.setItem('themeMode','DARK');
        return;
    }
    root?.classList.remove('dark');
    localStorage.setItem('themeMode','LIGHT');
}

export const LayoutContext = createContext(INITIAL_STATE);

export const LayoutContextProvider = ({children}:{children: ReactNode}) => {

    const [drawerIsExpanded, setIsExpanded] = useState(false);
    const [theme, setTheme] = useState<ThemeMode>(
                                localStorage.getItem('themeMode') ? 
                                (localStorage.getItem('themeMode') as ThemeMode) : 
                                'DARK'
    );
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
                                            setIsExpanded,
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