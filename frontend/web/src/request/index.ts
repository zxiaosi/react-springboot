import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import http, { IRequestOption, IResponseData } from "@/request/http";

export interface Return extends SWRResponse {
  /** 
   * 请求返回数据 
   */
  repsonse?: IResponseData;

  /**
   * 请求key (全局 mutate 中使用)
   */
  requestKey?: string;
}

export interface ISWRConfiguration extends Partial<SWRConfiguration> {
  /**
   * 是否禁用自动重新请求
   * @default true
   */
  isImmutable?: boolean;
}

/**
 * 通用请求hook
 * @param reqtOption 请求参数
 * @param swrOption  swr配置
 * @returns
 */

export default function useRequest(reqtOption: IRequestOption, swrOption: ISWRConfiguration): Return {

  const requestKey = reqtOption && JSON.stringify(reqtOption); // 生成请求key

  if (swrOption.isImmutable) {
    swrOption.revalidateIfStale = false;
    swrOption.revalidateOnFocus = false;
    swrOption.revalidateOnReconnect = false;
  }

  const { data, error, mutate, isLoading, isValidating } = useSWR(requestKey, () => http.request({ ...reqtOption }), { ...swrOption });

  return { data, error, mutate, isLoading, isValidating, repsonse: data?.data, requestKey }
}