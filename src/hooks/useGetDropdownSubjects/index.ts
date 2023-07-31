import { useQuery } from "react-query";
import { useGet } from "..";

const useGetDropdownSubjects = () => {
    const get = useGet();

    const { data: subjects } = useQuery(
        ['/Subject/GetDropDownSubjects'], 
        () => get(`/Subject/GetDropDownSubjects`));

        return { subjects }
}
 
export default useGetDropdownSubjects;