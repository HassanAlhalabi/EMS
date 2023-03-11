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

export const usePostFormData = <T>(path: string, data: T) => {

    const formData = new FormData();
    Object.entries(data as Object).map(([key, value]) => {
        formData.append(key, value)
    })

    const mutationFn = async () => await post(path, formData, {
        headers: {
            'Accept' : '*/*',
            "Content-Type" : 'multipart/form-data'
        }
    });
    
    return useMutation(mutationFn);

}

export const usePut = <T>(path: string, data?: T) => {

    const mutationFn = async () => await put(path, data);
    
    return useMutation(mutationFn);

}

export const usePutFormData = <T>(path: string, data: T) => {

    const formData = new FormData();
    Object.entries(data as Object).map(([key, value]) => {
        formData.append(key, value)
    })

    const mutationFn = async () => await put(path, formData, {
        headers: {
            'Accept' : '*/*',
            "Content-Type" : 'multipart/form-data'
        }
    });
    
    return useMutation(mutationFn);

}

export const usePutByPath = <T>(path: string) => {

    const mutationFn = async () => await put(path);
    
    return useMutation(mutationFn);

}

export const useDelete = (path: string, id: string) => {

    const mutationFn = async () => await deleteReq(`${path}/${id}`);
    
    return useMutation(mutationFn);

}

export const useToast = () => {
    const [isOpen, setIsOpen] = useState(false);
}