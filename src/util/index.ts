import Cookies from "js-cookie";
import { AxiosError } from 'axios';
import jwt_decode from "jwt-decode";
import { IDecodedToken } from "../types/token";

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

export const getAxiosError = (error: unknown) => {
    const err = error as AxiosError;
    if(err.response) { 
        return (err.response.data as string[])[0];
    }
}

export const getClaims = () => {
    let decodedToken: IDecodedToken = jwt_decode(getCookie('EMSUser').token);
    return decodedToken.Claims.map((claim: string) => {
        return claim.substring(claim.indexOf('.') + 1)
    });
}

export const getClaimsMap = () => {
    let decodedToken: IDecodedToken = jwt_decode(getCookie('EMSUser').token);
    const claimsMap = new Map();
    decodedToken.Claims.forEach((claim: string) => {
        const claimTitle = claim.split('.')[1];
        const claimType = claim.split('.')[2];
        if(claimsMap.has(claimTitle)) {
            const oldClaims = claimsMap.get(claimTitle);
            claimsMap.set(claimTitle, [...oldClaims, claimType]);
            return;
        }
        return claimsMap.set(claimTitle, [ claimType ])
    });
    return claimsMap;
}

export const hasPermission = (scope: string) => {
    const claims = getClaims();
    return claims.find( claim => claim.toLowerCase() === scope.toLocaleLowerCase()) ? true : false;
}

export const capitalize = (word: string) => {
    return word.charAt(0) + word.slice(1).toLowerCase();
}

export const splitCamel = (word: string) => word.replace(/([a-z])([A-Z])/g, '$1 $2');

export const mapToTyphead = <TItem extends {name: string}>(data: TItem[] ) => 
    data.map(item => ({
        ...item,
        label: item.name
    }))
