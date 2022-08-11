/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-08 16:05:43
 * @LastEditTime: 2022-08-11 11:39:12
 */

import { appRouter, delHistory } from "@/hooks/router";
import { NameRoutes } from "@/router/routes";
import { IHistory } from "@/types/router.type";
import { YTabs } from "@lemonpeel/components";
import Tab from "@lemonpeel/components/tabs/src/tab";
import { designComponent } from "@lemonpeel/design-components";

export default designComponent({
    name: "Tabs",
    setup() {
        const router = appRouter()
        const handle = {
            onRemove: (data: IHistory, event?: MouseEvent) => {
                event?.stopPropagation();
                const index = delHistory(data.fullPath);
                if (~index && router.route.value.name === data.name) {
                    if (!router.history.length) {
                        return router.to(NameRoutes.Home)
                    }
                    const neighbors: IHistory = router.history[index] || router.history[index - 1];
                    if (neighbors) {
                        router.to({ path: neighbors.fullPath });
                    }
                }
            }
        }
        return () => (
            <div class="flex items-center">
                <YTabs modelValue={router.route.value.name as string} onSelect={router.to} boxed>
                    {
                        router.history.map((item) =>
                            <Tab key={item.name} name={item.name as string} class="group transition-all relative pr-4 hover:pr-8">
                                <span class="bg-inherit relative z-10">{item.title}</span>
                                <span onClick={handle.onRemove.bind(null, item)} class="ml-1 text-xs font-medium transition-all duration-300 group-hover:visible invisible group-hover:opacity-80 opacity-0 absolute right-4">✕</span>
                            </Tab>
                        )
                    }
                </YTabs>
            </div>
        )
    }
})

