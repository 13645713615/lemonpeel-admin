/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 23:18:13
 * @LastEditTime: 2022-08-10 19:05:13
 */


import { defineStore } from "pinia";
import router from "@/router";
import { filterAsyncRouter, GenerateTreeRouter } from "@/hooks/router";
import { MenuRes } from "@/types/api.types";
import { getUserMenu, login } from "@/service";
import { isEmpty, deepForEach } from "@lemonpeel/utils";
import { UserActions, UserGetters, UserState } from "@/types/store.types";

export const useUser = defineStore<"user", UserState, UserGetters, UserActions>({
    id: "user",
    state: () => ({
        sidebarRouters: [],
        userInfo: null,
        historyRoutes: [],
        historyLastIndex: 1,
    }),
    getters: {
        token: (state) => state.userInfo?.access_token,
        isMenu: (state) => !isEmpty(state.sidebarRouters),
        cachedRouteKeys: (state) => state.historyRoutes.reduce<string[]>((accumulator, { name, noCache }) => { if (noCache === false) { accumulator.push(name as string) }; return accumulator }, []),
    },
    actions: {
        async logout() {
            await router.push({ name: "login", query: { redirect: location.pathname } })
            this.$reset();
        },
        async login(data: Parameters<typeof login>[0]) {
            const res = await login(data)
            this.userInfo = res.data;
            return res
        },
        async generateRoutes() {
            const { data } = await getUserMenu();
            deepForEach<MenuRes>(data, "children", (item) => GenerateTreeRouter(item));
            const sdata: Record<string, any>[] = JSON.parse(JSON.stringify(data));
            const rdata: Record<string, any>[] = JSON.parse(JSON.stringify(data));
            const sidebarRoutes: any = filterAsyncRouter(sdata)
            const rewriteRoutes: any = filterAsyncRouter(rdata, true)
            this.sidebarRouters = sidebarRoutes
            return rewriteRoutes
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "APP_USER_STORE",
                storage: localStorage,
                paths: ["userInfo"]
            },
            {
                key: "APP_USER_STORE",
                storage: sessionStorage,
                paths: ["historyRoutes", "historyLastIndex"]
            },
        ]
    },
})