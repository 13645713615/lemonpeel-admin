/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-03 18:04:04
 * @LastEditTime: 2022-08-03 18:08:02
 */

export enum ResultCode {
    Success = 0,
    Fail = 500,
    Invalid = 405
}


function result(data: any): { resp_code: number, datas: any, resp_msg: string }
function result(status: ResultCode, data: any, message?: string): { resp_code: number, datas: any, resp_msg: string };
function result(...args: any[]) {
    const res = { resp_code: ResultCode.Success, datas: null, resp_msg: "请求成功" }
    if (args.length == 1) {
        res.datas = args[0];
    } else {
        [res.resp_code, res.datas, res.resp_msg] = args;
        if (!res.resp_msg) {
            switch (res.resp_code) {
                case ResultCode.Success:
                    res.resp_msg = "请求成功"
                    break;
                case ResultCode.Fail:
                    res.resp_msg = "请求失败"
                    break;
                case ResultCode.Invalid:
                    res.resp_msg = "登录失效"
                    break;
                default:
                    break;
            }
        }
    }
    return res
}

export {
    result
}