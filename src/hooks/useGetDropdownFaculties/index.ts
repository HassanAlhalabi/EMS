import { useQuery } from "react-query";

import { useGet } from "..";


const useGetDropdownFaculties = (key: string = '') => {
    const get = useGet();

    const {data: faculties} = useQuery(
        ['/Faculty/GetDropDownFaculties', key], 
    () => get(`/Faculty/GetDropDownFaculties?key=${key}`));

    return { faculties };

}
 
export default useGetDropdownFaculties;