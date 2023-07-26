import { useEffect } from "react";

import { UseInfiniteQueryOptions, useInfiniteQuery } from "react-query";

import { useGet } from "../../../../hooks";
import { AxiosResponse } from "axios";
import { PaginationInfo } from "../../../../types";

const useGetAllMessages = <TData extends {paginationInfo: PaginationInfo}>(groupId: string | null, page: number = 1, pageSize: number = 30, 
                                config: UseInfiniteQueryOptions<AxiosResponse<TData>>) => {
    const get = useGet();

    const { data: messages, 
            refetch,
            isLoading, 
            isFetching,
            fetchNextPage,
            isFetchingNextPage, 
            hasNextPage } = useInfiniteQuery<AxiosResponse<TData>>(
                ['/Message/GetAllMessages', groupId], 
                ({pageParam = 50}) => {
                    return get(`/Message/GetAllMessages?page=1&pageSize=${pageParam}&groupId=${groupId}`)
                } , {
                    getNextPageParam: (lastPage) => {
                        if(lastPage.data.paginationInfo.hasNext) {
                            return lastPage.data.paginationInfo.pageSize + 50 
                        }
                        return undefined
                        
                    },
                    enabled: false,
                    ...config
                });
             
    useEffect(() => {
        // const interval = setInterval(() => {
        //     if(groupId) refetch();
        // }, 30000);
        if(groupId) refetch();
        // return () => clearInterval(interval)
    }, [groupId]);

    return { messages , refetch, isLoading, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage };          
    
}
 
export default useGetAllMessages;