import Cookies from "js-cookie";
import { AxiosError } from 'axios';

export const setCookie = <T>(key: string, data: T, time?: number) => {
    if(time) {
        return Cookies.set(key, JSON.stringify(data), { expires: time });
    }
    return Cookies.set(key, JSON.stringify(data));
}

export const getCookie = (key: string) => {
    if(Cookies.get(key)) {
        try {
            return JSON.parse(Cookies.get(key) as string);
        } catch {
            return Cookies.get(key);
        } 
    }
    return null;
}

export const removeCookie = (key: string) => Cookies.remove(key);

export const isAuthUser = () => {
    if(getCookie('EMSUser')) {
        return true;
    }
    return false;
}

export const printAxiosError = (error: unknown) => {
    const err = error as AxiosError;
    if(err.response) { 
        return (err.response.data as string[])[0];
    }
}