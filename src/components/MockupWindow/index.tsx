/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-09 10:22:04
 * @LastEditTime: 2022-08-11 15:06:05
 */

import { designComponent } from "@lemonpeel/design-components";

export default designComponent({
    name: "MockupWindow",
    slots: ["default", "action"],
    setup({ slots }) {
        return () => (
            <div class="y-mockup-window bg-base-200 relative">
                <div class="absolute top-0 right-5 h-12 z-10 flex items-center gap-x-2">
                    {slots.action.render()}
                </div>
                <div class="bg-base-100 px-4 py-10">
                    {slots.default.render()}
                </div>
            </div>
        )
    }
})
