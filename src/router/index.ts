/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-18 09:29:43
 * @LastEditTime: 2022-08-10 10:41:09
 */

import { createRouter, createWebHashHistory, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { NameRoutes, getRoutes } from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { addHistory, addRoutes } from '@/hooks/router';
import { useUser } from '@/store';

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })


export const history = import.meta.env.DEV ? createWebHashHistory() : createWebHistory(import.meta.env.VITE_APP_BASE as string);

const router = createRouter({ history, routes: getRoutes() });

router.beforeEach((): boolean => {
    NProgress.start()
    return true
})


router.beforeEach(({ name, path, query, params }: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
    const { generateRoutes, token, isMenu } = useUser();
    if (!token && name !== NameRoutes.Login) {
        next({ name: NameRoutes.Login })
    } else if (token && !isMenu) {
        generateRoutes().then((accessRoutes) => {
            addRoutes(accessRoutes)
            next({ path, query, params, replace: true })
        });
    } else {
        next()
    }
})

router.beforeEach(addHistory)

router.afterEach(({ meta }: RouteLocationNormalized) => {
    NProgress.done()
    document.title = meta?.title as string
    window.scrollTo(0, 0)
})

export default router;