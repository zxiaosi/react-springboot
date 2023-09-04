package com.zxiaosi.common.constants;

import lombok.Getter;

/**
 * 自定义异常枚举类
 *
 * @author zxiaosi
 * @date 2023-08-10 13:59
 */
@Getter
public enum ResponseEnum {

    // 常用系列
    SUCCESS(0, "success"),
    ERROR(1, "error"),

    // 400系列
    BAD_REQUEST(400, "请求的数据格式不符!"),
    UNAUTHORIZED(401, "登录凭证过期!"),
    FORBIDDEN(403, "抱歉，你无权限访问!"),
    NOT_FOUND(404, "请求的资源找不到!"),
    METHOD_NOT_ALLOWED(405, "请求的方法不允许!"),

    // 500系列
    INTERNAL_SERVER_ERROR(500, "服务器内部错误!"),
    SERVICE_UNAVAILABLE(503, "服务器正忙，请稍后再试!"),

    // 自定义系列
    TOKEN_FORMAT_ISSUES(40101, "token格式不正确!"),
    TOKEN_EXPIRED(40102, "token已过期!"),
    OFFSITE_LOGIN(40103, "您的账号已经在别的地方登录!"),
    EMPTY_USERNAME(40401, "用户名不能为空!"),
    EMPTY_PASSWORD(40402, "密码不能为空!");

    // 以上是枚举的成员，必须先定义，而且使用分号结束

    /**
     * 错误码
     */
    private final Integer code;

    /**
     * 错误描述
     */
    private final String msg;

    ResponseEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    /**
     * 根据code获取message
     */
    public static String getMsgByCode(int code) {
        for (ResponseEnum response : ResponseEnum.values()) {
            if (response.getCode().equals(code)) {
                return response.getMsg();
            }
        }
        return null;
    }

}
