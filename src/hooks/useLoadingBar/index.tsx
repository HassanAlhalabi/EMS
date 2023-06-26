import { useContext, useEffect, useRef, useState } from "react";

import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

import { LayoutContext } from "../../contexts/layout-context";

const useLoadingBar = () => {

    const { isProgressLoading, toggleProgressLoader } = useContext(LayoutContext);
    const [showLoading, setShowLoading] = useState(false);
    const loadingBarRef = useRef<LoadingBarRef>(null);
    useEffect(() => {
      if(isProgressLoading) { 
        loadingBarRef?.current?.continuousStart();
        setShowLoading(true); 
        return;
      }
      loadingBarRef.current?.complete();
    },[isProgressLoading]);
    
    const renderLoadingBar = () => 
        <LoadingBar color={'#00d27a'} 
            ref={loadingBarRef}
            style={showLoading ? {opacity: 1} : {opacity: 0}}
            onLoaderFinished={() => { setShowLoading(false) } }/>

    return { renderLoadingBar, toggleProgressLoader }        

}
 
export default useLoadingBar;