/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-31 11:22:32
 * @LastEditTime: 2022-08-03 18:09:02
 */


import { appRouter } from "@/hooks/router";
import { useUser } from "@/store";
import { YAlert, YButton, YCheckbox, YForm, YFormControl, YFormItem, YInput } from "@lemonpeel/components";
import { useService } from "@lemonpeel/hooks";
import { IRes } from "@lemonpeel/utils";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
    name: "LoginForm",
    setup() {
        const { login } = useUser();

        const router = appRouter()

        const uuid = ref<string>();

        const formData = reactive({ username: "", password: "" })

        const alert = reactive({ visible: false, message: "" })

        const service = useService<any, typeof login>(login, { defaultValue: {}, params: () => ([{ ...formData, uuid: uuid.value }]) },
            (res: IRes) => {
                if (res.status == 0) {
                    alert.visible = false;
                    router.to({ path: router.route.value.query?.redirect as string | undefined || "/" }, true)
                } else {
                    alert.visible = true;
                    alert.message = res.message;
                }
            })


        const handle = {
            onSubmit: () => {
                service.run()
            }
        }


        return () => (
            <div>
                <div class="h-20 flex items-center justify-center">
                    <YAlert status="error" v-model={alert.visible}>
                        {alert.message}
                    </YAlert>
                    <div class={`items-center justify-center space-x-2 ${alert.visible ? 'hidden' : 'flex'}`}>
                        <span class="h-px md:w-16 md:flex-none flex-1 bg-base-content "></span>
                        <span class="base-content font-normal font-serif">账户登录</span>
                        <span class="h-px md:w-16 md:flex-none flex-1 bg-base-content"></span>
                    </div>
                </div>
                <YForm class="md:space-y-4 space-y-6" model={formData} onSubmit={handle.onSubmit}>
                    <YFormItem showlabel={false} field="username" label="账号" required>
                        <YInput type="primary" htmlType="text" v-model={formData.username} placeholder="账号" class="w-full"></YInput>
                    </YFormItem>
                    <YFormItem showlabel={false} field="password" label="密码" required>
                        <YInput type="primary" htmlType="password" v-model={formData.password} placeholder="密码" class="w-full"></YInput>
                    </YFormItem>
                    <div class="space-y-4">
                        <div class="flex justify-between  items-center">
                            <YFormControl rightLabel="记住登录状态" align="horizontal">
                                <YCheckbox type="primary"></YCheckbox>
                            </YFormControl>
                        </div>
                        <YButton loading={service.loading} htmlType="submit" block type="primary">登录</YButton>
                    </div>
                </YForm>
            </div>

        )
    }
})