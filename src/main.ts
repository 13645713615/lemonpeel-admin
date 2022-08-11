/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-03 11:28:50
 * @LastEditTime: 2022-08-04 16:29:53
 */


import { createApp } from "vue";
import App from "./App";
import router from "./router";
import store from "./store"
import "@/assets/css/tailwind.css"
import { createFromIconfont } from "@lemonpeel/components";
import { registeRsize } from "@lemonpeel/hooks";

createFromIconfont("//at.alicdn.com/t/c/font_3567654_gv54f3rhq16.css");
registeRsize();
createApp(App).use(store).use(router).mount("#app");
