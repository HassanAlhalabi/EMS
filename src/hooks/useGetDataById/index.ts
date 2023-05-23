import { useEffect } from "react";

import { UseQueryOptions, useQuery } from "react-query";

import { useHTTP } from "../useHTTP";
import { AxiosResponse } from "axios";

export const useGetDataById = <TData>(path: string, id: string | null, config?: UseQueryOptions<AxiosResponse<TData>>) => {

    const { get } = useHTTP();

    const   {   refetch,
                data
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

    return { refetch, data }

}