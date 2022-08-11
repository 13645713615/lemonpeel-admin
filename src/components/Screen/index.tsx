/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-28 22:05:57
 * @LastEditTime: 2022-08-11 11:37:07
 */

import { designComponent } from "@lemonpeel/design-components";
import { useResizeWatch, Breakpoint } from "@lemonpeel/hooks";
import { PropType, ref } from "vue";

type Containers = keyof typeof Breakpoint;
const largeScreen: Array<Containers> = ["XL", "XXL"];
const smallScreen: Array<Containers> = ["LG", "SM", "MD"];
export default designComponent({
    name: "Screen",
    props: {
        include: {
            type: Array as PropType<Containers[]>,
            default: () => []
        },
        exclude: {
            type: Array as PropType<Containers[]>,
            default: () => []
        },
        size: {
            type: String as PropType<"large" | "small">,
            default: "large"
        }
    },
    slots: ["default", "other"],
    inheritAttrs: false,
    setup({ props, slots }) {
        const is = ref<boolean>(false);
        let container = props.include.length ? props.include : props.exclude;
        if (props.size) container = props.size === "large" ? largeScreen : smallScreen;
        if (container.length) {
            useResizeWatch(container as Breakpoint[], (bol) => {
                is.value = bol;
            }, true)
        }

        return () => is.value ? slots.default.render() : slots.other.render()
    }
})