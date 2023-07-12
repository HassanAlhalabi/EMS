import { useQuery } from "react-query";

import { useGet } from "..";


const useGetDropdownFaculties = (key: string = '') => {
    const get = useGet();

    return useQuery(
        ['/Faculty/GetDropDownFaculties', key], 
    () => get(`/Faculty/GetDropDownFaculties?key=${key}`));

}
 
export default useGetDropdownFaculties;