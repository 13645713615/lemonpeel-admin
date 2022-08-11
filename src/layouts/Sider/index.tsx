/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-20 17:40:59
 * @LastEditTime: 2022-08-08 16:32:46
 */
import { computed, defineComponent } from "vue";
import { useUser } from "@/store";
import { RouteRecordRaw, RouterLink } from "vue-router";
import { appRouter, hasOneShowingChild } from "@/hooks/router";
import { isEmpty } from "@lemonpeel/utils";
import { YIcon, YMenu, YMenuItem } from "@lemonpeel/components";

export default defineComponent({
    name: "Sider",
    setup() {
        const userStore = useUser()
        const router = appRouter();
        const routeName = computed<string>(() => router.route.value.name as string);
        function RenderMenuItem(props: { label: string, key: string, icon: () => JSX.Element }): JSX.Element {
            return (
                <li>
                    <RouterLink to={{ name: props.key }} class={`flex !py-2 gap-4${routeName.value === props.key ? ' y-active' : ''}`}>
                        {props.icon && props.icon()}
                        {props.label}
                    </RouterLink>
                </li>
            )
        }
        const Menus = computed<JSX.Element[]>(() => {
            const MenuNodeItemLi = []
            const MenuNodeList = [...RenderMenu(userStore.sidebarRouters, RenderMenuItem)].reduce<JSX.Element[]>((MenuNodes, NodeItem) => {
                if (NodeItem.type === "li") {
                    MenuNodeItemLi.push(NodeItem);
                } else {
                    MenuNodes.push(NodeItem)
                }
                return MenuNodes
            }, []);
            MenuNodeList.unshift((<YMenu class="flex lg:y-menu-normal flex-col y-p-0 p-0 px-4">{MenuNodeItemLi}</YMenu>))
            return MenuNodeList
        })

        return () => (
            <div class="bg-base-200 w-72">
                <div class="max-h-screen">
                    <div class="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 font-serif gap-2 px-4 py-2 flex items-baseline">
                        <RouterLink to="/" aria-current="page" aria-label="主页" class="flex-0 btn btn-ghost px-2">
                            <div class="font-title  text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                                <span>LH</span>
                                <span class="text-base-content">POOL</span>
                            </div>
                        </RouterLink>
                        <a class="text-xs text-opacity-50">
                            1.0.4
                        </a>
                    </div>
                    <div class="h-4"></div>
                    {Menus.value}
                </div>
            </div>
        )
    }
})


function* RenderMenu(routers: RouteRecordRaw[], RenderMenuItem: (props: { label: string, key: string, icon: () => JSX.Element }) => JSX.Element) {
    for (let i = 0; i < routers.length; i++) {
        const { children, meta } = routers[i];
        if (meta && !meta.hidden) {
            const onlyOneChild: Record<string, any> = hasOneShowingChild(children, routers[i]);
            const isOnlyOneChild: boolean = !isEmpty(onlyOneChild);
            const icon = meta && meta.icon ? () => <YIcon type={meta.icon as string}></YIcon> : null;
            if (isOnlyOneChild) {
                const { children, noShowingChildren, meta, name } = onlyOneChild
                if ((!children || noShowingChildren)) {
                    yield RenderMenuItem({ label: meta?.title as string, key: name as string, icon })
                    continue;
                }
            }
            yield (
                <YMenu compact class="flex flex-col y-p-0 p-0 px-4 gap-y-1">
                    <li></li>
                    <YMenuItem title={meta?.title as string}></YMenuItem>
                    {[...RenderMenu(children, RenderMenuItem)]}
                </YMenu>
            )
        }
    }
}

