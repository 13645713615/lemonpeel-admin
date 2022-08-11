/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-18 14:17:01
 * @LastEditTime: 2022-08-05 15:45:30
 */

import { YButton } from "@lemonpeel/components";
import { defineComponent } from "vue";
import Container from "../Login/layout/Container";

export default defineComponent({
    name: "NotFound",
    setup() {
        return function () {
            return (
                <Container>
                    <div class="absolute left-0 top-0 right-0 overflow-hidden h-screen">
                        <div class="inset-0 bg-black opacity-25 absolute">
                        </div>
                        <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                            <div class="w-full font-mono flex flex-col items-center relative z-10">
                                <h1 class="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                                    You&#x27;re alone here
                                </h1>
                                <p class="font-extrabold text-8xl my-44 text-white animate-bounce">
                                    404
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>

            )
        }
    }
})