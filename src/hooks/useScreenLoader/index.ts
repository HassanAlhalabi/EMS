import { useContext } from "react";
import { LayoutContext } from "../../contexts/layout-context";


export const useScreenLoader = () => {
    const { toggleScreenLoader, isScreenLoading } = useContext(LayoutContext);
    return { toggleScreenLoader, isScreenLoading }
}