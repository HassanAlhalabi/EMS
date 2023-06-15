import { getCookie } from "../../util";

const useIsAuth = () => { 

    const isAuth = Boolean(getCookie('EMSUser') || sessionStorage.getItem('EMSUser'));
    
    return isAuth;
    
};
 
export default useIsAuth;  