/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-18 16:38:32
 * @LastEditTime: 2022-08-03 15:09:18
 */


import { Component } from "vue";
import { RoutesRaw } from "@/types/router.type";

enum NameRoutes {
    Home = 'home',
    Payment = 'payment',
    Unknown = 'nknown',
    Mian = "mian",
    View = 'view',
    Role = 'role',
    Settlement = 'settlement',
    Waitpay = 'waitpay',
    Paid = 'paid',
    Login = 'login'
}

const UnknownRoute: RoutesRaw = {
    path: '/:pathMatch(.*)*',
    redirect: {
        name: NameRoutes.Unknown
    },
    meta: { hidden: true, title: "unknown" }
}

const PanelRoutes = new Map<NameRoutes, Component>([
    [NameRoutes.Mian, () => import("@/layouts/Main")],
    [NameRoutes.View, () => import("@/layouts/View")]
])

const MenuRoutes = new Map<NameRoutes, Component>([
    [NameRoutes.Payment, () => import("@/views/Payment")],
    [NameRoutes.Settlement, () => import("@/views/Settlement/index")],
    [NameRoutes.Paid, () => import("@/views/Paid")],
    [NameRoutes.Waitpay, () => import("@/views/Waitpay")],
])

const BasicsRoutes = new Map<NameRoutes, Component>([
    [NameRoutes.Unknown, () => import("@/views/NotFound")],
    [NameRoutes.Home, () => import("@/views/Home")],
    [NameRoutes.Login, () => import("@/views/Login")],
])

/**
    path:string
    name:string
    component:string 

    hidden: false                 // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    noCache: false                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: ''                     // 设置该路由在侧边栏和面包屑中展示的名字
    icon: ''                      // 设置该路由的图标，对应路径src/assets/icons/svg
    visitor: false                // 如果设置为false，则要登录才能访问
    href: false                   // 如果设置为true，则跳转path连接
    transition: ‘slide-left’      // 如果设置为false，则禁止过度动画
 */

const defaultRoutes: RoutesRaw[] = [
    {
        path: '/',
        redirect: "home",
        name: NameRoutes.Mian,
        component: PanelRoutes.get(NameRoutes.Mian) as Component,
        children: [
            {
                path: "home",
                name: NameRoutes.Home,
                component: BasicsRoutes.get(NameRoutes.Home),
                meta: {
                    title: '首页',
                    noCache: true,
                },
            }
        ],
    },
    {
        path: '/login',
        name: NameRoutes.Login,
        component: BasicsRoutes.get(NameRoutes.Login),
        meta: {
            hidden: true,
            title: '登录'
        },
    },
    {
        path: '/404',
        name: NameRoutes.Unknown,
        component: BasicsRoutes.get(NameRoutes.Unknown),
        meta: {
            hidden: true,
            title: '未知页面'
        },
    },
]

const MusterRoute: Map<NameRoutes, Component> = new Map([...Array.from(PanelRoutes), ...Array.from(BasicsRoutes), ...Array.from(MenuRoutes)])


function addLayoutMenuRoutes(menuRoutes: RoutesRaw[]): RoutesRaw[] {
    const newRoutes: RoutesRaw[] = [...menuRoutes, UnknownRoute]
    defaultRoutes.push.apply(defaultRoutes, newRoutes)
    return newRoutes
}

function getRoutes() {
    return defaultRoutes
}


export { MenuRoutes, getRoutes, addLayoutMenuRoutes, NameRoutes, MusterRoute }
