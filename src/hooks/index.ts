import { useMutation, useQuery } from "react-query";
import { useHTTP } from "./useHTTP";

export const useGet = () => {
    const { get } = useHTTP();
    return get;
}

export const usePagedGet = (path: string, page: number = 1, pageSize: number = 15) => {

    const { get } = useHTTP();

    const queryFn = () => get(`${path}?page=${page}&pageSize=${pageSize}`);
    
    return useQuery([path, page],  queryFn, {
        keepPreviousData: true
    })

}

export const usePost = <T>(path: string, data: T) => {

    const { post } = useHTTP();

    const mutationFn = async () => await post(path, data);
    
    return useMutation(mutationFn);

}

export const usePostFormData = <T>(path: string, data: T) => {

    const { post } = useHTTP();
    const formData = new FormData();

    data && Object.entries(data as Object).forEach(([key, value]) => {
        // In Case Array
        if(Array.isArray(value)) {
            Object.values(value as Object).forEach((subvalue) => {
                if(subvalue && subvalue.length !== 0) {
                    formData.append(key, subvalue)
                }
            });
            return;
        }
        if(value && value.length !== 0) {
            formData.append(key, value);
        }
    });
    
    return useMutation(() => post(path, formData, {
        headers: {
            'Accept' : '*/*',
            "Content-Type" : 'multipart/form-data'
        }
    }));
}

export const usePut = <T>(path: string, data?: T) => {

    const { put } = useHTTP();

    const mutationFn = async () => await put(path, data);
    
    return useMutation(mutationFn);

}

export const usePutFormData = <T>(path: string, data: T) => {

    const { put } = useHTTP();

    const formData = new FormData();
    if(data) {
        Object.entries(data as Object).forEach(([key, value]) => {
            if(value  && value.length !== 0) {
                formData.append(key, value)
            }
        })
    }

    const mutationFn = async () => await put(path, formData, {
        headers: {
            'Accept' : '*/*',
            "Content-Type" : 'multipart/form-data'
        }
    });
    
    return useMutation(mutationFn);

}

export const usePutByPath = <T>(path: string) => {

    const { put } = useHTTP();

    const mutationFn = async () => await put(path);
    
    return useMutation(mutationFn);

}

export const useDelete = (path: string, id: string) => {

    const { deleteReq } = useHTTP();

    const mutationFn = async () => await deleteReq(`${path}/${id}`);
    
    return useMutation(mutationFn);

}

export const useBulkDelete = (path: string, ids: string[]) => {

    const { put } = useHTTP();

    const mutationFn = async () => await put(`${path}`,ids);
    
    return useMutation(mutationFn);

}