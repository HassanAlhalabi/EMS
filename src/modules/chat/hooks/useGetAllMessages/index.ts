import { useEffect, useState } from "react";

import { UseInfiniteQueryOptions, UseQueryOptions, useInfiniteQuery } from "react-query";

import { useGet } from "../../../../hooks";
import { AxiosResponse } from "axios";
import { Message } from "../../types";

const useGetAllMessages = <TData>(groupId: string | null, page: number = 1, pageSize: number = 30, 
                                config: UseInfiniteQueryOptions<AxiosResponse<TData>>) => {
    const get = useGet();

    const [pageS, setPageSize] = useState(pageSize);

    const { data: messages, 
            refetch,
            isLoading, 
            isFetching,
            fetchNextPage, 
            hasNextPage } = useInfiniteQuery<AxiosResponse<TData>>(
                ['/Message/GetAllMessages', groupId], 
                ({pageParam = 50}) => {
                    console.log(pageParam)
                    return get(`/Message/GetAllMessages?page=1&pageSize=${pageParam}&groupId=${groupId}`)
                } , {
                    getNextPageParam: (lastPage) => {
                        if(lastPage.data.paginationInfo.hasNext) {
                            return lastPage.data.paginationInfo.pageSize + 50 
                        }
                        return undefined
                        
                    },
                    ...config
                });
             
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if(groupId) refetch();
    //     }, 30000);
    //     if(groupId) refetch();
    //     return () => clearInterval(interval)
    // }, [groupId]);
    
    // useEffect(() => {
    //     if(pageSize) {

    //         refetch()
    //     }
    // },[pageSize, page])

    return { messages , refetch, isLoading, isFetching, fetchNextPage, hasNextPage };          
    
}
 
export default useGetAllMessages;