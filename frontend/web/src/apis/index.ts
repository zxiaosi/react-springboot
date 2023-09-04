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
export const useUserInfoApi = createApiHook({ url: "/userInfo", method: Method.GET });

/** 获取小程序二维码 */
export const useWeappQrcodeApi = createApiHook({ url: "/wechat/qrcode", method: Method.POST });

/** 用户登录 */
export const useLoginApi = createApiHook({ url: "/login", method: Method.POST });

/** 用户退出 */
export const useLogoutApi = createApiHook({ url: "/logout", method: Method.GET });

/** 用户菜单 */
export const useMenuApi = createApiHook({ url: "/menu", method: Method.GET });