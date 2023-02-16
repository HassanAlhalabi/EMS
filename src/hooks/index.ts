import { useMutation } from "react-query";
import { post, put } from "../http";
import { useState } from 'react';

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