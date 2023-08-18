import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import http, { IRequestOption, IResponseData } from "@/request/http";

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
  requestKey?: string | null;
}

/**
 * 通用请求hook
 * @param reqtOption 请求参数
 * @param swrOption  swr配置
 * @returns
 */
export default function useRequest(reqtOption: IRequestOption, swrOption: ISwrOption): Return {
  const allReqOption = { isReq: true, ...reqtOption, };
  const allSwrOption = { isImmutable: true, ...swrOption };

  const requestKey = allReqOption.isReq ? reqtOption && JSON.stringify(reqtOption) : null; // 生成请求key

  if (allSwrOption.isImmutable) {
    allSwrOption.revalidateIfStale = false;
    allSwrOption.revalidateOnFocus = false;
    allSwrOption.revalidateOnReconnect = false;
  }

  const { data, error, mutate, isLoading, isValidating } = useSWR(requestKey, () => http.request({ ...allReqOption }), { ...allSwrOption });

  return { data, error, mutate, isLoading, isValidating, repsonse: data?.data, requestKey }
}