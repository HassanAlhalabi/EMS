import { useMutation, useQuery } from "react-query";
import { post, put, get } from "../http";
import { useState } from 'react';

export const useGet = (path: string, page: number = 1, pageSize: number = 15) => {

    const queryFn = () => get(`${path}?page=${page}&pageSize=${pageSize}`);

    console.log(page)
    
    return useQuery([path, page],  queryFn, {
        keepPreviousData: true
    })

}

export const usePost = <T>(path: string, data: T) => {

    const mutationFn = async () => await post(path, data);
    
    return useMutation(mutationFn,{
        onSuccess: (data) => console.log(data),
        onError: error => console.log(error)
    });

}

export const usePut = <T>(path: string, data: T) => {

    const mutationFn = async () => await put(path, data);
    
    return useMutation(mutationFn,{
        onSuccess: (data) => console.log(data),
        onError: error => console.log(error)
    });

}


// export const useDelete = <T>(path: string, data: T) => {

//     const mutationFn = async () => await delete(path, data);
    
//     return useMutation(mutationFn,{
//         onSuccess: (data) => console.log(data),
//         onError: error => console.log(error)
//     });

// }

export const useToast = () => {
    const [isOpen, setIsOpen] = useState(false);
}