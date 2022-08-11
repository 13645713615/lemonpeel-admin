/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-04 18:32:31
 * @LastEditTime: 2022-08-04 18:37:42
 */

import { YInput } from "@lemonpeel/components"
import { designComponent } from "@lemonpeel/design-components"
import { useKeyboard, useRefs } from "@lemonpeel/hooks"
import { KEY } from "@lemonpeel/utils"

export default designComponent({
    name: "SearchInput",
    setup() {

        const { refs, onRef } = useRefs({ YInput })

        useKeyboard(`${KEY.ctrl}+${KEY.k}`, () => refs.YInput?.methods.focus())

        return () => (
            <div class="w-full relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-2/4 -mt-[0.625rem] left-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <YInput ref={onRef.YInput} htmlType="search" ghost bordered={false} class="w-full h-10  pl-12" placeholder="Search…" />
                <div class="pointer-events-none absolute right-9 top-[10px] gap-1 opacity-50 hidden lg:flex">
                    <kbd class="y-kbd y-kbd-sm">⌘</kbd>
                    <kbd class="y-kbd y-kbd-sm">K</kbd>
                </div>
            </div>
        )
    }
})
