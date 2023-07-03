import { useQuery } from "react-query";
import { useHTTP } from "../useHTTP";


const useGetData = (path: string) => {

    const { get } = useHTTP();

    return useQuery(path, () => get(path))
}
 
export default useGetData;