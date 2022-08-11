/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-18 15:20:13
 * @LastEditTime: 2022-08-11 10:58:35
 */


import { login } from "@/service";
import { IHistory, TRoutesMenu } from "@/types/router.type"
import { IRes } from "@lemonpeel/utils";
import { _GettersTree } from "pinia";

export interface AppState {
    theme?: "dark" | "light"
}
export type AppGetters = {

}
export interface AppActions {
    setTheme: (value: "dark" | "light") => void
}

export interface UserState {
    sidebarRouters: TRoutesMenu[]
    userInfo?: { access_token: string };
    historyRoutes: IHistory[],
    historyLastIndex: number
}
export interface UserGetters extends _GettersTree<UserState> {
    token: (state:UserState) => string;
    isMenu: (state: UserState) => boolean;
    cachedRouteKeys: (state: UserState) => string[]
}
export interface UserActions {
    logout: () => Promise<any>,
    login: (data: Parameters<typeof login>[0]) => Promise<IRes>,
    generateRoutes: () => Promise<TRoutesMenu>,
}
