/**
 * 全局标题
 */
export const TITLE: string = "小四先生的栈";

/**
 * 是否是开发环境
 */
export const IS_DEV: boolean = true;

/**
 * 开发、测试、线上环境
 */
export const DEVELOPMENT: string = "http://127.0.0.1:8082"; // 开发环境
export const PRODUCTION: string = "http://150.158.87.218"; // 线上环境
export const BASE_URL: string = IS_DEV ? DEVELOPMENT : PRODUCTION;

/**
 * API地址
 */
export const API_URL: string = BASE_URL + "/api";

/**
 * 认证前缀
 */
export const AUTH_PREFIX: string = "Token";

/**
 * 布局页面文件名称 eg: layout
 * 修改布局文件步骤:
 *    1. 修改此处
 *    2. 修改 src\view\${layout}\index.tsx 文件名
 */
export const LayoutPage: string = "layout";
