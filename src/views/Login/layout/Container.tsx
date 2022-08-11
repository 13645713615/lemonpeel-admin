/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-31 11:10:38
 * @LastEditTime: 2022-08-03 16:42:09
 */

import bgimages from "@assets/images/login.jpg"
import "@assets/css/circles.css"
import { designComponent } from "@lemonpeel/design-components"

export default designComponent({
    name: "Container",
    slots: ["default"],
    setup({ slots }) {
        return () => (
            <div class="relative min-h-screen flex">
                <div class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-base-100" >
                    <div style={`background-image: url(${bgimages})`} class=" sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
                        <div class=" absolute bg-gradient-to-b  from-primary to-base-300 opacity-75 inset-0 z-0" ></div>
                        <ul class="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    {slots.default && slots.default()}
                </div>
            </div>
        )
    }
})