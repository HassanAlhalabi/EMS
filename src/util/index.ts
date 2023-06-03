import Cookies from "js-cookie";
import { AxiosError } from 'axios';
import jwt_decode from "jwt-decode";
import { IDecodedToken } from "../types/token";
import { SelectedOption } from "../types";

declare global {
    interface Array<T> {
        hasAllValues(listOfValues: Array<T>): boolean;
        hasSomeValues(listOfValues: Array<T>): boolean;
        sortByProp(propKey: keyof T): Array<T>
    }
}

Array.prototype.hasAllValues = function(this, listOfValues) {
    let isAllIn = true;
    listOfValues.forEach(value => {
        if(!this.includes(value)) {
            isAllIn = false;
        }
    })
    return isAllIn;
}

Array.prototype.hasSomeValues = function(this, listOfValues) {
    let isSomeIn = false;
    listOfValues.forEach(value => {
        if(this.includes(value)) {
            isSomeIn = true;
        }
    })
    return isSomeIn;
}

Array.prototype.sortByProp = function(propKey){
    // Empty Array Case
    if(this.length === 0) {
        return [];
    }
    // In Case Property Type is Number
    if(typeof this[0][propKey] === 'number') {
        return this.sort((a,b) => a[propKey] > b[propKey] ? 1 : -1)
    }
    // In Case Property Type is String
    if(typeof this[0][propKey] === 'number') {
        return this.sort((a, b) => {
            return a[propKey].toLowerCase() > b[propKey].toLocaleLowerCase() ? 1 : -1
        })
    }
    return this.sort();
}
 
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
    if(err.response && Array.isArray(err.response.data)) { 
        return (err.response.data as string[])[0];
    }
    return ('Unexpected Error')
}

export const getClaims = () => {
    if(getCookie('EMSUser')) {
        let decodedToken: IDecodedToken = jwt_decode(getCookie('EMSUser').token);
        return decodedToken.Claims.map((claim: string) => {
            return claim.substring(claim.indexOf('.') + 1)
        });
    }
    return [];
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

export const getAllClaimsByType = (type: string) => getClaimsMap().get(type)

export const hasPermission = (scope: string | string[]) => {
    const claims = getClaims();
    return  Array.isArray(scope) ? 
                claims.hasSomeValues(scope)
            :   claims.find( claim => claim.toLowerCase() === scope.toLocaleLowerCase()) ? true : false;
}

export const capitalize = (word: string) => {
    return word.charAt(0) + word.slice(1).toLowerCase();
}

export const splitCamel = (word: string) => word.replace(/([a-z])([A-Z])/g, '$1 $2');

export const mapToTyphead = <TItem extends SelectedOption>(data: TItem[], nameKey = 'name') => {
    return data.map((item) => ({
        ...item,
        label: item[nameKey]
    })) 
}
