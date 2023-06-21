import { useQuery } from "react-query";
import { useGet } from "..";


const useGetTickets = (searchKey = '') => {
    const get = useGet();
    
    const { data } = useQuery(
        [`/TicketType/GetAllTicketTypes?page=1&pageSize=30&key=${searchKey}`], 
        () => get(`/TicketType/GetAllTicketTypes?page=1&pageSize=30&key=${searchKey}`));

    return data?.data
}
 
export default useGetTickets;