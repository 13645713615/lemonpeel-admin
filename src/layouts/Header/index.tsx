/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-20 17:42:01
 * @LastEditTime: 2022-08-05 16:49:17
 */

import SearchInput from "@/components/SearchInput";
import ThemeButton from "@/components/ThemeButton";
import { appRouter } from "@/hooks/router";
import { useUser } from "@/store";
import { YBadge, YButton, YDropdown, YNavbar } from "@lemonpeel/components";

import { defineComponent } from "vue";

const userMenu = [{ value: "a", lable: "账户设置" }, { value: "logout", lable: "退出登录" }]

export default defineComponent({
    name: "Header",
    emits: {
        "trigger": (_value: boolean) => true
    },
    setup(_, context) {

        const { to } = appRouter()

        const storeUser = useUser()

        const handle = {
            onTrigger: () => {
                context.emit("trigger", true)
            },
            onSelect: (value: string) => {
                storeUser.$patch((state) => {
                    state.currency = value
                })
            },
            onMenuSelect: (value: string) => {
                to(value)
            }
        }

        return function () {
            return (
                <div class="sticky top-0 z-20 h-16 w-full bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm">
                    <YNavbar class="w-full lg:px-6 md:px-4">
                        {{
                            default: () => (
                                <div class="md:space-x-1 lg:space-x-2 w-full">
                                    <YButton class="lg:hidden" square ghost onClick={handle.onTrigger}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </YButton>
                                    <SearchInput class="mx-3  max-w-xs hidden lg:block"></SearchInput>
                                </div>
                            ),
                            end: () => (
                                <>
                                    <ThemeButton></ThemeButton>
                                    <YButton ghost circle >
                                        <div class="y-indicator">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                            <YBadge class="y-indicator-item" size="xs" type="primary"></YBadge>
                                        </div>
                                    </YButton>
                                    <YDropdown record={userMenu}>
                                        <YButton ghost circle class="y-avatar">
                                            <div class="w-10 rounded-full">
                                                <img src="https://placeimg.com/192/192/people" />
                                            </div>
                                        </YButton>
                                    </YDropdown>
                                </>
                            )
                        }}
                    </YNavbar>
                </div >
            )
        }
    }
})