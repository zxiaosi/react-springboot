import { MyRegEx } from "./constant";

/**
 *  匹配 URL 和 Method 方法
 */
export const matchURLMethod = (str: string = "") => {
  const urlArr = str.match(MyRegEx.HttpOrHttos);
  // console.log("urlArr", urlArr?.[0]);

  const methodArr = str.match(MyRegEx.Method);
  // console.log("methodArr", methodArr?.[0]);

  return [urlArr?.[0], methodArr?.[0]];
};
