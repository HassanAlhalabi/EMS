import { useQuery } from "react-query";

import { UserType } from "../../types";
import { useGet } from "..";


const useGetDropdownUsers = (userType: UserType = '', searchKey: string = '') => {
   const get = useGet();
    
    return useQuery(
        ['/User/GetDropDownUsers', userType, searchKey], 
    () => get(`/User/GetDropDownUsers?UserType=${userType}&key=${searchKey}`));

}
 
export default useGetDropdownUsers;