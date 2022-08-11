/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2021-06-20 15:52:46
 * @LastEditTime: 2022-03-29 17:08:19
 */
import { NameRoutes } from "@/router/routes";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: NameRoutes.View,
  render: () => <RouterView></RouterView>
})
