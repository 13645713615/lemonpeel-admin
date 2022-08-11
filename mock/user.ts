/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-03 17:12:21
 * @LastEditTime: 2022-08-10 18:48:00
 */

import { Random } from "mockjs"
import getEnvConfig from "../getEnvConfig"
import { result } from "./tools"

const BASE_API = getEnvConfig().VITE_APP_BASE_API as string

export default [
    {
        url: `${BASE_API}/login`,
        method: "post",
        response: () => result({
            access_token: Random.paragraph(1, 3)
        })
    },
    {
        url: `${BASE_API}/getUserMenu`,
        method: "get",
        response: () => result([
            {
                component: "mian",
                hidden: false,
                history:true,
                isHref: false,
                icon: "icon-yonghu",
                id: 10,
                name: "permissions",
                noCache: true,
                path: "permissions",
                title: "权限管理",
                visitor: true,
                type: 1,
                children: [
                    {
                        component: "role",
                        hidden: false,
                        isHref: false,
                        history:true,
                        icon: "icon-yonghu",
                        parentId: 2,
                        id: 11,
                        name: "role",
                        noCache: true,
                        path: "role",
                        title: "角色设置",
                        visitor: true,
                        type: 0,
                    }
                ]
            },
            {
                component: "mian",
                hidden: false,
                isHref: false,
                history:true,
                id: 1,
                name: "paymentmanage",
                noCache: false,
                path: "paymentmanage",
                title: "支付管理",
                visitor: true,
                type: 1,
                children: [
                    {
                        component: "payment",
                        hidden: false,
                        isHref: false,
                        history:true,
                        parentId: 1,
                        id: 2,
                        name: "payment",
                        noCache: true,
                        path: "payment",
                        title: "支付审核",
                        visitor: true,
                        type: 0,
                    },
                    {
                        component: "settlement",
                        hidden: false,
                        isHref: false,
                        history:true,
                        parentId: 1,
                        id: 3,
                        name: "settlement",
                        noCache: false,
                        path: "settlement",
                        title: "结算设置",
                        visitor: true,
                        type: 0,
                    },
                    {
                        component: "waitpay",
                        hidden: false,
                        isHref: false,
                        history:true,
                        parentId: 1,
                        id: 4,
                        name: "waitpay",
                        noCache: true,
                        path: "waitpay",
                        title: "待支付",
                        visitor: true,
                        type: 0,
                    },
                    {
                        component: "paid",
                        hidden: false,
                        isHref: false,
                        history:true,
                        parentId: 1,
                        id: 5,
                        name: "paid",
                        noCache: true,
                        path: "paid",
                        title: "已经支付",
                        visitor: true,
                        type: 0,
                    }
                ],
            }
        ])


    }
]
