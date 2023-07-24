import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useTheme } from '../../../../hooks/useTheme';

const GroupsLoader = ({count}: {count?: number}) => {

    const {theme} = useTheme();

    const style = theme === 'DARK' ? {
        baseColor: "#353e4a",
        highlightColor: "#626b78"
    } : {
        baseColor: "#e5e5e5",
        highlightColor: "#d0d1d3"
    }

    const rowsCount = count ?? 7;

    const rowsArray = Array(rowsCount).fill(undefined)

    return <>
                <SkeletonTheme baseColor={style.baseColor} highlightColor={style.highlightColor}>
            <Skeleton height='36px' className="w-100 mb-2" />
                {rowsArray.map((row) =>         
                    <div key={row} className="row gap-2 p-2 mb-3">
                        <div style={{height:'55px',
                                width:'55px'}}  >
                            <Skeleton
                                height='55px'
                                width='55px'
                                circle
                            />
                        </div>
                        <div className=""  style={{flex: 1}}>
                            <Skeleton height='30px' style={{maxWidth: '100px'}} />
                            <Skeleton height='15px' style={{maxWidth: '300px'}}/>
                        </div>
                    </div>)}
                </SkeletonTheme></>
}

export default GroupsLoader
