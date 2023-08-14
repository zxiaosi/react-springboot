package com.zxiaosi.common.exception;

import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.utils.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


/**
 * 全局异常捕获
 *
 * @author zxiaosi
 * @date 2023-08-10 13:48
 */
@RestControllerAdvice
public class GlobalException {

    private final Logger LOGGER = LoggerFactory.getLogger(GlobalException.class);

    /**
     * 自定义异常
     */
    @ExceptionHandler(CustomException.class)
    public Result<?> handleCustomException(CustomException e) {
        return Result.fail(e.getCode(), e.getMsg());
    }

    /**
     * 全局异常
     */
    @ExceptionHandler(Exception.class)
    public Result<?> handleException(Exception e) {
        LOGGER.error(e.getMessage(), e);
        return Result.fail(ResponseEnum.INTERNAL_SERVER_ERROR.getCode(), e.getMessage());
    }

}
