/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-03 11:31:47
 * @LastEditTime: 2022-08-09 10:09:11
 */


import { YConfigProvider } from "@lemonpeel/components";
import { useTheme } from "@lemonpeel/hooks";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useApp } from "./store";

export default defineComponent({
    name: "App",
    setup() {
        const { setTheme } = useApp()
        useTheme((value) => setTheme(value));
        return () => (
            <YConfigProvider>
                <RouterView></RouterView>
            </YConfigProvider>
        )
    }
})