import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useTheme } from '../../hooks/useTheme';

const TableLoader = () => {

    const {theme} = useTheme();

    const style = theme === 'DARK' ? {
        baseColor: "#353e4a",
        highlightColor: "#626b78"
    } : {
        baseColor: "#e5e5e5",
        highlightColor: "#d0d1d3"
    }

    return (
        <SkeletonTheme baseColor={style.baseColor} highlightColor={style.highlightColor} >
            <Skeleton count={15} height='55px' width='100%'  />
        </SkeletonTheme>
    )
}

export default TableLoader
