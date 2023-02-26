import { useMutation, useQuery } from "react-query";
import { post, put, get, deleteReq } from "../http";
import { useState } from 'react';

export const useGet = (path: string, page: number = 1, pageSize: number = 15) => {

    const queryFn = () => get(`${path}?page=${page}&pageSize=${pageSize}`);
    
    return useQuery([path, page],  queryFn, {
        keepPreviousData: true
    })

}

export const usePost = <T>(path: string, data: T) => {

    const mutationFn = async () => await post(path, data);
    
    return useMutation(mutationFn);

}

export const usePut = <T>(path: string, data: T) => {

    const mutationFn = async () => await put(path, data);
    
    return useMutation(mutationFn);

}


export const useDelete = (path: string, id: string) => {

    const mutationFn = async () => await deleteReq(`${path}/${id}`);
    
    return useMutation(mutationFn);

}

export const useToast = () => {
    const [isOpen, setIsOpen] = useState(false);
}