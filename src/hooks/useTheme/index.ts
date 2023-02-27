import { useContext } from "react";
import { LayoutContext } from "../../contexts/layout-context";


export const useTheme = () => {
    const { theme, toggleTheme } = useContext(LayoutContext);
    return { theme, toggleTheme }
}