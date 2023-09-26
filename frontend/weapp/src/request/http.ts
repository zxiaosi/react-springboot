import { ApiUrl } from "@/global";
import Taro from "@tarojs/taro";
import interceptor from "./interceptors";

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

/**
 * 添加拦截器 (务必与 Taro.request 放到一起)
 * https://taro-docs.jd.com/docs/apis/network/request/addInterceptor
 */
Taro.addInterceptor(interceptor);

/** 自定义请求体 */
export interface IRequestData {
  [key: string]: any;
}

/**
 * 自定义响应体 (根据后端的返回的 数据格式 来)
 * 或者: Taro.request.SuccessCallbackResult<T>
 */
export interface IResponseData<T> {
  msg: string;
  data: T;
  code: number;
  total: number;
}

/** 自定义配置 */
export interface IRequestOption extends Partial<Taro.request.Option<string | IRequestData>> {
  /**
   * 是否需要Token
   * @default true
   */
  isNeedToken?: boolean;

  /**
   * 是否显示Loading遮罩层
   * @default false
   */
  isShowLoading?: boolean;

  /**
   * 是否显示失败Toast弹框
   * @default true
   */
  isShowFailToast?: boolean;

  /**
   * 是否抛出错误 (阻止代码的继续运行)
   * @default false
   */
  isThrowError?: boolean;
}

/** 封装请求类 */
class HttpRequest {
  customOptions: IRequestOption = {
    isNeedToken: true,
    isShowLoading: false,
    isShowFailToast: true,
    isThrowError: false,
  };

  async request<T>(url: string, data: string | IRequestData = {}, options: IRequestOption): Promise<Taro.request.SuccessCallbackResult<IResponseData<T>>> {
    const requestUrl = this.normalizationUrl(url);
    const header = { "Content-Type": "application/json" };
    const requestData = data;
    const requestOptions = { ...this.customOptions, ...options };
    const params = { url: requestUrl, header, data: requestData, ...requestOptions };

    const resp: any = await Taro.request(params); // 发起请求
    return resp;
  }

  /** 处理 url */
  private normalizationUrl(url: string) {
    let requestUrl = url;

    if (ApiUrl[ApiUrl.length - 1] === '/') {  // 判断 baseUrl 最后是否有 '/'
      requestUrl[0] === '/' && (requestUrl = requestUrl.replace('/', '')); // 去除 requestUrl 最前面的 '/'
    } else {
      requestUrl[0] !== '/' && (requestUrl = '/' + requestUrl); // 给 requestUrl 最前面加上 '/'
    }

    if (!/^https{0,1}:\/\//g.test(requestUrl)) { // 判断 requestUrl 是否是 http:// 或 https:// 开头
      requestUrl = `${ApiUrl}${requestUrl}`;
    }

    return requestUrl;
  }

}

const http = new HttpRequest();
export default http;
