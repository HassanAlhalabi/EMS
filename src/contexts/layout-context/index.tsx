import { createContext, ReactNode, useState, useEffect } from "react"

const INITIAL_STATE = {
    drawerIsExpanded: true,
    toggleDrawer: () => {},
    theme: 'DARK',
    toggleTheme: () => {}
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

    const [drawerIsExpanded, setIsExpanded] = useState(true);
    const [theme, setTheme] = useState<ThemeMode>('LIGHT');

    const toggleDrawer = () => { 
        console.log('Triggered');
        setIsExpanded(prev => !prev);
    };
    
    const toggleTheme = () => setTheme(prev => prev === 'LIGHT' ? 'DARK' : 'LIGHT');

    useEffect(() => {
        handleToggleTheme(theme);
    },[theme]);

    return <LayoutContext.Provider value={{ drawerIsExpanded, toggleDrawer, theme, toggleTheme }}>
                {children}
            </LayoutContext.Provider>

}