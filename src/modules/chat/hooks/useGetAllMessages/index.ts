import { useEffect } from "react";

import { QueryOptions, UseQueryOptions, useQuery } from "react-query";

import { useGet } from "../../../../hooks";
import { AxiosResponse } from "axios";

const useGetAllMessages = <TData>(groupId: string | null, page: number = 1, pageSize: number = 20, 
                                config: UseQueryOptions<AxiosResponse<TData>>) => {
    const get = useGet();

    const { data: messages, 
            refetch } = useQuery<AxiosResponse<TData>>(['/Message/GetAllMessages', groupId], 
                () => get(`/Message/GetAllMessages?page=${page}&pageSize=${pageSize}&groupId=${groupId}`), {
                    enabled: false,
                    ...config,
                });
             
    useEffect(() => {
        if(groupId) {
            refetch();
        }
    }, [groupId])           

    return { messages };          
    
}
 
export default useGetAllMessages;