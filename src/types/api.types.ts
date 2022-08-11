/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-21 13:56:26
 * @LastEditTime: 2022-08-11 10:58:14
 */


export interface MenuRes {
    custom?: string
    component: string;
    hidden: boolean;
    isHref: boolean;
    icon?: string;
    name: string;
    noCache?: boolean;
    path: string;
    title: string;
    visitor?: boolean;
    type?: number;
    children?: MenuRes[];
}