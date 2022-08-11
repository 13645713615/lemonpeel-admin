/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-20 17:37:02
 * @LastEditTime: 2022-08-11 11:40:57
 */
import { useUser } from "@/store";
import { designComponent } from "@lemonpeel/design-components";
import { computed, KeepAlive, ref, Transition } from "vue";
import { RouterView } from "vue-router";
import Screen from "@/components/Screen"
import Tabs from "../Tabs";
import "@/assets/css/slide.css"

export default designComponent({
    name: "content",
    setup() {
        let refreshName: string = "", historyRoutesFromIndex = -1;
        const store = useUser()
        const loading = ref<boolean>(false);
        const aliveMax: number = Number(import.meta.env.VITE_APP_KEEPALIVE_ALIVEMAX);
        const aliveInclude = computed<string[]>(() => {
            const keys = (store.cachedRouteKeys as string[]);
            return loading.value ? keys.filter((keys) => keys != refreshName) : keys;
        });
        const renderSlots = {
            routerView: ({ Component, route }: any) => {
                const name = utils.getTransitionName(route)
                return (
                    <Transition name={name}>
                        <KeepAlive include={aliveInclude.value} max={aliveMax}>
                            {!loading.value && <Component class="lg:px-6 md:px-4 px-2"></Component>}
                        </KeepAlive>
                    </Transition>
                )
            }
        }
        const utils = {
            getTransitionName: (route: any): string | undefined => {
                const historyRoutesToIndex = store.historyRoutes.findIndex(item => item.fullPath === route.fullPath);
                let transitionName;
                if (historyRoutesFromIndex === historyRoutesToIndex || loading.value) return transitionName;
                transitionName = "slide-left";
                if (~historyRoutesToIndex) {
                    if (historyRoutesToIndex < historyRoutesFromIndex) {
                        transitionName = "slide-right";
                    }
                }
                historyRoutesFromIndex = historyRoutesToIndex
                return transitionName
            }
        }
        const methods = {
            refresh: (name: string) => {
                if (loading.value) return;
                refreshName = name;
                loading.value = true;
                setTimeout(() => {
                    loading.value = false;
                }, 500)
            }
        }

        return {
            refer: {
                methods
            },
            render: () => (
                <main class="pb-6 min-h-ctx bg-base-300 pt-2">
                    <Screen>
                        <Tabs class="lg:px-6 md:px-4 px-2 mb-2"></Tabs>
                    </Screen>
                    <RouterView v-slots={{ default: renderSlots.routerView }}></RouterView>
                </main>
            )
        }
    }
})