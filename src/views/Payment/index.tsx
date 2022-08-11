/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-21 12:43:11
 * @LastEditTime: 2022-08-11 10:54:51
 */

import MockupWindow from "@/components/MockupWindow";
import { NameRoutes } from "@/router/routes";
import { defineComponent } from "vue";


export default defineComponent({
    name: NameRoutes.Payment,
    setup() {
        return function () {
            return (
                <section>
                    <MockupWindow>
                        <div class="space-y-6 minhwin">
                            <div class="flex items-center gap-x-4 w-full justify-end">
                                111
                            </div>
                        </div>
                    </MockupWindow>
                </section>
            )
        }
    }
})