/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-18 18:58:40
 * @LastEditTime: 2022-03-29 17:07:25
 */

import { NameRoutes } from "@/router/routes";
import { defineComponent } from "vue";

export default defineComponent({
    name: NameRoutes.Home,
    setup() {
        return function () {
            return (
                <div class="bg-zinc-600 relative overflow-hidden">
                    2222
                </div>
            )
        }
    }
})