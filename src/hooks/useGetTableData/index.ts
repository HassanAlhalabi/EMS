import { useQuery } from "react-query";
import { useEffect } from "react";

import { useHTTP } from "../useHTTP";
import { AxiosResponse } from "axios";
import { PaginationInfo } from "../../types";

export const useGetTableData = <TData>(path: string, page: number = 1, pageSize: number = 15, searchKey: string = '') => {

    const { get } = useHTTP();
    
    const { data, 
            status,
            isLoading, 
            isFetching, 
            refetch } = useQuery<AxiosResponse<TData & {paginationInfo: PaginationInfo}>>(
                                [path, page, pageSize, searchKey], 
                                () => get(`${path}?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                                {
                                    keepPreviousData: true,
                                    enabled: false
                                }
                            );

    useEffect(() => {
        let searchTimeout: string | number | undefined | NodeJS.Timeout; 
        if(searchKey) {
            searchTimeout = setTimeout(() => {
            refetch();
            },600);
            return () => clearTimeout(searchTimeout as number);;
        }
        refetch();
        return () => clearTimeout(searchTimeout as number);
    },[page,pageSize,searchKey]);

    return {    
                data, 
                status,
                isLoading, 
                isFetching, 
                refetch 
            }

}