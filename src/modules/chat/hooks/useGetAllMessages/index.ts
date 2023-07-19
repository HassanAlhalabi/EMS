import { useEffect } from "react";

import { UseQueryOptions, useQuery } from "react-query";

import { useGet } from "../../../../hooks";
import { AxiosResponse } from "axios";

const useGetAllMessages = <TData>(groupId: string | null, page: number = 1, pageSize: number = 30, 
                                config: UseQueryOptions<AxiosResponse<TData>>) => {
    const get = useGet();

    const { data: messages, 
            refetch,
            isLoading } = useQuery<AxiosResponse<TData>>(['/Message/GetAllMessages', groupId], 
                () => get(`/Message/GetAllMessages?page=${page}&pageSize=${pageSize}&groupId=${groupId}`), {
                    enabled: false,
                    refetchInterval: 10000,
                    ...config,
                });
             
    useEffect(() => {
        const interval = setInterval(() => {
            if(groupId) refetch();
        }, 30000);
        if(groupId) refetch();
        return () => clearInterval(interval)
    }, [groupId])           

    return { messages , refetch, isLoading };          
    
}
 
export default useGetAllMessages;