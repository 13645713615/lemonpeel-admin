/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 23:18:13
 * @LastEditTime: 2022-08-10 18:16:59
 */

import { AppState, AppGetters, AppActions } from "@/types/store.types";
import { setRoot } from "@lemonpeel/utils";
import { defineStore } from "pinia";

export const useApp = defineStore<"app", AppState, AppGetters, AppActions>({
    id: "app",
    state: () => ({
        theme: null
    }),
    actions: {
        setTheme(value) {
            this.$patch((state) => state.theme = value);
            setRoot(new Map<string, string>([["data-theme", value === "dark" ?
                import.meta.env.VITE_APP_THEME_LIGHT :
                import.meta.env.VITE_APP_THEME_DARK
            ]]));
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "POOLS_APP_STORE",
                storage: localStorage,
                paths: ["theme"]
            },
        ]
    },
})