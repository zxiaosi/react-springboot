import Taro from "@tarojs/taro";
import { loginUrl, tokenStorage } from "@/global";
import { post } from ".";

/**
 * 获取 Token
 */
export async function requestToken() {
  let token = Taro.getStorageSync(tokenStorage) || "";

  if (!token) {
    let appid = Taro.getAccountInfoSync().miniProgram.appId;
    const { code } = await Taro.login();
    const { data: { data }, } = await post(`user/wxLogin?code=${code}&appId=${appid}`, {}, { isNeedToken: false });
    Taro.setStorageSync(tokenStorage, data);
    token = data;
  }

  return token;
}

/**
 * 请求拦截器
 */
async function requestInterceptor(request: Taro.RequestParams) {
  const { header, isNeedToken, isShowLoading } = request;

  if (isShowLoading) Taro.showLoading({ title: "加载中", mask: true });

  if (isNeedToken) request.header = { ...header, Authorization: await requestToken() };

  return request;
}

/**
 * 响应拦截器
 */
function responseInterceptor(request: Taro.RequestParams, response: Taro.request.SuccessCallbackResult) {
  const { isShowLoading, isShowFailToast, isThrowError } = request;
  const { statusCode, data, errMsg } = response; // HTTP 返回的数据格式

  isShowLoading && Taro.hideLoading();

  if (statusCode === 200) { // HTTP 成功
    const { code, msg } = data; // 后端自定义的响应格式

    if (code == 0) { // 后端返回的 code == 0 代表请求成功
      return response;
    } else {
      if (isShowFailToast) Taro.showToast({ icon: "none", title: msg || "未知错误，十分抱歉！", duration: 2000, mask: true });

      if (isThrowError) throw new Error(`后端返回的错误信息-- ${msg}`); // 抛出错误, 阻止程序向下执行

      return response; // 程序继续往下走
    }
  } else {  // HTTP 失败
    let title = "未知错误，万分抱歉！";

    if (statusCode === -1) title = "网络请求失败，请检查您的网络。";

    if (statusCode > 0) title = `url:${request.url.toString()}, statusCode:${response.statusCode}`;

    if (statusCode == 401) {
      Taro.clearStorage();
      Taro.reLaunch({ url: loginUrl });
    }

    if (isShowFailToast) Taro.showToast({ icon: "none", title: title || errMsg, duration: 2000, mask: true });

    throw new Error(`HTTP请求失败---- ${title || errMsg}`); // 抛出错误, 阻止程序向下执行
  }
}

/**
 * 参考官方文档
 * https://taro-docs.jd.com/docs/apis/network/request/addInterceptor
 */
const interceptor = async function (chain: Taro.Chain) {
  const requestParams = chain.requestParams;
  // const { method, data, url } = requestParams;

  // console.log(`http ${method || "GET"} --> ${url} data: `, data);

  let req = await requestInterceptor(requestParams); // 请求拦截器

  return chain.proceed(req).then((res: Taro.request.SuccessCallbackResult) => {
    // console.log(`http <-- ${url} result:`, res);

    return responseInterceptor(req, res); // 响应拦截器
  });
};

export default interceptor;