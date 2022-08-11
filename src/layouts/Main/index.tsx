/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-20 15:26:19
 * @LastEditTime: 2022-08-04 15:46:03
 */

import { defineAsyncComponent, defineComponent, ref } from "vue";
import Content from "../Content";
// import Drawer from "@/components/Drawer";
import { NameRoutes } from "@/router/routes";
import { YDrawer } from "@lemonpeel/components"
import Footer from "../Footer";

const Header = defineAsyncComponent(() => import("../Header"));
const Sider = defineAsyncComponent(() => import("../Sider"));

export default defineComponent({
    name: NameRoutes.Mian,
    setup() {

        const drawerVisible = ref<boolean>(true);

        function handleCollapsed(value: boolean) {
            drawerVisible.value = value
        }

        return () => (
            <YDrawer v-slots={{ content: () => <Sider /> }} mobile v-model={drawerVisible.value}>
                <Header onTrigger={handleCollapsed} />
                <Content></Content>
                <Footer></Footer>
            </YDrawer>
        )
    }
})