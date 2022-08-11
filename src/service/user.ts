/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-21 13:44:18
 * @LastEditTime: 2022-08-04 10:10:23
 */

import { useRequest } from "@/hooks/request";
import { IRes } from "@lemonpeel/utils";

export interface MenuResData {
    component: string;
    hidden: boolean;
    isHref: boolean;
    icon?: string;
    name: string;
    noCache?: boolean;
    path: string;
    title: string;
    transition?: string;
    visitor?: boolean;
    type?: number;
    children?: MenuResData[];
}

export function login(data: { password: string, username: string }) {
    return useRequest.post("/login",
        {
            data, meta: { loading: false },
            handleError: (value) => value,
        })
}

export function signOut() {
    return useRequest.get("/logout")
}

export function getUserMenu(): Promise<IRes<MenuResData[]>> {
    return useRequest.get("/getUserMenu")
}


