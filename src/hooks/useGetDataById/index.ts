import { useEffect } from "react";

import { UseQueryOptions, useQuery } from "react-query";
import { AxiosResponse } from "axios";

import { useHTTP } from "../useHTTP";

export const useGetDataById = <TData>(  path: string, id: string | null | undefined, 
                                        config?: UseQueryOptions<AxiosResponse<TData>>) => {

    const { get } = useHTTP();

    const   {   refetch,
                data,
                isFetching,
                isLoadingError
            } = useQuery<AxiosResponse<TData>>(
                    [path, id], 
                    () => get(`${path}/${id}`),
                    {
                        ...config,
                        enabled: false,                
                    });

    useEffect(() => {
        if(id) {
            refetch();
        }
    },[id]);

    return { refetch, data, progressLoading: isFetching && !isLoadingError }

}