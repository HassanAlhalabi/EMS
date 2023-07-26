import Cookies from "js-cookie";
import { AxiosError } from 'axios';
import jwt_decode from "jwt-decode";
import { IDecodedToken } from "../types/token";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

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

export const getAxiosError = (error: unknown) => {
    const err = error as AxiosError;
    if(err.response && Array.isArray(err.response.data)) { 
        return (err.response.data as string[])[0];
    }
    return ('Unexpected Error')
}

export const getClaims = () => {
    if(getCookie('EMSUser')) {
        const permissions = getCookie('EMSUser').permissions
        let decodedToken: IDecodedToken = jwt_decode(permissions);
        return decodedToken.Claims.map((claim: string) => {
            return claim.substring(claim.indexOf('.') + 1)
        });
    }
    return [];
}

export const getClaimsMap = () => {
    const permissions = getCookie('EMSUser').permissions;
    let decodedToken: IDecodedToken = jwt_decode(permissions);
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
    // console.log(claims)
    return  Array.isArray(scope) ? 
                claims.hasSomeValues(scope)
            :   claims.find( claim => claim.toLowerCase() === scope.toLocaleLowerCase()) ? true : false;
}

export const capitalize = (word: string) => {
    return word.charAt(0) + word.slice(1).toLowerCase();
}

export const splitCamel = (word: string) => word.replace(/([a-z])([A-Z])/g, '$1 $2');

export const mapToTyphead = <TItem extends Record<string, any>>(data: TItem[], nameKey = 'name', renderLabel?: (item: TItem) => string) => {
    return data.map((item) => ({
        ...item,
        label: renderLabel ? renderLabel(item) : item[nameKey]
    })) 
}

export function browserNotify(title: string, message?: string) {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification(title, {body: message});
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification(title, {body: message});
          // …
        }
      });
    }
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
}

export const dateFromNow = (date: string | Date | number) => {
    dayjs.extend(relativeTime);
    return dayjs().from(dayjs(date), true);
}

export const isInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}