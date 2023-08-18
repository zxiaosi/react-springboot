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
export const createApiHook = (defaultReqOptions: IReqOption = {}, defaultSWROptions: ISwrOption = {}) => {
  return (reqtOption?: IReqOption, swrOption?: ISwrOption) => {
    return useRequest({ ...defaultReqOptions, ...reqtOption }, { ...defaultSWROptions, ...swrOption });
  }
};

/** 测试 */
export const useTestApi = createApiHook({ url: "/user", method: Method.GET }, { isImmutable: true });

/** 得到微信二维码 */
export const useGetWechatQrcode = createApiHook({ url: "/wechat/qrcode", method: Method.GET }, { isImmutable: true });