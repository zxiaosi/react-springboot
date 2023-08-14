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

    // 自定义系列
    SUCCESS(0, "success"),
    ERROR(1, "error"),

    // 400系列
    BAD_REQUEST(400, "请求的数据格式不符!"),
    UNAUTHORIZED(401, "登录凭证过期!"),
    FORBIDDEN(403, "抱歉，你无权限访问!"),
    NOT_FOUND(404, "请求的资源找不到!"),

    // 500系列
    INTERNAL_SERVER_ERROR(500, "服务器内部错误!"),
    SERVICE_UNAVAILABLE(503, "服务器正忙，请稍后再试!");

    // 以上是枚举的成员，必须先定义，而且使用分号结束

    /**
     * 错误码
     */
    private final int code;

    /**
     * 错误描述
     */
    private final String msg;

    ResponseEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
