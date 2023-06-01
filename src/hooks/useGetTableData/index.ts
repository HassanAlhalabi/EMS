import { useQuery } from "react-query";
import { useEffect } from "react";

import { useHTTP } from "../useHTTP";

export const useGetTableData = (path: string, page: number = 1, pageSize: number = 15, searchKey: string = '') => {

    const { get } = useHTTP();
    
    const { data, 
            status,
            isLoading, 
            isFetching, 
            refetch } = useQuery(
                                [path, page, pageSize, searchKey], 
                                () => get(`${path}?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                                {
                                    keepPreviousData: true,
                                    enabled: false
                                }
                            );

    useEffect(() => {
        let searchTimeout: number; 
        if(searchKey) {
            searchTimeout = setTimeout(() => {
            refetch();
            },600);
            return () => clearTimeout(searchTimeout);;
        }
        refetch();
        return () => clearTimeout(searchTimeout);
    },[page,pageSize,searchKey]);

    return {    
                data, 
                status,
                isLoading, 
                isFetching, 
                refetch 
            }

}