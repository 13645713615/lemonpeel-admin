/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-03 11:36:05
 * @LastEditTime: 2022-08-10 19:01:51
 */

import { addLayoutMenuRoutes, getRoutes, MusterRoute, NameRoutes } from "@/router/routes";
import { isEmpty } from "@lemonpeel/utils";
import useRouter from "@/router"
import { AppRouter, Route, TRoutesMenu, RoutesRaw, IHistory } from "@/types/router.type";
import { computed, toRaw, readonly } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { useApp, useUser } from "@/store";


/**
 * @name: 
 * @msg: 返回菜单，过滤只有一个菜单的目录
 * @param {Record} children
 * @param {*} any
 * @param {Record} parent
 * @param {*} any
 * @param {*} any
 * @return {*}
 */
export const hasOneShowingChild = (children: Record<string, any>[] = [], parent: Record<string, any>): Record<string, any> => {
    const showingChildren = children.filter((item: any) => {
        const { hidden } = item.meta || {}
        return !hidden
    })
    switch (showingChildren.length) {
        case 0:
            return { ...parent, noShowingChildren: true }
        case 1:
            return showingChildren[0]
        default:
            return {}
    }
}


/**
 * @name: 跳转
 * @msg: 
 * @param {string} route
 * @param {boolean} isReplace
 * @return {*}
 */
export const turnToPage = (route: string | Route, isReplace?: boolean): void => {
    if (typeof route === "string") {
        route = { name: route };
    } else if (route.meta && route.meta.href) {
        window.open(route.name);
        return;
    }
    if (route.name === "logout") {
        // useLogout()
        return;
    }
    if (isReplace) {
        useRouter.replace(route);
    } else {
        useRouter.push(route);
    }

}



/**
 * @name: 名称查询路由
 * @msg: 
 * @param {RoutesRaw} list
 * @param {string} name
 * @param {boolean} type
 * @return {*}
 */
export const nameQueryRoute = (list: RoutesRaw[], name: string, type?: boolean): RoutesRaw | undefined => {
    for (let i = 0; i < list.length; i++) {
        const route: RoutesRaw = list[i];
        if (route.name === name) {
            return route
        } else if (type && route.children) {
            const result = nameQueryRoute(route.children, name, type)
            if (isEmpty(result) === false) {
                return result;
            }
        }
    }
    return
}

// /**
//  * @name: 查询路由位置
//  * @msg: 
//  * @param {Record<string, any>[]} list
//  * @param {Record<string, any>} path
//  * @return {*}
//  */
// export const indexOfRoute = (list: Record<string, any>[], route: Record<string, any>): number => {
//     const size: number = list.length;
//     const routeString = qs.stringify(route)
//     for (let i = 0; i < size; i++) {
//         if (qs.stringify(list[i]) === routeString) {
//             return i
//         }
//     }
//     return -1
// }

export const GenerateTreeRouter = (menu: any): TRoutesMenu => {
    return {
        path: menu.path,
        name: menu.name,
        component: menu.component,
        children: isEmpty(menu.children) ? undefined : menu.children,
        meta: {
            history:menu.history,
            title: menu.title,
            hidden: Boolean(menu.hidden),
            icon: menu.icon,
            noCache: Boolean(menu.noCache),
            visitor: Boolean(menu.visitor),
            href: Boolean(menu.visitor),
            transition: Boolean(menu.transition)
        }
    }
}

/**
 * @name: 遍历后台传来的路由字符串，转换为组件对象
 * @msg: 
 * @param {Record} asyncRouterMap
 * @param {*} any
 * @param {boolean} type
 * @param {string} lastPath
 * @return {*}
 */
export const filterAsyncRouter = (asyncRouterMap: Record<string, any>[], type: boolean = false, lastPath: string = ""): any[] => {
    return asyncRouterMap.map(route => {
        route.path = lastPath + '/' + route.path
        if (type && route.children && route.children.length) {
            route.children = filterChildren(route.children)
        }
        if (route.component && MusterRoute.has(route.component)) {
            route.component = MusterRoute.get(route.component)
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, type, route.path)
        } else {
            delete route['children']
            delete route['redirect']
        }
        return route
    })
}

/**
 * @name: 三级ParentView合并二级
 * @msg: 
 * @param {Record} childrenMap
 * @param {*} any
 * @return {*}
 */
function filterChildren(childrenMap: Record<string, any>[]): Record<string, any>[] {
    const children: Record<string, any>[] = [];
    childrenMap.forEach((route: any) => {
        if (route.children && route.children.length && route.component === NameRoutes.View) {
            route.children.forEach((item: any) => {
                if (item.children && item.children.length) {
                    children.push.apply(children, filterChildren(item.children))
                } else {
                    item.path = route.path + '/' + item.path
                    children.push(item)
                }
            })
        } else {
            children.push(route)
        }
    })
    return children
}

/**
 * @name: 添加路由，可多个
 * @msg: 
 * @param {array} args
 * @return {*}
 */
export const addRoutes = (...args: any[]) => {
    let routes: RoutesRaw | RoutesRaw[] = args.pop()
    if (!Array.isArray(routes)) {
        routes = [routes as RoutesRaw]
    }
    const newRoutes = addLayoutMenuRoutes(routes as RoutesRaw[]);
    newRoutes.forEach((item: RoutesRaw) => useRouter.addRoute.apply(useRouter, [...args, item]))
}

/**
 * @name: 添加历史记录
 * @msg: 
 * @param {Record} route
 * @param {*} any
 * @return {*}
 */
export const addHistory = ({ name, fullPath, path, meta: { title, noCache, history } }: RouteLocationNormalizedLoaded): boolean => {
    if (!history) return true;
    if (!fullPath || !name) {
        console.error(new Error("The main parameter is missing"))
        return true;
    }
    const store = useUser()
    const historyRoutes = store.historyRoutes;
    const lastIndex = store.historyLastIndex++;
    const index = historyRoutes.findIndex(item => item.fullPath == fullPath);
    if (~index) {
        historyRoutes[index].index = lastIndex;
    } else {
        const history: IHistory = { name, fullPath, path, title, noCache, index: lastIndex } as any;
        console.log(history)
        historyRoutes.push(history)
    }
    return true;
}


/**
 * @name: 删除历史记录
 * @msg: 
 * @param {string} fullPath
 * @return {*}
 */
export const delHistory = (fullPath: string): number => {
    const store = useUser()
    const historyRoutes = store.historyRoutes;
    const index = historyRoutes.findIndex(item => item.fullPath === fullPath);
    if (~index) {
        historyRoutes.splice(index, 1)
    } else {
        console.warn("unknown history")
    }
    return index
}



/**
 * @name: 批量删除历史记录
 * @msg: 
 * @param {string} fullPaths
 * @return {*}
 */
export const delsHistory = (fullPaths: string[]): void => {
    const store = useUser()
    const historyRoutes: IHistory[] = toRaw(store.historyRoutes);
    store.$patch((state) => {
        state.historyRoutes = historyRoutes.reduce<IHistory[]>((previousValue, currentValue) => {
            if (!fullPaths.includes(currentValue.fullPath)) {
                previousValue.push(currentValue)
            }
            return previousValue
        }, [])
    })
}

/**
 * @name: 
 * @msg: 路由
 * @param {*} AppRouter
 * @return {*}
 */
export const appRouter = (): AppRouter => {
    const store = useUser()
    return {
        route: computed(() => useRouter.currentRoute.value),
        to: turnToPage,
        query: (name) => nameQueryRoute(getRoutes(), name, false),
        history: readonly(store.historyRoutes)
    }
}



