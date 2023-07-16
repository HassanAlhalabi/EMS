import { useQuery } from "react-query";
import { useGet } from "..";
import { useEffect } from "react";


const useGetDropdownSpecialities = (facultyId: string) => {
    const get = useGet();

    const { data: specialities, refetch: refetchSpecialities } = useQuery(
        ['/Specialty/GetDropDownSpecialties', facultyId], 
        () => get(`/Specialty/GetDropDownSpecialties/${facultyId}`),
        {
            enabled: false
        });

    useEffect(() => {
        if(facultyId) {
            refetchSpecialities();
        }
    },[facultyId]);

    return { specialities }

}
 
export default useGetDropdownSpecialities;