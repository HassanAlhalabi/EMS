import { useEffect } from "react";

import { useQuery } from "react-query";

import { useGet } from "../../../../hooks";

const useGetAllMessages = (groupId: string | null, page: number = 1, pageSize: number = 20) => {
    const get = useGet();

    const { data: messages, 
            refetch } = useQuery(['/Message/GetAllMessages', groupId], 
                () => get(`/Message/GetAllMessages?page=${page}&pageSize=${pageSize}&groupId=${groupId}`),{
                    enabled: false,
                });
             
    useEffect(() => {
        if(groupId) {
            refetch();
        }
    }, [groupId])           

    return { messages };          
    
}
 
export default useGetAllMessages;