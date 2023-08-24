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
    private Integer code;

    /**
     * 数据体
     */
    private T data;

    /**
     * 总数
     */
    private long total;

    /**
     * 描述
     */
    private String msg;

    /**
     * 成功状态码
     */
    private static Integer SUCCESS_CODE = ResponseEnum.SUCCESS.getCode();

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
        return new Result<>(SUCCESS_CODE, null, 0L, SUCCESS_MSG);
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(SUCCESS_CODE, data, 0L, SUCCESS_MSG);
    }

    public static <T> Result<T> success(T data, long total) {
        return new Result<>(SUCCESS_CODE, data, total, SUCCESS_MSG);
    }

    public static <T> Result<T> success(T data, String msg) {
        return new Result<>(SUCCESS_CODE, data, 0L, msg);
    }

    public static <T> Result<T> success(T data, long total, String msg) {
        return new Result<>(SUCCESS_CODE, data, total, msg);
    }

    public static <T> Result<T> fail() {
        return new Result<>(ERROR_CODE, null, 0L, ERROR_MSG);
    }

    public static <T> Result<T> fail(String msg) {
        return new Result<>(ERROR_CODE, null, 0L, msg);
    }

    public static <T> Result<T> fail(T data, String msg) {
        return new Result<>(ERROR_CODE, data, 0L, msg);
    }

    public static <T> Result<T> fail(Integer code, String msg) {
        return new Result<>(code, null, 0L, msg);
    }

    public static <T> Result<T> fail(Integer code, T data, String msg) {
        return new Result<>(code, data, 0L, msg);
    }

}
