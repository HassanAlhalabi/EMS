import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { ACTION_TYPES } from "../../constants";
import { Action } from "../../types";
import { useDelete, usePost, usePostFormData, usePut, usePutFormData } from "..";
import { useScreenLoader } from "../useScreenLoader";
import { getAxiosError } from "../../util";
import { AxiosError } from "axios";

export interface ActionItem {
    type: Action | null;
    path: string;
    payload?: any;
    onSuccess?: () => void,
    onError?: (error: unknown) => void
}

const actionInitialState = {
    type: null,
    payload: null,
    path: "",
    onSuccess: () => {},
    onError: () => {}
}

export const useActions = () => {
  
    const [action, setAction]    = useState<ActionItem>(actionInitialState)
    const { toggleScreenLoader } = useScreenLoader();
    const addMutatation      = usePost(action.path, action.payload);
    const formDataAddMutaion = usePostFormData(action.path, action.payload)
    const updateMutatation   = usePut(action.path, action.payload);
    const formDataPutMutaion = usePutFormData(action.path, action.payload)
    const deleteMutatation   = useDelete(action.path, action.payload);
    const toggleMutatation   = usePut(action.path, action.payload);

    const handleSuccess = () => {
        action?.onSuccess?.();
        setAction(actionInitialState)
    }

    const handleError = (error: unknown) => {
        action?.onError?.(error)
        setAction(actionInitialState)
    }

    const doAction = 
        async () => {
            toggleScreenLoader();
            try {
                switch (action.type) {
                    case ACTION_TYPES.add:
                        await addMutatation.mutateAsync(action.payload, 
                                {onSuccess: handleSuccess,
                                onError: error => handleError(error)});
                        break;
                    case ACTION_TYPES.formDataAdd:
                            await formDataAddMutaion?.mutateAsync(action.payload, 
                                {onSuccess: handleSuccess,
                                onError: error => handleError(error)});
                            break;
                    case ACTION_TYPES.update:
                        await updateMutatation.mutateAsync(action.payload, 
                                {onSuccess: handleSuccess,
                                onError: error => handleError(error)});
                        break;
                    case ACTION_TYPES.bulkUpdate:
                        await updateMutatation.mutateAsync(action.payload, 
                                {onSuccess: handleSuccess,
                                onError: error => handleError(error)});
                        break;
                    case ACTION_TYPES.formDataUpdate:
                        await formDataPutMutaion.mutateAsync(action.payload, 
                                {onSuccess: handleSuccess,
                                onError: error => handleError(error)});
                        break;
                    case ACTION_TYPES.delete:
                        await deleteMutatation.mutateAsync(action.payload, 
                                {onSuccess: handleSuccess,
                                onError: error => handleError(error)});
                        break;
                    case ACTION_TYPES.toggle:
                        await toggleMutatation.mutateAsync(action.payload,
                                {onSuccess: handleSuccess,
                                onError: error => handleError(error)});
                        break;
                    default:
                        break;
                }
            }
            catch(error) {
                toast.error(getAxiosError(error))
            }
            toggleScreenLoader();
        }

    useEffect(() => {
        if(action.type) { 
            doAction()
        }
        () => setAction(actionInitialState)
    },[action.type])

    return { setAction };

}