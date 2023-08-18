package com.zxiaosi.common.utils;

import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.constants.SystemConstants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 结果工具类
 *
 * @author zxiaosi
 * @date 2023-08-10 11:30
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> implements Serializable {

    /**
     * 状态码
     */
    private int code;

    /**
     * 描述
     */
    private String msg;

    /**
     * 数据体
     */
    private T data;

    /**
     * 总数
     */
    private long total;

    /**
     * 成功状态码
     */
    private static int SUCCESS_CODE = ResponseEnum.SUCCESS.getCode();

    /**
     * 成功描述
     */
    private static String SUCCESS_MSG = ResponseEnum.SUCCESS.getMsg();

    /**
     * 失败状态码
     */
    private static int ERROR_CODE = ResponseEnum.ERROR.getCode();

    /**
     * 失败描述
     */
    private static String ERROR_MSG = ResponseEnum.ERROR.getMsg();


    public static <T> Result<T> success() {
        return new Result<>(SUCCESS_CODE, SUCCESS_MSG, null, 0L);
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(SUCCESS_CODE, SUCCESS_MSG, data, 0L);
    }

    public static <T> Result<T> success(T data, long total) {
        return new Result<>(SUCCESS_CODE, SUCCESS_MSG, data, total);
    }

    public static <T> Result<T> success(T data, String msg) {
        return new Result<>(SUCCESS_CODE, msg, data, 0L);
    }

    public static <T> Result<T> success(String msg, T data) {
        return new Result<>(SUCCESS_CODE, msg, data, 0L);
    }

    public static <T> Result<T> success(String msg, T data, long total) {
        return new Result<>(SUCCESS_CODE, msg, data, total);
    }

    public static <T> Result<T> fail() {
        return new Result<>(ERROR_CODE, ERROR_MSG, null, 0L);
    }

    public static <T> Result<T> fail(String msg) {
        return new Result<>(ERROR_CODE, msg, null, 0L);
    }

    public static <T> Result<T> fail(int code, String msg) {
        return new Result<>(code, msg, null, 0L);
    }

}
