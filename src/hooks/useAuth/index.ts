import { getCookie } from "../../util";

const useIsAuth = () => { 

    const isAuth = Boolean(getCookie('EMSUser'));
    
    return isAuth;
    
};
 
export default useIsAuth;  