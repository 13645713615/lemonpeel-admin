/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-03 16:10:18
 * @LastEditTime: 2022-08-03 18:04:54
 */

import { useUser } from "@/store";
import { useLoadingService, useMessageService } from "@lemonpeel/components";
import { addition, cancelWorks, CreateRequest, IHttpOptions, IRes, onCreate, onEnd, onStart } from "@lemonpeel/utils";


const whiteListed: Array<number | string> = [0, "000000"];
const loadingWorks = new Set();


const useRequest = new CreateRequest<IHttpOptions>({
    timeout: 20000,
    baseURL: import.meta.env.VITE_APP_BASE_API as string,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    isPassRule: (data: any): boolean => {
        if (typeof data === "object") {
            Object.assign(data, {
                status: Number(data.resp_code),
                data: data.datas,
                message: data.resp_msg
            }) as IRes
            return whiteListed.includes(data.status)
        } else if (typeof data === "string") {
            return true
        }
        return whiteListed.includes(data.resp_code)
    },
    handleError: (res: any) => {
        const status = Number(res.status);
        if (status === 8) {
            cancelWorks("登录失效");
            useUser()?.logout()
        } else {
            useMessageService.error(res.message);
        }
        console.error(res.message)
        return res
    }
})

onCreate((key: string, options: IHttpOptions): Promise<any> | undefined => {
    const { loading } = options.meta || {}
    const { token } = useUser();
    if (token) options.headers = addition(options.headers, { Authorization: `Bearer ${token}` });
    if (loading === undefined || loading) {
        loadingWorks.add(key)
    }
    return
})

onStart(() => {
    if (loadingWorks.size) {
        useLoadingService.show();
    }
})

onEnd((key: string) => {
    console.log("[LOADING] " + loadingWorks.size);
    loadingWorks.delete(key)
    if (loadingWorks.size === 0) {
        useLoadingService.hide()
    }
})


function transformData<T extends unknown>(res: IRes<T>): T | undefined {
    if (!res.status) return res.data
}


async function requestSuccess<T extends unknown>(callback: Promise<IRes<T>>): Promise<IRes<T>> {
    const res = await callback
    if (!res.status) return res
    throw res
}


export { useRequest, transformData as requestTransformData, requestSuccess }