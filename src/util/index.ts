import Cookies from "js-cookie";

export const setCookie = <T>(key: string, data: T, time: number = 1) => {
    Cookies.set(key, JSON.stringify(data), { expires: time })
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