import { useQuery } from "react-query";
import { useGet } from "..";


const useGetDepartments = (searchKey = '') => {

    const get = useGet();
    
    const { data } = useQuery(
        [`/Department/GetAllDepartments?page=1&pageSize=30&key=${searchKey}`], 
        () => get(`/Department/GetAllDepartments?page=1&pageSize=30&key=${searchKey}`));

    return data?.data
}
 
export default useGetDepartments;