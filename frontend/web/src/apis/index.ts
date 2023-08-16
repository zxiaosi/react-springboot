import { IRequestOption } from "@/request/http";
import useRequest, { ISWRConfiguration } from "@/request";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

/** 
 * 创建通用请求hook
 */
export const createApiHook = (defaultReqOptions: IRequestOption = {}, defaultSWROptions: ISWRConfiguration = {}) => {
  return (reqtOption?: IRequestOption, swrOption?: ISWRConfiguration) => {
    return useRequest({ ...defaultReqOptions, ...reqtOption }, { ...defaultSWROptions, ...swrOption });
  }
};

/** 测试 */
export const useTestApi = createApiHook({ url: "/user", method: Method.GET }, { isImmutable: true });