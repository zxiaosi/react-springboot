/**
 * 全局标题
 */
export const TITLE: string = "后台管理系统";

/**
 * 是否是开发环境
 */
export const IS_DEV: boolean = true;

/**
 * 开发、线上环境
 */
export const DEVELOPMENT: string = "http://127.0.0.1:8000"; // 开发环境
export const PRODUCTION: string = "http://150.158.87.218"; // 线上环境
export const BASE_URL: string = IS_DEV ? DEVELOPMENT : PRODUCTION;

/**
 * API地址
 */
export const API_URL: string = BASE_URL + "/api";
