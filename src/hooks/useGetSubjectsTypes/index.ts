import { useQuery } from "react-query";
import { useGet } from "..";



export const useGetSubjectsTypes = () => {
    const get = useGet();
    const { data } = useQuery(
        ['/SubjectType/GetDropDownSubjectTypes'], 
    () => get(`/SubjectType/GetDropDownSubjectTypes`));
    return data?.data;
}