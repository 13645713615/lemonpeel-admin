/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-31 09:33:48
 * @LastEditTime: 2022-08-03 18:32:50
 */

import { NameRoutes } from "@/router/routes";
import { defineComponent } from "vue";
import Container from "./layout/Container";
import LoginForm from "./layout/LoginForm";

export default defineComponent({
    name: NameRoutes.Login,
    setup() {
        return () => (
            <Container>
                <div class="transition duration-500 ease-in-out w-full sm:w-auto xl:w-2/6 md:w-2/4  p-8 md:p-10 md:absolute md:left-1/2 md:-translate-x-1/2  md:top-1/2 md:-translate-y-1/2 bg-base-100 lg:p-14 rounded-lg">
                    <div class="max-w-md w-full mx-auto">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-3xl font-serif font-bold leading-tight mb-3 text-primary transition-all duration-200">
                                <span class="text-base-content">蓝狐</span>
                                <span>OS</span>
                            </h1 >
                        </div>
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </Container>
        )
    }
})