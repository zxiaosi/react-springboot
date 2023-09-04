import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import http, { IRequestOption, IResponseData } from "@/request/http";
import { matchURLMethod } from "@/utils";

/**
 * 自定义axios参数类型
 */
export interface IReqOption extends Partial<IRequestOption> {
  /**
   * 是否启动请求
   * @default true
   */
  isReq?: boolean;
}

/**
 * 自定义useSWR参数类型
 */
export interface ISwrOption extends Partial<SWRConfiguration> {
  /**
   * 是否禁用自动重新请求
   * @default true
   */
  isImmutable?: boolean;

  /**
   * 启用/禁用错误重试 (SWRConfiguration中官方属性)
   * @default false
   */
  shouldRetryOnError?: boolean;
}

/**
 * 自定义请求返回数据类型
 */
export interface Return extends SWRResponse {
  /** 
   * 请求返回数据 
   */
  repsonse?: IResponseData;

  /**
   * 请求key (全局 mutate 中使用)
   */
  requestKey?: (string | undefined)[] | string | null;
}

/**
 * swr请求封装
 * @param reqtOption 请求参数
 * @param swrOption  swr配置
 * @param axiosFunc 自定义axios请求函数
 * @returns
 */
export default function useRequest(reqtOption: IRequestOption, swrOption: ISwrOption, axiosFunc?: () => any): Return {
  const allReqOption = { isReq: true, ...reqtOption, }; // 默认启动请求
  const allSwrOption = { isImmutable: true, shouldRetryOnError: false, ...swrOption }; // 默认禁用自动重新请求, 禁用错误重试

  let requestKey = null; // 生成请求key

  if (axiosFunc) requestKey = matchURLMethod(axiosFunc?.toString()); // 取自定义axios请求函数的url和method作为请求key

  if (allReqOption.isReq) requestKey = [allReqOption.url, allReqOption.method]; // 启动请求时, 取url和method作为请求key

  if (allSwrOption.isImmutable) { // 禁用自动重新请求
    allSwrOption.revalidateIfStale = false;
    allSwrOption.revalidateOnFocus = false;
    allSwrOption.revalidateOnReconnect = false;
  }

  // 这里可以简写 { data, ...rest }
  const { data, error, mutate, isLoading, isValidating } = useSWR(requestKey, axiosFunc || (() => http.request({ ...allReqOption })), { ...allSwrOption });

  return { data, error, mutate, isLoading, isValidating, repsonse: data?.data, requestKey }
}