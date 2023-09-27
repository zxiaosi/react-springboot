export const MyRegEx = {

  /** 判断机型是否为Android */
  Android: /Android/i,

  /** 判断机型是否为苹果手机 */
  IPhone: /iPhone/i,

  /** 判断手机是否含有底部虚拟键 */
  HasNavigator: /iPhone\s(XR|XS\sMax|X|1[2-8](\smini|\sPro\sMax|\sPro)?)/,

  /** 判断用户名是否符合 */
  UserName: /^(?=.{2,})[\u4e00-\u9fa5a-zA-Z0-9\s·]+$/,

  /** 判断密码是否符合 */
  Password: /^[a-zA-Z0-9]{6,20}$/,
}