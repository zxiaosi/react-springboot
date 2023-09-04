export const MyRegEx = {

  /** 匹配是否以 http:// 或 https:// 开头 */
  HttpOrHttos: /(https?|http):\/\/[^")\s]+/,

  /** 匹配 Method 方法 */
  Method: /(GET|POST|DELETE|PUT)/ig,
}