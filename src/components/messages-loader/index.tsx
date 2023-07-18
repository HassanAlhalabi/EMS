import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useTheme } from '../../hooks/useTheme';

const randomWidths = [20,40,50,70,80,100]

const MessagesLoader = ({columns}: {columns?: number}) => {

    const {theme} = useTheme();

    const style = theme === 'DARK' ? {
        baseColor: "#353e4a",
        highlightColor: "#626b78"
    } : {
        baseColor: "#e5e5e5",
        highlightColor: "#d0d1d3"
    }

    const renderSkeletonBar = () => 
        Array(15).fill(0).map((el, index) => <Skeleton   
                                                key={`${el+index}`}
                                                count={1} 
                                                height='45px'
                                                className="mb-3"
                                                width={`${randomWidths[Math.ceil(Math.random()*6)]}%`}  />)   

    return (
        <SkeletonTheme baseColor={style.baseColor} highlightColor={style.highlightColor} >
            {renderSkeletonBar()}
        </SkeletonTheme>
    )
}

export default MessagesLoader
