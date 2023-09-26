/** 全局标题 */
export const Title: string = "小四先生的栈";

/** 是否是开发环境 */
export const IsDev: boolean = false;

/**
 * 开发、测试、线上环境
 */
export const Development: string = "http://127.0.0.1:8082"; // 开发环境
export const Poduction: string = "https://zxiaosi.cn"; // 线上环境
export const BaseUrl: string = IsDev ? Development : Poduction;

/** API地址 */
export const ApiUrl: string = BaseUrl + "/api";

/** 图片地址 */
export const ImageUrl: string = BaseUrl + "/images/";

/** 认证前缀 */
export const AuthPrefix: string = "SESSION";

/** 默认登录页 */
export const LoginUrl: string = "/login";

/**
 * 布局页面文件名称 eg: layout
 * 修改布局文件步骤:
 *    1. 修改此处
 *    2. 修改 src\view\${layout}\index.tsx 文件名
 */
export const LayoutPage: string = "layout";

/** 本地缓存名字 */
export const MenuStore: string = "menus";
export const UserInfoStore: string = "userInfo";