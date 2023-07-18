import { UseQueryOptions, useQuery } from "react-query";
import { useHTTP } from "../useHTTP";
import useLoadingBar from "../useLoadingBar";
import { AxiosResponse } from "axios";
import { useEffect } from "react";


const useGetData = <TData>(path: string, config?: UseQueryOptions<AxiosResponse<TData>> & {
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
                    path, 
                    () => get(`${path}`),
                    {
                        ...config,              
                    });

    useEffect(() => {
        if(isLoading) {
            toggleProgressLoader(true);
        }
        if(isLoading && !isFetched) {
            refetch().then(res => config?.onRefetch?.(res.data));
            return;
        }
        config?.onRefetch?.(data);
    },[isLoading]);

    useEffect(() => {
        if(isFetched) {
            toggleProgressLoader(false);
        }
    },[isFetched])

    return { refetch, data, isFetching, isLoading, isFetched }

}
 
export default useGetData;