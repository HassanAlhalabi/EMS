import { useEffect, useMemo } from "react";

import { UseQueryOptions, useQuery } from "react-query";
import { AxiosResponse } from "axios";

import { useHTTP } from "../useHTTP";
import useLoadingBar from "../useLoadingBar";

export const useGetDataById = <TData>(  path: string, id: string | null | undefined, 
                                        config?: UseQueryOptions<AxiosResponse<TData>> & {
                                            onRefetch?: (data: AxiosResponse<TData, any> | undefined) => void
                                        }) => {

    const { get } = useHTTP();

    const { toggleProgressLoader } = useLoadingBar();

    const   {   refetch,
                data,
                isFetching,
                isLoading,
                isFetched
            } = useQuery<AxiosResponse<TData>>(
                    [path, id], 
                    () => get(`${path}/${id}`),
                    {
                        ...config,
                        enabled: false,                
                    });

    useEffect(() => {
        if(id) {
            toggleProgressLoader(true);
        }
        if(id && !isFetched) {
            refetch().then(res => config?.onRefetch?.(res.data));
            return;
        }
        config?.onRefetch?.(data);
    },[id]);

    useEffect(() => {
        if(isFetched) {
            toggleProgressLoader(false);
        }
    },[isFetched])

    return { refetch, data, isFetching, isLoading }

}