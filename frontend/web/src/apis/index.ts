import useRequest, { IReqOption, ISwrOption } from "@/request";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

/** 
 * 创建通用请求hook
 * 不想每次都写 reqtOption?: IReqOption, swrOption?: ISwrOption x.x
 */
export const createApiHook = (defaultReq: IReqOption = {}, defaultSWR: ISwrOption = {}) => {
  return (reqtOption?: IReqOption, swrOption?: ISwrOption) => {
    return useRequest({ ...defaultReq, ...reqtOption }, { ...defaultSWR, ...swrOption });
  }
};

/** 测试 */
export const useTestApi = createApiHook({ url: "/test", method: Method.GET });

/** 获取小程序二维码 */
export const useGetWeappQrcode = createApiHook({ url: "/wechat/qrcode", method: Method.GET });

/** 用户登录 */
export const useLogin = createApiHook({ url: "/login", method: Method.POST });

/** 用户退出 */
export const useLogout = createApiHook({ url: "/logout", method: Method.GET });