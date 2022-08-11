/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-21 12:43:11
 * @LastEditTime: 2022-08-11 10:54:34
 */


import MockupWindow from "@/components/MockupWindow";
import { NameRoutes } from "@/router/routes";
import { YButton, YDrawer } from "@lemonpeel/components";
import { YInput } from "@lemonpeel/components";
import { YCheckbox } from "@lemonpeel/components";
import { useRefs } from "@lemonpeel/hooks";
import { generate } from "@lemonpeel/utils";
import { defineComponent } from "vue";

export default defineComponent({
    name: NameRoutes.Settlement,
    setup() {
        console.log(111);
        const { refs, onRef } = useRefs({ YDrawer })
        const handles = {
            onOpenDrawer: () => {
                refs.YDrawer?.methods.open();
            }
        }
        return function () {
            return (
                <section>
                    <YDrawer end ref={onRef.YDrawer} class="h-auto rounded-2xl" v-slots={{ content: () => <div class="bg-base-100 md:w-96 w-full">123</div> }}>
                        <MockupWindow v-slots={{
                            action: () =>
                                <>
                                    <YButton size="sm" square ghost onClick={handles.onOpenDrawer}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </YButton>
                                    <YButton size="sm" square ghost>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </YButton>
                                    <YButton size="sm" square ghost>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                        </svg>
                                    </YButton>
                                </>
                        }}>
                            <div class="space-y-6 minhwin">
                                <div class="flex items-center gap-x-4 w-full justify-end">
                                    <YInput class=" min-w-xs"></YInput>
                                </div>
                                <div class="overflow-x-auto w-full">
                                    <table class="y-table w-full">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <label>
                                                        <YCheckbox></YCheckbox>
                                                    </label>
                                                </th>
                                                <th>Name</th>
                                                <th>Job</th>
                                                <th>Favorite Color</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {generate(5, () => (
                                                <tr>
                                                    <th>
                                                        <label>
                                                            <YCheckbox></YCheckbox>
                                                        </label>
                                                    </th>
                                                    <td>
                                                        <div class="flex items-center space-x-3">
                                                            <div class="y-avatar">
                                                                <div class="y-mask y-mask-squircle w-12 h-12">
                                                                    <img src="https://placeimg.com/192/192/people" alt="Avatar Tailwind CSS Component" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div class="font-bold">Hart Hagerty</div>
                                                                <div class="text-sm opacity-50">United States</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Zemlak, Daniel and Leannon
                                                        <br />
                                                        <span class="y-badge y-badge-ghost y-badge-sm">Desktop Support Technician</span>
                                                    </td>
                                                    <td>Purple</td>
                                                    <th>
                                                        <YButton onClick={handles.onOpenDrawer} ghost size="xs">details</YButton>
                                                    </th>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </MockupWindow>
                    </YDrawer>
                </section>
            )
        }
    }
})