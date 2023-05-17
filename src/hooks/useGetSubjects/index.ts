import { useQuery } from "react-query";
import { useGet } from "..";
import { useEffect } from "react";

export const useGetSubjects = (specialityId: string | undefined) => {

    const get = useGet();
    
    const { data, refetch: refetchSubjects } = useQuery(
        ['/Subject/GetDropDownSubjects', specialityId ], 
    () => get(`/Subject/GetDropDownSubjects?SpecialtyId=${specialityId}`),{
        enabled: false
    });

    useEffect(() => {
        if(specialityId) refetchSubjects();
    },[specialityId])

    return data?.data;

}